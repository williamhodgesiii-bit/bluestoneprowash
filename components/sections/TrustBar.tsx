import { Container } from "../ui/Container";
import { Icon } from "../ui/Icon";
import { trustPoints } from "@/lib/site";

export function TrustBar() {
  return (
    <section className="bg-night-900 text-white">
      <Container className="py-5">
        <ul className="grid grid-cols-2 gap-x-6 gap-y-4 md:grid-cols-4">
          {trustPoints.map((p) => (
            <li key={p.label} className="flex items-center gap-3">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white/10 text-brand-300">
                <Icon name={p.icon} className="h-[18px] w-[18px]" />
              </span>
              <span className="text-sm font-semibold leading-tight text-white/90">{p.label}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
