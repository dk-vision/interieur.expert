import { NextRequest, NextResponse } from "next/server";

/**
 * Syncs Facebook Lead Ad leads to Campaign Monitor.
 *
 * Two modes:
 * 1. WEBHOOK (real-time): Google Apps Script POSTs lead data on new row.
 * 2. CRON (backup): Vercel Cron GET to batch-sync all sheet rows.
 *
 * Lead fields (cols M–R):
 *   bedrijfstype, interesse, full_name, company_name, email, website
 */

/** Convert "architect_/_interieurarchitect" → "Architect / interieurarchitect" */
function humanize(value: string): string {
  return value
    .replace(/_/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^./, (c) => c.toUpperCase());
}

/** Normalize phone: "p:+32474452212" → "+32 474 45 22 12" */
function formatPhone(raw: string): string {
  // Strip prefix like "p:" and whitespace
  let digits = raw.replace(/^p:/i, "").replace(/[\s\-().]/g, "");

  // Belgian mobile: +32 4XX XX XX XX
  const beMobile = digits.match(/^(\+32)(4\d{2})(\d{2})(\d{2})(\d{2})$/);
  if (beMobile) return `${beMobile[1]} ${beMobile[2]} ${beMobile[3]} ${beMobile[4]} ${beMobile[5]}`;

  // Belgian landline: +32 X XXX XX XX or +32 XX XX XX XX
  const beLand = digits.match(/^(\+32)(\d)(\d{3})(\d{2})(\d{2})$/);
  if (beLand) return `${beLand[1]} ${beLand[2]} ${beLand[3]} ${beLand[4]} ${beLand[5]}`;

  // Any other international: just add spaces every 2-3 digits after country code
  const intl = digits.match(/^(\+\d{1,3})(\d+)$/);
  if (intl) {
    const rest = intl[2].replace(/(\d{2})(?=\d)/g, "$1 ");
    return `${intl[1]} ${rest}`;
  }

  return digits || raw;
}

interface LeadData {
  email: string;
  name: string;
  company?: string;
  website?: string;
  telefoon?: string;
  bedrijfstype?: string;
  interesse?: string;
}

async function subscribeToCampaignMonitor(
  lead: LeadData,
  apiKey: string,
  listId: string
): Promise<{ ok: boolean; alreadySubscribed: boolean; error?: unknown }> {
  const token = Buffer.from(`${apiKey}:x`).toString("base64");

  const customFields: { Key: string; Value: string }[] = [];
  if (lead.company) customFields.push({ Key: "Bedrijf", Value: lead.company });
  if (lead.website) customFields.push({ Key: "Website", Value: lead.website });
  if (lead.telefoon) customFields.push({ Key: "Telefoon", Value: formatPhone(lead.telefoon) });
  if (lead.bedrijfstype) customFields.push({ Key: "Bedrijfstype", Value: humanize(lead.bedrijfstype) });
  if (lead.interesse) customFields.push({ Key: "Interesse", Value: humanize(lead.interesse) });

  const body = {
    EmailAddress: lead.email,
    Name: lead.name,
    Resubscribe: true,
    RestartSubscriptionBasedAutoresponders: false,
    ConsentToTrack: "Yes",
    CustomFields: customFields,
  };

  const res = await fetch(
    `https://api.createsend.com/api/v3.3/subscribers/${listId}.json`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  if (res.ok) return { ok: true, alreadySubscribed: false };

  const data = await res.json().catch(() => ({}));
  const cmCode: number = (data as { Code?: number }).Code ?? 0;

  if (cmCode === 203) return { ok: true, alreadySubscribed: true };

  // If custom fields not configured, retry without
  if (
    res.status === 400 &&
    typeof (data as { Message?: string }).Message === "string" &&
    (data as { Message: string }).Message.toLowerCase().includes("custom field")
  ) {
    const res2 = await fetch(
      `https://api.createsend.com/api/v3.3/subscribers/${listId}.json`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...body, CustomFields: undefined }),
      }
    );
    if (res2.ok) return { ok: true, alreadySubscribed: false };
    const data2 = await res2.json().catch(() => ({}));
    if ((data2 as { Code?: number }).Code === 203)
      return { ok: true, alreadySubscribed: true };
  }

  console.error(`Campaign Monitor error for ${lead.email}:`, data);
  return { ok: false, alreadySubscribed: false, error: data };
}

