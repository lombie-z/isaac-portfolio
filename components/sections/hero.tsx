import { NAV_SECTIONS } from "@/lib/sections";

/**
 * SECTION 1 — HERO
 * Component: https://21st.dev/@danielpetho/components/text-cursor-proximity
 *
 * Spec:
 * - White site background. A brand-violet hero CARD centred on screen; the white
 *   margin around the card is the "generous white padding".
 * - "Isaac W. R. Lombard" as the cursor-proximity headline (white text).
 * - Top-right of the card: "Technical and creative consultant".
 * - Nav icons row at the bottom of the card (one per NAV_SECTIONS).
 * - Hover interaction: a single WHITE pill slides in from OUTSIDE the card and
 *   settles just above the hovered icon. The label fades in ONLY once the pill
 *   has settled, coloured the SAME as the card background (brand violet). The
 *   white pill === the site background, so it reads as emerging from the surround.
 * - The display font this component ships with becomes the site display font.
 *
 * TODO(hero-agent): replace this stub with the real cursor-proximity headline
 * + the sliding-pill nav interaction.
 */
export function HeroSection() {
  return (
    <section
      id="hero"
      className="flex min-h-screen items-center justify-center bg-background p-6 md:p-10"
    >
      <div className="relative flex aspect-[4/3] w-full max-w-5xl flex-col justify-between overflow-hidden rounded-3xl bg-brand p-8 text-brand-foreground md:p-14">
        <p className="max-w-[14ch] self-end text-right text-sm font-medium">
          Technical and creative consultant
        </p>

        <h1 className="text-center text-5xl font-semibold tracking-tight md:text-8xl">
          Isaac W. R. Lombard
        </h1>

        <nav className="flex items-center justify-center gap-8">
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
      </div>
    </section>
  );
}
