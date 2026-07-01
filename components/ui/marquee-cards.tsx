"use client";

import { ChevronDown, ExternalLink, type LucideIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { IconType } from "react-icons";

export type MarqueeCard = {
  title: string;
  kind: string;
  description?: string;
  image?: string;
  icon?: LucideIcon | IconType;
  /** Where the card links. Use "#id" to scroll in-page; http(s) opens in a new tab. */
  href?: string;
};

/**
 * PrebuiltUI marquee-cards-with-hover-effect, as-is: a horizontal marquee that
 * pauses on hover, each card scales down and reveals its title under a
 * backdrop-blur, with gradient fade edges. Content-only adaptation.
 */
export function MarqueeCards({ cards, durationMs }: { cards: MarqueeCard[]; durationMs?: number }) {
  const [stopScroll, setStopScroll] = useState(false);

  return (
    <>
      <style>{`
        .marquee-inner { animation: marqueeScroll linear infinite; }
        @keyframes marqueeScroll {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      {/* Desktop: hover-pausing marquee */}
      <div
        className="relative mx-auto hidden w-full max-w-6xl overflow-hidden md:block"
        onMouseEnter={() => setStopScroll(true)}
        onMouseLeave={() => setStopScroll(false)}
      >
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-background to-transparent md:w-40" />

        <div
          className="marquee-inner flex w-fit"
          style={{
            animationPlayState: stopScroll ? "paused" : "running",
            animationDuration: `${durationMs ?? cards.length * 2500}ms`,
          }}
        >
          <div className="flex">
            {[...cards, ...cards].map((card, index) => (
              <Card key={index} card={card} />
            ))}
          </div>
        </div>

        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-background to-transparent md:w-40" />
      </div>

      {/* Mobile: worked-on as image pills, services as tap-to-expand accordions */}
      <MobileCardList cards={cards} />
    </>
  );
}

function MobileCardList({ cards }: { cards: MarqueeCard[] }) {
  const worked = cards.filter((c) => c.image);
  const services = cards.filter((c) => !c.image);
  const [open, setOpen] = useState<Set<string>>(new Set());
  const toggle = (id: string) =>
    setOpen((s) => {
      const n = new Set(s);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-3 px-6 md:hidden">
      {worked.map((card) => (
        <a
          key={card.title}
          href={card.href}
          {...(card.href?.startsWith("http") ? { target: "_blank", rel: "noreferrer noopener" } : {})}
          className="flex items-center gap-3 rounded-2xl border border-black/5 bg-white p-2.5 shadow-sm"
        >
          {/* biome-ignore lint/performance/noImgElement: work thumbnail, swapped by Isaac */}
          <img src={card.image} alt="" className="size-14 shrink-0 rounded-xl object-cover object-top" />
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground/45">{card.kind}</p>
            <p className="truncate font-semibold text-foreground">{card.title}</p>
          </div>
          <ExternalLink className="size-4 shrink-0 text-foreground/40" />
        </a>
      ))}

      {services.map((card) => {
        const Icon = card.icon;
        const isOpen = open.has(card.title);
        return (
          <div key={card.title} className="overflow-hidden rounded-2xl bg-brand text-brand-foreground">
            <button
              type="button"
              onClick={() => toggle(card.title)}
              aria-expanded={isOpen}
              className="flex w-full items-center gap-3 px-4 py-3.5 text-left"
            >
              {Icon && <Icon className="size-5 shrink-0 text-brand-foreground/90" />}
              <span className="flex-1 font-semibold leading-tight">{card.title}</span>
              <ChevronDown className={`size-5 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && card.description && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  <div className="px-4 pb-4">
                    <p className="text-sm leading-snug text-brand-foreground/80">{card.description}</p>
                    {card.href && (
                      <a
                        href={card.href}
                        className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-foreground"
                      >
                        Get in touch →
                      </a>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

function Card({ card }: { card: MarqueeCard }) {
  const Icon = card.icon;
  const external = card.href?.startsWith("http");
  const className =
    "group relative mx-4 block h-[20rem] w-56 shrink-0 overflow-hidden transition-all duration-300 hover:scale-90";
  const inner = (
    <>
      {card.image ? (
        // biome-ignore lint/performance/noImgElement: marquee card art, swapped by Isaac
        <img src={card.image} alt="" className="h-full w-full object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-brand">
          {Icon && <Icon className="size-10 text-brand-foreground/80" />}
        </div>
      )}

      {/* Full info on hover. */}
      <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center gap-2 bg-black/40 px-5 opacity-0 backdrop-blur-md transition-all duration-300 group-hover:opacity-100">
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70">{card.kind}</span>
        <p className="text-center text-lg font-semibold text-white">{card.title}</p>
        {card.description && <p className="text-center text-sm leading-snug text-white/80">{card.description}</p>}
      </div>
    </>
  );

  if (!card.href) return <div className={className}>{inner}</div>;
  return (
    <a href={card.href} className={className} {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}>
      {inner}
    </a>
  );
}