// ── POST: Webhook from Google Apps Script (real-time, single lead) ──
export async function POST(req: NextRequest) {
  const payload = await req.json().catch(() => ({}));
  const { secret, email, name, company, website, telefoon, bedrijfstype, interesse } =
    payload as {
      secret?: string;
      email?: string;
      name?: string;
      company?: string;
      website?: string;
      telefoon?: string;
      bedrijfstype?: string;
      interesse?: string;
    };

  if (!secret || secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const apiKey = process.env.CAMPAIGN_MONITOR_API_KEY;
  const listId = process.env.CAMPAIGN_MONITOR_LEADS_LIST_ID || process.env.CAMPAIGN_MONITOR_LIST_ID;

  if (!apiKey || !listId) {
    return NextResponse.json(
      { error: "Campaign Monitor not configured" },
      { status: 500 }
    );
  }

  const normalizedEmail = String(email ?? "").trim().toLowerCase();
  if (!normalizedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const lead: LeadData = {
    email: normalizedEmail,
    name: String(name ?? "").trim(),
    company: company?.trim() || undefined,
    website: website?.trim() || undefined,
    telefoon: telefoon?.trim() || undefined,
    bedrijfstype: bedrijfstype?.trim() || undefined,
    interesse: interesse?.trim() || undefined,
  };

  const result = await subscribeToCampaignMonitor(lead, apiKey, listId);

  console.log(
    `[sync-leads] Webhook: ${normalizedEmail} (${lead.company || "–"}) → ${result.ok ? (result.alreadySubscribed ? "already subscribed" : "synced") : "failed"}`
  );

  return NextResponse.json({
    success: result.ok,
    alreadySubscribed: result.alreadySubscribed,
    ...(result.error ? { error: result.error } : {}),
  });
}

// ── GET: Vercel Cron batch fallback (hourly) ──
export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const apiKey = process.env.CAMPAIGN_MONITOR_API_KEY;
  const listId = process.env.CAMPAIGN_MONITOR_LEADS_LIST_ID || process.env.CAMPAIGN_MONITOR_LIST_ID;
  const sheetId = process.env.GOOGLE_SHEET_ID;
  const serviceEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY;

  if (!apiKey || !listId) {
    return NextResponse.json(
      { error: "Campaign Monitor not configured" },
      { status: 500 }
    );
  }

  // If Google Sheets is not configured, skip batch sync
  if (!sheetId || !serviceEmail || !privateKey) {
    return NextResponse.json({
      message: "Batch sync skipped — Google Sheets not configured. Using webhook mode only.",
    });
  }

  try {
    const { google } = await import("googleapis");

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: serviceEmail,
        private_key: privateKey.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const sheets = google.sheets({ version: "v4", auth });
    const tab = process.env.GOOGLE_SHEET_TAB || "Sheet1";

    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: `${tab}!A:Z`,
    });

    const rows = res.data.values;
    if (!rows || rows.length < 2) {
      return NextResponse.json({ synced: 0, message: "No leads found" });
    }

    const headerRow = rows[0].map((h: string) => h.toLowerCase().trim());

    // Find column indices by header name
    const col = (names: string[]) =>
      headerRow.findIndex((h: string) => names.includes(h));

    const emailCol = col(["email", "e-mail", "e-mailadres"]);
    const nameCol = col(["full_name", "name", "naam", "volledige naam"]);
    const companyCol = col(["company_name", "company", "bedrijf"]);
    const websiteCol = col(["website", "url"]);
    const phoneCol = col(["phone_number", "telefoon", "phone", "tel"]);
    const typeCol = col(["wat_voor_bedrijf_heb_je?", "bedrijfstype"]);
    const interestCol = col(["waar_ben_je_vooral_in_geïnteresseerd?", "interesse"]);

    if (emailCol === -1) {
      return NextResponse.json(
        { error: `No email column found. Headers: ${headerRow.join(", ")}` },
        { status: 400 }
      );
    }

    const cellVal = (row: string[], idx: number) =>
      idx !== -1 ? (row[idx] || "").trim() : "";

    let synced = 0;
    let skipped = 0;
    let failed = 0;

    for (let i = 1; i < rows.length; i++) {
      const email = cellVal(rows[i], emailCol).toLowerCase();
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) continue;

      const lead: LeadData = {
        email,
        name: cellVal(rows[i], nameCol),
        company: cellVal(rows[i], companyCol) || undefined,
        website: cellVal(rows[i], websiteCol) || undefined,
        telefoon: cellVal(rows[i], phoneCol) || undefined,
        bedrijfstype: cellVal(rows[i], typeCol) || undefined,
        interesse: cellVal(rows[i], interestCol) || undefined,
      };

      const result = await subscribeToCampaignMonitor(lead, apiKey, listId);

      if (result.ok) {
        if (result.alreadySubscribed) skipped++;
        else synced++;
      } else {
        failed++;
      }
    }

    console.log(`[sync-leads] Batch: Synced ${synced}, Skipped ${skipped}, Failed ${failed}`);
    return NextResponse.json({ synced, alreadySubscribed: skipped, failed });
  } catch (error) {
    console.error("[sync-leads] Batch error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Batch sync failed" },
      { status: 500 }
    );
  }
}
