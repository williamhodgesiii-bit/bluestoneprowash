"use client";

import { useState } from "react";
import { Container } from "../ui/Container";
import { Icon, type IconName } from "../ui/Icon";
import { Button } from "../ui/Button";
import { services, site } from "@/lib/site";

const contactMethods: { icon: IconName; label: string; value: string; href?: string }[] = [
  { icon: "Phone", label: "Call us", value: site.phoneDisplay, href: site.phoneHref },
  { icon: "MessageSquare", label: "Text us", value: site.phoneDisplay, href: site.smsHref },
  { icon: "Mail", label: "Email", value: site.email, href: `mailto:${site.email}` },
  { icon: "Clock", label: "Hours", value: site.hours },
];

type Status = "idle" | "sending" | "sent" | "error";

// The online form isn't wired up for submissions yet, so we frost it over and
// point people to call/email in the meantime. Flip this to `false` (once the
// Web3Forms key is confirmed working) to switch the live form back on.
const FORM_COMING_SOON: boolean = true;

export function QuoteForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    setStatus("sending");

    try {
      if (site.web3formsKey) {
        // Web3Forms: free, unlimited form→email. The `botcheck` honeypot is only
        // present when a bot ticks the hidden box, so real leads pass through.
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            access_key: site.web3formsKey,
            subject: `New quote request${data.service ? ` — ${data.service}` : ""} · ${data.name || "Website"}`,
            from_name: `${site.name} website`,
            ...data,
          }),
        });
        const json = await res.json();
        if (!json.success) throw new Error(json.message || "Submission failed");
      } else {
        // No key configured yet → open a prefilled email so a lead is never lost.
        const body = `Name: ${data.name}\nPhone: ${data.phone}\nEmail: ${data.email}\nService: ${data.service}\nAddress: ${data.address || "(not provided)"}\n\n${data.message || ""}`;
        const mailto = `mailto:${site.email}?subject=${encodeURIComponent(`Quote request from ${data.name}`)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailto;
      }
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="quote" className="bg-steel-50 py-8 sm:py-14">
      <Container>
        {/* On phones the form itself comes first (flex-col-reverse) so nobody
            has to scroll past a full screen of blue panel to start typing;
            desktop keeps pitch left / form right. */}
        <div className="flex flex-col-reverse overflow-hidden rounded-2xl border border-steel-200 shadow-lift lg:grid lg:grid-cols-12">
          {/* Left: pitch + contact, in wrap blue */}
          <div className="bg-brand-600 p-6 text-white sm:p-10 lg:col-span-5">
            <span className="kicker text-brand-100">Free quote</span>
            <h2 className="mt-3 text-[clamp(1.6rem,3.4vw,2.6rem)] font-extrabold leading-[1.04] text-white">
              Tell us what needs cleaning.
            </h2>
            <p className="mt-3 max-w-md leading-relaxed text-white/85 sm:mt-4">
              We&apos;ll send a clear, upfront price, usually the same day. No deposit, no obligation,
              no hard sell.
            </p>

            <div className="mt-6 flex flex-col gap-2.5 sm:mt-8 sm:gap-3">
              {contactMethods.map((m) => {
                const inner = (
                  <div className="flex items-center gap-3 rounded-lg bg-white/10 p-3.5 transition-colors hover:bg-white/15">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-white text-brand-700">
                      <Icon name={m.icon} className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <div className="text-xs font-semibold uppercase tracking-wide text-white/60">{m.label}</div>
                      <div className="truncate font-bold text-white">{m.value}</div>
                    </div>
                  </div>
                );
                return m.href ? (
                  <a key={m.label} href={m.href}>
                    {inner}
                  </a>
                ) : (
                  <div key={m.label}>{inner}</div>
                );
              })}
            </div>
          </div>

          {/* Right: the form */}
          <div className="relative bg-white p-6 text-ink sm:p-10 lg:col-span-7">
            {status === "sent" ? (
              <div className="flex h-full min-h-[420px] flex-col items-center justify-center text-center">
                <span className="grid h-16 w-16 place-items-center rounded-full bg-brand-50 text-brand-600">
                  <Icon name="BadgeCheck" className="h-8 w-8" />
                </span>
                <h3 className="mt-5 text-2xl font-extrabold text-ink">Thanks!</h3>
                <p className="mt-3 max-w-sm text-ink-soft">
                  A team member will contact you shortly. You can also reach us at{" "}
                  <a href={site.phoneHref} className="font-semibold text-brand-700 hover:text-brand-600">
                    {site.phoneDisplay}
                  </a>{" "}
                  or{" "}
                  <a
                    href={`mailto:${site.email}`}
                    className="font-semibold text-brand-700 hover:text-brand-600"
                  >
                    {site.email}
                  </a>
                  .
                </p>
              </div>
            ) : (
              <>
                {/* The real form, frosted + made inert while it's coming soon. */}
                <div
                  className={
                    FORM_COMING_SOON ? "pointer-events-none select-none opacity-50 blur-[3px]" : undefined
                  }
                  inert={FORM_COMING_SOON}
                >
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* Spam honeypot — hidden from people, tempting to bots. */}
                <input
                  type="checkbox"
                  name="botcheck"
                  className="hidden"
                  style={{ display: "none" }}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />
                <h3 className="text-xl font-extrabold tracking-tight text-ink">Request your quote</h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field label="Full name" name="name" required placeholder="Jane Smith" />
                  <Field label="Phone" name="phone" type="tel" required placeholder="(205) 555-0199" />
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field label="Email" name="email" type="email" required placeholder="jane@email.com" />
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="service" className="text-sm font-semibold text-ink">
                      Service needed
                    </label>
                    <select
                      id="service"
                      name="service"
                      defaultValue=""
                      className="rounded-lg border border-steel-300 bg-steel-50 px-4 py-3 text-ink outline-none transition-colors focus:border-brand-500 focus:bg-white"
                    >
                      <option value="" disabled>
                        Select a service…
                      </option>
                      {services.map((s) => (
                        <option key={s.id} value={s.name}>
                          {s.name}
                        </option>
                      ))}
                      <option value="Multiple / Not sure">Multiple / Not sure</option>
                    </select>
                  </div>
                </div>
                <Field label="Property address or city" name="address" placeholder="Hoover, AL" />
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="text-sm font-semibold text-ink">
                    Anything else? <span className="font-normal text-ink-soft">(optional)</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    placeholder="Tell us about the job: driveway size, roof type, etc."
                    className="resize-none rounded-lg border border-steel-300 bg-steel-50 px-4 py-3 text-ink outline-none transition-colors focus:border-brand-500 focus:bg-white"
                  />
                </div>

                {status === "error" && (
                  <p className="text-sm font-medium text-red-600">
                    Something went wrong. Please call us at {site.phoneDisplay}.
                  </p>
                )}

                <Button size="lg" className="mt-1 w-full" arrow disabled={status === "sending"}>
                  {status === "sending" ? "Sending…" : "Get my free quote"}
                </Button>
                <p className="text-center text-xs text-ink-soft">
                  We only use your details to prepare your quote. No spam, ever.
                </p>
                  </form>
                </div>

                {FORM_COMING_SOON && (
                  <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-8">
                    <div className="w-full max-w-sm rounded-2xl border border-steel-200 bg-white/95 p-5 text-center shadow-lift backdrop-blur sm:p-7">
                      <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-brand-50 text-brand-600">
                        <Icon name="Clock" className="h-6 w-6" />
                      </span>
                      <h3 className="mt-4 text-xl font-extrabold text-ink">Quote form coming soon</h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                        Our online form is almost ready. For now, reach us directly and we&apos;ll
                        send a fast, free quote.
                      </p>
                      <div className="mt-5 flex flex-col gap-2.5">
                        <a
                          href={site.phoneHref}
                          className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-600 px-4 py-3 font-bold text-white transition-colors hover:bg-brand-700"
                        >
                          <Icon name="Phone" className="h-4 w-4 shrink-0" /> {site.phoneDisplay}
                        </a>
                        <a
                          href={`mailto:${site.email}`}
                          className="inline-flex items-center justify-center gap-2 rounded-lg border border-steel-300 bg-white px-3 py-3 text-[0.8rem] font-bold text-ink transition-colors hover:border-brand-300 hover:text-brand-700 sm:text-sm"
                        >
                          <Icon name="Mail" className="h-4 w-4 shrink-0 text-brand-600" />
                          <span className="break-all">{site.email}</span>
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-sm font-semibold text-ink">
        {label} {required && <span className="text-brand-600">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="rounded-lg border border-steel-300 bg-steel-50 px-4 py-3 text-ink outline-none transition-colors placeholder:text-ink-soft/50 focus:border-brand-500 focus:bg-white"
      />
    </div>
  );
}
