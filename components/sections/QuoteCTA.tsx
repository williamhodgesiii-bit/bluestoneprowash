"use client";

import { useState } from "react";
import { Container } from "../ui/Container";
import { Icon } from "../ui/Icon";
import { Button } from "../ui/Button";
import { services, site } from "@/lib/site";

const QUOTE_ENDPOINT = process.env.NEXT_PUBLIC_QUOTE_ENDPOINT; // optional Formspree/own URL

const contactMethods = [
  { icon: "Phone", label: "Call us", value: site.phoneDisplay, href: site.phoneHref },
  { icon: "MessageSquare", label: "Text us", value: site.phoneDisplay, href: site.smsHref },
  { icon: "Mail", label: "Email", value: site.email, href: `mailto:${site.email}` },
  { icon: "Clock", label: "Hours", value: site.hours, href: undefined },
];

type Status = "idle" | "sending" | "sent" | "error";

export function QuoteCTA() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    setStatus("sending");

    try {
      if (QUOTE_ENDPOINT) {
        const res = await fetch(QUOTE_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error("Request failed");
      } else {
        // Zero-backend fallback: open a prefilled email.
        const body = `Name: ${data.name}\nPhone: ${data.phone}\nEmail: ${data.email}\nService: ${data.service}\nAddress: ${data.address || "—"}\n\n${data.message || ""}`;
        const mailto = `mailto:${site.email}?subject=${encodeURIComponent(`Quote request — ${data.name}`)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailto;
      }
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="quote" className="relative scroll-mt-24 overflow-hidden bg-night-950 py-20 text-white sm:py-28">
      <div className="absolute inset-0 spotlight opacity-80" />
      <div className="absolute inset-0 grid-texture opacity-25" />

      <Container className="relative">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: pitch + contact */}
          <div>
            <span className="eyebrow text-spray">
              <span className="h-px w-7 bg-spray/60" /> Free Quote
            </span>
            <h2 className="mt-4 text-[clamp(2rem,4.6vw,3.4rem)] font-extrabold leading-[1.02]">
              Request Your<br />
              <span className="text-gradient">Free Quote</span>
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-white/70">
              Tell us what needs cleaning and we&apos;ll send a clear, upfront price — often the same day.
              No deposit required, no obligation.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {contactMethods.map((m) => {
                const inner = (
                  <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 transition-colors duration-300 hover:border-white/25 hover:bg-white/10">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-brand-600 text-white">
                      <Icon name={m.icon} className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <div className="text-xs font-semibold uppercase tracking-wide text-white/50">{m.label}</div>
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

          {/* Right: form */}
          <div className="rounded-[1.5rem] border border-white/10 bg-white p-6 text-ink shadow-lift sm:p-8">
            {status === "sent" ? (
              <div className="flex h-full min-h-[420px] flex-col items-center justify-center text-center">
                <span className="grid h-16 w-16 place-items-center rounded-full bg-brand-50 text-brand-600">
                  <Icon name="BadgeCheck" className="h-8 w-8" />
                </span>
                <h3 className="mt-5 text-2xl font-extrabold text-ink">Thanks — request sent</h3>
                <p className="mt-3 max-w-sm text-ink-soft">
                  We&apos;ll be in touch shortly with your free quote. Need us sooner?
                </p>
                <Button href={site.phoneHref} className="mt-6" iconLeft="Phone">
                  Call {site.phoneDisplay}
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
                      className="rounded-xl border border-fog-300 bg-fog-50 px-4 py-3 text-ink outline-none transition-colors focus:border-brand-500 focus:bg-white"
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
                    placeholder="Tell us about the job — driveway size, roof type, etc."
                    className="resize-none rounded-xl border border-fog-300 bg-fog-50 px-4 py-3 text-ink outline-none transition-colors focus:border-brand-500 focus:bg-white"
                  />
                </div>

                {status === "error" && (
                  <p className="text-sm font-medium text-red-600">
                    Something went wrong. Please call us at {site.phoneDisplay}.
                  </p>
                )}

                <Button size="lg" className="mt-1 w-full" arrow>
                  {status === "sending" ? "Sending…" : "Get My Free Quote"}
                </Button>
                <p className="text-center text-xs text-ink-soft">
                  We respect your inbox — your details are only used to prepare your quote.
                </p>
              </form>
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
        className="rounded-xl border border-fog-300 bg-fog-50 px-4 py-3 text-ink outline-none transition-colors placeholder:text-ink-soft/50 focus:border-brand-500 focus:bg-white"
      />
    </div>
  );
}
