import { NextRequest, NextResponse } from "next/server";

function isLikelyCustomFieldError(status: number, data: unknown) {
  if (status !== 400) return false;
  const message = (data as { Message?: unknown })?.Message;
  return typeof message === "string" && message.toLowerCase().includes("custom field");
}

export async function POST(req: NextRequest) {
  const { email, name } = await req.json();
  const normalizedEmail = String(email ?? "").trim().toLowerCase();
  const normalizedName = String(name ?? "").trim();

  if (!normalizedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
    return NextResponse.json({ error: "Ongeldig e-mailadres." }, { status: 400 });
  }

  const apiKey = process.env.CAMPAIGN_MONITOR_API_KEY;
  const listId = process.env.CAMPAIGN_MONITOR_LIST_ID;

  if (!apiKey || !listId) {
    console.error("Campaign Monitor env vars missing: CAMPAIGN_MONITOR_API_KEY or CAMPAIGN_MONITOR_LIST_ID");
    return NextResponse.json(
      { error: "Nieuwsbrief configuratie ontbreekt." },
      { status: 500 }
    );
  }

  const token = Buffer.from(`${apiKey}:x`).toString("base64");

  async function postSubscriber(withCustomFields: boolean) {
    const body: Record<string, unknown> = {
      EmailAddress: normalizedEmail,
      Name: normalizedName,
      Resubscribe: true,
      RestartSubscriptionBasedAutoresponders: true,
      ConsentToTrack: "Yes",
    };
    if (withCustomFields) {
      body.CustomFields = [{ Key: "Bron", Value: "Nieuwsbrief" }];
    }

    return fetch(
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
  }

  let res: Response;

  try {
    res = await postSubscriber(true);
  } catch (error) {
    console.error("Campaign Monitor network error:", error);
    return NextResponse.json(
      { error: "Inschrijving mislukt. Probeer het opnieuw." },
      { status: 500 }
    );
  }

  if (res.ok) {
    return NextResponse.json({ success: true });
  }

  // Campaign Monitor returns 400 with a code for already-subscribed etc.
  const data = await res.json().catch(() => ({}));
  const cmCode: number = (data as { Code?: number }).Code ?? 0;

  // Code 203 = already subscribed — treat as success
  if (cmCode === 203) {
    return NextResponse.json({ success: true, alreadySubscribed: true });
  }

  // If CustomFields are not configured on the list, retry without them.
  if (isLikelyCustomFieldError(res.status, data)) {
    try {
      const res2 = await postSubscriber(false);
      if (res2.ok) {
        return NextResponse.json({ success: true });
      }

      const data2 = await res2.json().catch(() => ({}));
      const cmCode2: number = (data2 as { Code?: number }).Code ?? 0;
      if (cmCode2 === 203) {
        return NextResponse.json({ success: true, alreadySubscribed: true });
      }
    } catch (error) {
      console.error("Campaign Monitor retry network error:", error);
    }
  }

  console.error("Campaign Monitor error:", data);
  return NextResponse.json(
    { error: "Inschrijving mislukt. Probeer het opnieuw." },
    { status: 500 }
  );
}
