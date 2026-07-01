import { NAV_SECTIONS } from "@/lib/sections";

/**
 * SECTION 1 — HERO
 * Component: https://21st.dev/@danielpetho/components/text-cursor-proximity
 *
 * Spec:
 * - "Isaac W. R. Lombard" as the big cursor-proximity headline.
 * - Top-right label: "Technical and creative consultant".
 * - Generous white padding framing a brand-violet panel (name in white).
 * - Nav icons pinned to the bottom, one per NAV_SECTIONS entry. On hover a
 *   white pill slides up from the padding revealing the label in brand violet
 *   (text === background colour), telling the user where the icon goes.
 *
 * TODO(hero-agent): replace this stub with the real cursor-proximity hero +
 * hover-pill nav. The display font this component ships with becomes the site
 * display font.
 */
export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center gap-16 bg-brand p-8 text-brand-foreground md:p-16"
    >
      <p className="absolute right-8 top-8 max-w-[12ch] text-right text-sm font-medium md:right-16 md:top-16">
        Technical and creative consultant
      </p>

      <h1 className="text-center text-5xl font-semibold tracking-tight md:text-8xl">
        Isaac W. R. Lombard
      </h1>

      <nav className="absolute bottom-10 flex items-center gap-8">
        {NAV_SECTIONS.map(({ id, label, icon: Icon }) => (
          <a
            key={id}
            href={`#${id}`}
            aria-label={label}
            className="text-brand-foreground/80 transition hover:text-brand-foreground"
          >
            <Icon className="size-6" />
          </a>
        ))}
      </nav>
    </section>
  );
}
