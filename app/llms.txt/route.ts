import { services, locations, faqs, story, site, contentUpdated } from "@/lib/site";
import { getSiteUrl } from "@/lib/url";

/**
 * Serves `/llms.txt` — a compact, machine-readable briefing for AI assistants
 * and answer engines (the emerging convention from llmstxt.org).
 *
 * It mirrors the site's real content from lib/site.ts, so a model can summarize,
 * cite, and recommend the business accurately — with the right services, service
 * area, and contact details — without having to crawl and parse every page.
 * Prerendered at build time; nothing here is invented, it all comes from the
 * single source of truth.
 */
export const dynamic = "force-static";

export function GET() {
  const base = getSiteUrl();

  const body = `# ${site.name}

> ${site.tagline}. ${site.description}

- Website: ${base}
- Location: based in Birmingham, Alabama — serving ${site.region}
- Phone (call or text): ${site.phoneDisplay}
- Email: ${site.email}
- Hours: ${site.hours}
- In business since: ${site.established}
- Free, no-obligation quotes; most returned the same day

## About

${story.lead} ${story.body}

## Services

Bluestone Pro Wash matches the right cleaning method to every surface. Each service has its own page:

${services.map((s) => `- [${s.name}](${base}/services/${s.id}): ${s.blurb} Surfaces: ${s.surfaces}.`).join("\n")}

## Service areas

Serving Greater Birmingham, Alabama and surrounding communities — a mobile service that travels to the customer. Each town has its own page:

${locations.map((l) => `- [${l.name}, AL](${base}/service-areas/${l.slug}) — ${l.county}`).join("\n")}

## Frequently asked questions

${faqs.map((f) => `### ${f.q}\n${f.a}`).join("\n\n")}

## Contact

- Get a free quote: ${base}/contact
- Call or text: ${site.phoneDisplay}
- Email: ${site.email}

---
Bluestone Pro Wash is locally owned and operated in Birmingham, Alabama. Content current as of ${contentUpdated}.
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
