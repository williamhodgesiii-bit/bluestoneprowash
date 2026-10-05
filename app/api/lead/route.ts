// Forwards quote-form leads to the CRM's lead-intake webhook.
//
// The browser posts here (same origin, so no CORS) and this server-side hop
// sends the CRM a normal `application/json` POST. Doing it from the server also
// keeps the webhook URL out of the public bundle and puts any delivery failure
// in the Vercel function logs instead of silently in a visitor's browser.
//
// Override the destination with CRM_WEBHOOK_URL in Vercel; set it to an empty
// string to switch CRM forwarding off.
const CRM_WEBHOOK_URL =
  process.env.CRM_WEBHOOK_URL ?? "https://bluestone-leadrec.andersononeal05.workers.dev/";

const FIELDS = ["name", "phone", "email", "service", "address", "message"] as const;
const MAX_FIELD_LENGTH = 5000;

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }
  if (!body || typeof body !== "object") {
    return Response.json({ ok: false, error: "Invalid body" }, { status: 400 });
  }

  // Spam honeypot ticked → pretend all is well, forward nothing.
  if (body.botcheck) return Response.json({ ok: true });

  const lead: Record<string, string> = {};
  for (const field of FIELDS) {
    const value = body[field];
    lead[field] = typeof value === "string" ? value.trim().slice(0, MAX_FIELD_LENGTH) : "";
  }
  if (!lead.name && !lead.phone && !lead.email) {
    return Response.json({ ok: false, error: "Missing contact details" }, { status: 400 });
  }

  if (!CRM_WEBHOOK_URL) return Response.json({ ok: true, forwarded: false });

  const payload = {
    ...lead,
    source: "website-quote-form",
    page: typeof body.page === "string" ? body.page.slice(0, 500) : "",
    submittedAt: new Date().toISOString(),
  };

  try {
    const res = await fetch(CRM_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      console.error(`CRM webhook responded ${res.status}: ${(await res.text()).slice(0, 500)}`);
      return Response.json({ ok: false, error: "CRM rejected the lead" }, { status: 502 });
    }
  } catch (err) {
    console.error("CRM webhook request failed:", err);
    return Response.json({ ok: false, error: "CRM unreachable" }, { status: 502 });
  }

  return Response.json({ ok: true, forwarded: true });
}
