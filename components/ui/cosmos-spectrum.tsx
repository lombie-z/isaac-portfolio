"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { type RefObject, useSyncExternalStore } from "react";

const DESKTOP_QUERY = "(min-width: 768px)";

function subscribeToDesktop(onChange: () => void) {
  const query = window.matchMedia(DESKTOP_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

/**
 * The cosmos-spectrum's blurred gradient bars, BAKED to a static image
 * (public/finale/spectrum-blue.png — the exact bars + 16px blur, rendered once).
 *
 * Why baked and not a live filter: a live `filter: blur()` behind the finale
 * re-rasterises in tiles, and any repaint over it (icon hover, selecting the
 * heading text, the caret) exposes a tile seam as a thin white line. A plain
 * image is just a texture — repaints over it recomposite it, so it can never
 * seam.
 *
 * Desktop rises with scroll through `target`, the pinned parent. Mobile (and the
 * server render) shows it fully risen with no scroll listener: scaling this image
 * on every scroll frame lagged on iPhone.
 */
export function CosmicSpectrum({ target }: { target: RefObject<HTMLElement | null> }) {
  const isDesktop = useSyncExternalStore(
    subscribeToDesktop,
    () => window.matchMedia(DESKTOP_QUERY).matches,
    () => false,
  );

  return (
    <div className="pointer-events-none absolute -inset-x-[6%] -bottom-[4%] h-[94%]">
      {isDesktop ? (
        <RisingSpectrum target={target} />
      ) : (
        // biome-ignore lint/performance/noImgElement: baked decorative backdrop, stretched to fill
        <img src="/finale/spectrum-blue.png" alt="" aria-hidden className="h-full w-full object-fill" />
      )}
    </div>
  );
}

function RisingSpectrum({ target }: { target: RefObject<HTMLElement | null> }) {
  const { scrollYProgress } = useScroll({ target, offset: ["start start", "end end"] });

  // Sit as a sliver with resistance, then shoot up with momentum near the end —
  // landing late so it resolves as you actually reach the section.
  const scaleY = useTransform(scrollYProgress, [0, 0.62, 0.95, 1], [0.15, 0.22, 0.95, 1]);

  return (
    // biome-ignore lint/performance/noImgElement: baked decorative backdrop, stretched to fill
    <motion.img
      src="/finale/spectrum-blue.png"
      alt=""
      aria-hidden
      style={{ scaleY, transformOrigin: "bottom" }}
      className="h-full w-full object-fill"
    />
  );
}
