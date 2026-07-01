"use client";

import { useRef, useState } from "react";
import { motion } from "motion/react";
import { type NavSection, NAV_SECTIONS } from "@/lib/sections";
import TextCursorProximity from "@/components/ui/text-cursor-proximity";

/**
 * SECTION 1 — HERO
 * Component: https://21st.dev/@danielpetho/components/text-cursor-proximity
 *
 * White site background; a brand-violet card centred on screen (the white margin
 * around it is the "generous white padding"). The headline reacts to cursor
 * proximity. Nav icons sit at the bottom of the card; on hover a white pill
 * slides up from the surround and settles just above the icon, then the brand-
 * violet label fades in.
 */
export function HeroSection() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string | null>(null);

  return (
    <section
      id="hero"
      className="flex min-h-screen items-center justify-center bg-background p-6 md:p-12"
    >
      <div
        ref={cardRef}
        className="relative flex aspect-[16/10] w-full max-w-5xl flex-col justify-between rounded-[2rem] bg-brand p-8 text-brand-foreground md:p-14"
      >
        {/* Top-right role */}
        <p className="max-w-[16ch] self-end text-right text-sm font-medium tracking-wide text-brand-foreground/85 md:text-base">
          Technical and creative consultant
        </p>

        {/* Cursor-proximity headline */}
        <h1 className="pointer-events-none select-none text-center font-heading text-[13vw] font-semibold leading-[0.95] tracking-tight md:text-[6.5rem] lg:text-[7.5rem]">
          <TextCursorProximity
            label="Isaac W. R. Lombard"
            containerRef={cardRef}
            radius={130}
            falloff="gaussian"
            className="text-brand-foreground"
            styles={{
              fontWeight: { from: 400, to: 800 },
              letterSpacing: { from: "0em", to: "0.045em" },
              scale: { from: 1, to: 1.14 },
            }}
          />
        </h1>

        {/* Nav icons with sliding hover pill */}
        <nav
          className="flex items-end justify-center gap-8 md:gap-12"
          onMouseLeave={() => setActive(null)}
        >
          {NAV_SECTIONS.map((section) => (
            <NavPill
              key={section.id}
              section={section}
              active={active === section.id}
              onEnter={() => setActive(section.id)}
            />
          ))}
        </nav>
      </div>
    </section>
  );
}

function NavPill({
  section,
  active,
  onEnter,
}: {
  section: NavSection;
  active: boolean;
  onEnter: () => void;
}) {
  const { id, label, icon: Icon } = section;

  return (
    <div
      className="relative flex flex-col items-center"
      onMouseEnter={onEnter}
    >
      {/* White pill — slides up from outside the card, settles above the icon */}
      <motion.div
        className="pointer-events-none absolute bottom-full left-1/2 mb-4"
        style={{ x: "-50%" }}
        initial={false}
        animate={active ? { y: 0, opacity: 1 } : { y: 130, opacity: 0 }}
        transition={{ type: "spring", stiffness: 420, damping: 32, mass: 0.8 }}
      >
        <div className="rounded-full bg-background px-4 py-1.5 shadow-lg shadow-brand-deep/40 ring-1 ring-brand-deep/5">
          <motion.span
            className="block whitespace-nowrap text-sm font-medium text-brand"
            initial={false}
            animate={{ opacity: active ? 1 : 0 }}
            transition={{ duration: 0.18, delay: active ? 0.26 : 0 }}
          >
            {label}
          </motion.span>
        </div>
      </motion.div>

      <a
        href={`#${id}`}
        aria-label={label}
        className="rounded-full p-1 text-brand-foreground/80 transition-colors duration-200 hover:text-brand-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-foreground/60"
      >
        <Icon className="size-6 md:size-7" />
      </a>
    </div>
  );
}
