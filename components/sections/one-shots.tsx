"use client";

import { ChevronDown, ChevronUp, Eye } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef, useState } from "react";

/**
 * SECTION 4 — ONE-SHOTS (custom parallax billboard)
 *
 * A bus-stop billboard photo stays mostly fixed and drifts slowly as you scroll
 * (subtle "rolling window"). Inside the billboard's poster panel we show demo
 * sites, with the extracted glass/reflection texture blended on top. Left-hand
 * glass controls cycle sites (up/down) with a "take a geez" button in the middle
 * that opens the live site. The scene fades out to the left/right through a
 * glassy overlay.
 *
 * TUNING: POSTER holds the poster-quad geometry over billboard-base.png
 * (2447×1531). Values are % of the scene box; adjust to sit exactly on the
 * billboard's blank white panel (below the "ONE-SHOT WEBSITES" header).
 */

type Demo = { name: string; url: string; className: string };

// Placeholder demo sites — Isaac will replace with real screenshots + URLs.
const DEMOS: Demo[] = [
  { name: "Aperture Studio", url: "#", className: "from-rose-400 via-fuchsia-500 to-indigo-600" },
  { name: "Northwind Coffee", url: "#", className: "from-amber-300 via-orange-500 to-rose-500" },
  { name: "Halcyon Yoga", url: "#", className: "from-emerald-300 via-teal-500 to-cyan-600" },
  { name: "Monolith Type", url: "#", className: "from-zinc-200 via-zinc-400 to-zinc-700" },
];

// TODO(tune): fine-tune against the in-browser render.
const POSTER = {
  left: 44.2,
  top: 25,
  width: 24,
  height: 55,
  rotateY: -12.5, // panel recedes to the right
  rotateZ: 0.4,
  perspective: 1400,
};

export function OneShotsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);
  const demo = DEMOS[index];

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  // Subtle rolling-window drift while the scene is pinned.
  const y = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.06, 1, 1.06]);

  const cycle = (dir: 1 | -1) => setIndex((i) => (i + dir + DEMOS.length) % DEMOS.length);

  return (
    <section ref={sectionRef} id="one-shots" className="relative h-[220vh] bg-neutral-950 text-neutral-50">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        {/* Parallax billboard scene */}
        <motion.div style={{ y, scale }} className="relative aspect-[2447/1531] h-full">
          <Image
            src="/billboard/billboard-base.png"
            alt="Bus-stop billboard advertising one-shot websites"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />

          {/* Poster: demo screenshot + glass reflection, warped into the panel */}
          <div
            className="absolute"
            style={{
              left: `${POSTER.left}%`,
              top: `${POSTER.top}%`,
              width: `${POSTER.width}%`,
              height: `${POSTER.height}%`,
              perspective: `${POSTER.perspective}px`,
            }}
          >
            <div
              className="relative h-full w-full overflow-hidden"
              style={{
                transform: `rotateY(${POSTER.rotateY}deg) rotateZ(${POSTER.rotateZ}deg)`,
                transformOrigin: "left center",
              }}
            >
              <FakeSite demo={demo} />
              <Image
                src="/billboard/billboard-glass.png"
                alt=""
                aria-hidden
                fill
                sizes="30vw"
                className="pointer-events-none object-fill opacity-60 mix-blend-screen"
              />
            </div>
          </div>
        </motion.div>

        {/* Glassy left/right fade-out */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-[18vw] bg-gradient-to-r from-neutral-950 via-neutral-950/70 to-transparent backdrop-blur-[2px] [mask-image:linear-gradient(to_right,black,transparent)]" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-[18vw] bg-gradient-to-l from-neutral-950 via-neutral-950/70 to-transparent backdrop-blur-[2px] [mask-image:linear-gradient(to_left,black,transparent)]" />

        {/* Section label */}
        <div className="pointer-events-none absolute left-8 top-10 z-20 max-w-xs">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-white/60">One-shots</p>
          <h2 className="mt-2 font-heading text-3xl font-semibold tracking-tight md:text-4xl">
            Sites built in a single shot
          </h2>
        </div>

        {/* Left controls — cut out from a glass panel */}
        <div className="absolute left-8 top-1/2 z-20 -translate-y-1/2">
          <div className="flex flex-col items-center gap-3 rounded-full border border-white/15 bg-white/10 p-3 backdrop-blur-md">
            <button
              type="button"
              onClick={() => cycle(-1)}
              aria-label="Previous site"
              className="grid size-11 place-items-center rounded-full text-white/80 transition hover:bg-white/10 hover:text-white"
            >
              <ChevronUp className="size-5" />
            </button>

            <a
              href={demo.url}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`Take a geez at ${demo.name}`}
              className="grid size-16 place-items-center rounded-full bg-brand text-brand-foreground shadow-lg shadow-black/40 ring-1 ring-white/20 transition hover:brightness-110"
            >
              <span className="flex flex-col items-center leading-none">
                <Eye className="size-5" />
                <span className="mt-1 text-[10px] font-semibold uppercase tracking-wide">geez</span>
              </span>
            </a>

            <button
              type="button"
              onClick={() => cycle(1)}
              aria-label="Next site"
              className="grid size-11 place-items-center rounded-full text-white/80 transition hover:bg-white/10 hover:text-white"
            >
              <ChevronDown className="size-5" />
            </button>
          </div>
          <p className="mt-3 text-center text-xs text-white/50">{demo.name}</p>
        </div>
      </div>
    </section>
  );
}

function FakeSite({ demo }: { demo: Demo }) {
  return (
    <div className="absolute inset-0 bg-white">
      <div className="flex h-[7%] items-center gap-1.5 bg-neutral-100 px-2">
        <span className="size-1.5 rounded-full bg-red-400" />
        <span className="size-1.5 rounded-full bg-amber-400" />
        <span className="size-1.5 rounded-full bg-emerald-400" />
      </div>
      <div className={`flex h-[93%] flex-col items-center justify-center bg-gradient-to-br ${demo.className}`}>
        <span className="text-lg font-bold text-white drop-shadow">{demo.name}</span>
        <span className="mt-1 text-[10px] uppercase tracking-widest text-white/80">placeholder demo</span>
      </div>
    </div>
  );
}
