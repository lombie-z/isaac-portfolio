"use client";

import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Infinite horizontal marquee of cards, built from scratch to match the
 * "marquee-cards-with-hover-effect" reference (the 21st.dev source 500s and
 * can't be pulled). Motion is driven by CSS keyframes injected in a
 * component-scoped <style> tag — app/globals.css must not be touched.
 *
 * Behaviour: each row scrolls continuously; hovering the row pauses it and
 * dims/blurs the other cards, while the hovered card lifts + scales.
 */

export type ShowcaseCard = {
  id: string;
  /** "info" = icon + copy; "image" = placeholder gradient block + copy. */
  kind: "info" | "image";
  title: string;
  description: string;
  icon?: LucideIcon;
  /** Tailwind gradient classes for the placeholder "image" block. */
  imageClassName?: string;
  /** Small tag rendered top-left (e.g. "Service" / "Project · placeholder"). */
  eyebrow?: string;
  /** Marks placeholder content so it reads as swap-me. */
  isPlaceholder?: boolean;
};

function Card({ card }: { card: ShowcaseCard }) {
  const Icon = card.icon;
  return (
    <article
      className={cn(
        "relative flex h-64 w-72 shrink-0 flex-col justify-between overflow-hidden rounded-3xl p-6",
        "bg-brand text-brand-foreground shadow-lg shadow-brand-deep/20 ring-1 ring-inset ring-white/10",
        // hover choreography — siblings dim/blur, hovered card lifts + scales
        "transition-all duration-500 ease-out will-change-transform",
        "group-hover/row:scale-[0.97] group-hover/row:opacity-40 group-hover/row:blur-[1px]",
        "hover:!scale-105 hover:!opacity-100 hover:!blur-0 hover:-translate-y-2 hover:shadow-xl hover:shadow-brand-deep/40",
      )}
    >
      {card.kind === "image" ? (
        <div
          className={cn(
            "absolute inset-0 -z-0 bg-gradient-to-br opacity-90",
            card.imageClassName ?? "from-brand-muted via-brand to-brand-deep",
          )}
          aria-hidden
        >
          {/* clearly a placeholder image */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="rounded-full border border-white/30 px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-white/70">
              image placeholder
            </span>
          </div>
        </div>
      ) : null}

      {/* readability scrim on image cards */}
      {card.kind === "image" ? (
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-brand-deep/90 to-transparent" aria-hidden />
      ) : null}

      <div className="relative flex items-start justify-between gap-3">
        {card.eyebrow ? (
          <span className="rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-brand-foreground/90 backdrop-blur">
            {card.eyebrow}
          </span>
        ) : (
          <span />
        )}
        {Icon && card.kind === "info" ? (
          <span className="grid size-10 place-items-center rounded-2xl bg-white/10 ring-1 ring-inset ring-white/15">
            <Icon className="size-5" />
          </span>
        ) : null}
      </div>

      <div className="relative space-y-1.5">
        <h3 className="text-lg font-semibold leading-tight tracking-tight">{card.title}</h3>
        <p className="text-sm leading-snug text-brand-foreground/80">{card.description}</p>
        {card.isPlaceholder ? (
          <p className="pt-1 text-[10px] font-medium uppercase tracking-widest text-brand-foreground/50">
            placeholder — swap in real project
          </p>
        ) : null}
      </div>
    </article>
  );
}

export function MarqueeRow({
  cards,
  direction = "left",
  durationSeconds = 40,
  className,
}: {
  cards: ShowcaseCard[];
  direction?: "left" | "right";
  durationSeconds?: number;
  className?: string;
}) {
  // Duplicate the set so the -50% translate loops seamlessly.
  const doubled = [...cards, ...cards];
  const animName = direction === "left" ? "marquee-scroll-left" : "marquee-scroll-right";

  return (
    <div
      className={cn(
        "group/row relative flex w-full overflow-hidden",
        // fade the row edges into the white page
        "[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]",
        className,
      )}
    >
      <div
        className="flex w-max gap-6 py-4 hover:[animation-play-state:paused] group-hover/row:[animation-play-state:paused]"
        style={{ animation: `${animName} ${durationSeconds}s linear infinite` }}
      >
        {doubled.map((card, i) => (
          <Card key={`${card.id}-${i}`} card={card} />
        ))}
      </div>

      <style>{`
        @keyframes marquee-scroll-left {
          from { transform: translateX(0); }
          to   { transform: translateX(calc(-50% - 0.75rem)); }
        }
        @keyframes marquee-scroll-right {
          from { transform: translateX(calc(-50% - 0.75rem)); }
          to   { transform: translateX(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .group\\/row > div { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
