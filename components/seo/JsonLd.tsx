import { serializeJsonLd } from "@/lib/schema";

/**
 * Renders a JSON-LD <script>. Server component — the structured data ships in
 * the initial HTML so crawlers and AI systems see it without executing JS.
 */
export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}
