/**
 * SECTION 4 — ELSEWHERE
 *
 * A slim band pointing to iwrl.net, where the personal projects, concepts and
 * writing now live. Keeps this site to the professional pitch.
 */
import { ArrowUpRight } from "lucide-react";

const LINKS = [
  { label: "Selected work", description: "Portfolio and concepts", href: "https://iwrl.net/#concepts" },
  { label: "Writing", description: "Thoughts, human and AI", href: "https://iwrl.net/#thoughts" },
];

export function ElsewhereSection() {
  return (
    <section
      id="elsewhere"
      className="flex flex-col items-center gap-10 bg-background px-6 py-24 text-foreground"
    >
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand">More on iwrl.net</p>

      <ul className="flex flex-col items-center gap-8 md:flex-row md:gap-20">
        {LINKS.map(({ label, description, href }) => (
          <li key={label}>
            <a
              href={href}
              target="_blank"
              rel="noreferrer noopener"
              className="group flex flex-col items-center gap-1 text-center"
            >
              <span className="flex items-center gap-2 font-heading text-3xl font-semibold tracking-tight transition-colors group-hover:text-brand md:text-5xl">
                {label}
                <ArrowUpRight className="size-6 text-brand transition-transform duration-300 ease-out group-hover:-translate-y-1 group-hover:translate-x-1 md:size-8" />
              </span>
              <span className="text-sm text-muted-foreground">{description}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
