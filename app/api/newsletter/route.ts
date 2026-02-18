import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, name } = await req.json();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
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

  const body = {
    EmailAddress: email,
    Name: name ?? "",
    Resubscribe: true,
    RestartSubscriptionBasedAutoresponders: true,
    ConsentToTrack: "Yes",
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

  console.error("Campaign Monitor error:", data);
  return NextResponse.json(
    { error: "Inschrijving mislukt. Probeer het opnieuw." },
    { status: 500 }
  );
}
