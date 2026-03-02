import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config({ path: ".env.local" });

function boolLabel(v) {
  return v ? "yes" : "no";
}

function withTimeout(ms) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(new Error("timeout")), ms);
  return {
    signal: controller.signal,
    done: () => clearTimeout(timer),
  };
}

async function checkCampaignMonitor() {
  const apiKey = process.env.CAMPAIGN_MONITOR_API_KEY;
  const listId = process.env.CAMPAIGN_MONITOR_LIST_ID;

  console.log("CM env present", {
    apiKey: boolLabel(Boolean(apiKey)),
    listId: boolLabel(Boolean(listId)),
  });

  if (!apiKey || !listId) {
    throw new Error("Missing CAMPAIGN_MONITOR_API_KEY or CAMPAIGN_MONITOR_LIST_ID");
  }

  const token = Buffer.from(`${apiKey}:x`).toString("base64");
  const headers = { Authorization: `Basic ${token}` };

  const listUrl = `https://api.createsend.com/api/v3.3/lists/${listId}.json`;
  const cfUrl = `https://api.createsend.com/api/v3.3/lists/${listId}/customfields.json`;

  const t1 = withTimeout(15000);
  const listRes = await fetch(listUrl, { headers, signal: t1.signal }).finally(t1.done);
  console.log("CM list status", listRes.status);
  if (listRes.ok) {
    const data = await listRes.json();
    console.log("CM list title", data?.Title ?? null);
  } else {
    console.log("CM list body", await listRes.text());
  }

  const t2 = withTimeout(15000);
  const cfRes = await fetch(cfUrl, { headers, signal: t2.signal }).finally(t2.done);
  console.log("CM customfields status", cfRes.status);
  if (cfRes.ok) {
    const fields = await cfRes.json();
    const fieldNames = Array.isArray(fields)
      ? fields
          .map((f) => f?.FieldName)
          .filter((v) => typeof v === "string")
      : [];

    const keysNormalized = Array.isArray(fields)
      ? fields
          .map((f) => {
            const key = f?.Key;
            if (typeof key !== "string") return null;
            return key.replace(/^\[/, "").replace(/\]$/, "");
          })
          .filter((v) => typeof v === "string")
      : [];

    fieldNames.sort();
    keysNormalized.sort();

    const needed = ["Bron", "Onderwerp", "Bericht"];
    const has = (k) => fieldNames.includes(k) || keysNormalized.includes(k);
    const missing = needed.filter((k) => !has(k));

    console.log(
      "CM has fields",
      needed.reduce((acc, k) => ({ ...acc, [k]: boolLabel(has(k)) }), {})
    );
    console.log("CM missing keys", missing.length ? missing.join(",") : "none");
  } else {
    console.log("CM customfields body", await cfRes.text());
  }
}

async function checkSmtp() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? 587);
  const secure = process.env.SMTP_SECURE === "true";
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  console.log("SMTP env present", {
    host: boolLabel(Boolean(host)),
    port,
    secure,
    user: boolLabel(Boolean(user)),
    pass: boolLabel(Boolean(pass)),
  });

  if (!host || !user || !pass) {
    throw new Error("Missing SMTP_HOST/SMTP_USER/SMTP_PASS");
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });

  await transporter.verify();
  console.log("SMTP verify ok");
}

(async () => {
  let ok = true;

  console.log("--- Integration checks ---");

  try {
    await checkCampaignMonitor();
  } catch (e) {
    ok = false;
    console.error("CM check failed:", e?.message ?? e);
  }

  try {
    await checkSmtp();
  } catch (e) {
    ok = false;
    console.error("SMTP check failed:", e?.message ?? e);
  }

  process.exit(ok ? 0 : 1);
})();
