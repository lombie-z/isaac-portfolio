"use client";

/**
 * CosmicSpectrum — self-contained cosmic backdrop for the CONNECT finale.
 *
 * Reimplemented from the 21st.dev @aliimam/cosmos-spectrum component.
 * The original loaded GSAP + ScrollTrigger + TextPlugin from a CDN via
 * injected <script> tags and poked window.gsap — fragile under Next's
 * hydration / script ordering. This version has NO external scripts:
 *   - a <canvas> starfield (drifting, twinkling points), and
 *   - a "spectrum" equalizer of violet→light bars driven by `motion`.
 *
 * Purely decorative, so it is aria-hidden and pointer-events-none. It fills
 * its positioned parent (absolute inset-0); the section supplies the brand
 * background behind it.
 */

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface CosmicSpectrumProps {
  className?: string;
  /** Number of equalizer bars in the spectrum. */
  barCount?: number;
}

export function CosmicSpectrum({ className, barCount = 40 }: CosmicSpectrumProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Starfield on a canvas — cheap, and independent of React re-renders.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;

    type Star = {
      x: number;
      y: number;
      z: number; // depth 0..1 → size + drift speed
      phase: number; // twinkle offset
      tint: number; // 0 = white, 1 = violet
    };
    let stars: Star[] = [];

    const seed = () => {
      const count = Math.min(220, Math.round((width * height) / 9000));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random(),
        phase: Math.random() * Math.PI * 2,
        tint: Math.random(),
      }));
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    resize();

    let raf = 0;
    let last = performance.now();

    const draw = (now: number) => {
      const dt = Math.min(64, now - last) / 1000;
      last = now;
      ctx.clearRect(0, 0, width, height);

      for (const s of stars) {
        // Gentle upward drift; deeper stars move slower. Wrap around.
        if (!prefersReducedMotion) {
          s.y -= (0.6 + s.z * 2.4) * dt * 12;
          if (s.y < -2) {
            s.y = height + 2;
            s.x = Math.random() * width;
          }
        }

        const twinkle = prefersReducedMotion
          ? 0.7
          : 0.45 + 0.55 * (0.5 + 0.5 * Math.sin(now / 900 + s.phase));
        const size = 0.4 + s.z * 1.7;
        const alpha = (0.25 + s.z * 0.6) * twinkle;

        // Blend white → soft violet for a cosmic, on-brand feel.
        const r = Math.round(255 - s.tint * 55);
        const g = Math.round(255 - s.tint * 120);
        const b = 255;
        ctx.beginPath();
        ctx.arc(s.x, s.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [prefersReducedMotion]);

  // Spectrum bars — a smooth arch of heights with a per-bar breathing loop.
  const bars = Array.from({ length: barCount }, (_, i) => {
    const t = i / (barCount - 1); // 0..1
    // Arch: tall in the middle, short at the edges.
    const arch = Math.sin(t * Math.PI);
    const jitter = 0.75 + 0.25 * Math.sin(i * 12.9898);
    const base = 14 + arch * 62 * jitter; // % of container height
    return {
      id: `spectrum-bar-${i}`,
      base,
      delay: t * 0.9 + (i % 3) * 0.12,
      duration: 3.4 + (i % 5) * 0.35,
    };
  });

  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      {/* Depth: darker toward the edges, glow toward the horizon. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 12%, color-mix(in oklab, var(--brand-muted) 55%, transparent) 0%, transparent 55%)",
        }}
      />

      {/* Starfield */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* Spectrum equalizer along the bottom */}
      <div className="absolute inset-x-0 bottom-0 flex h-[46%] items-end justify-center gap-[0.4%] px-[4%]">
        {bars.map((bar) => (
          <motion.div
            key={bar.id}
            className="flex-1 rounded-t-full"
            style={{
              background:
                "linear-gradient(to top, var(--brand-deep) 0%, var(--brand-muted) 45%, color-mix(in oklab, var(--brand-foreground) 90%, var(--brand-muted)) 100%)",
              filter: "drop-shadow(0 0 6px color-mix(in oklab, var(--brand-muted) 70%, transparent))",
            }}
            initial={{ height: `${bar.base}%`, opacity: 0.55 }}
            animate={
              prefersReducedMotion
                ? { height: `${bar.base}%`, opacity: 0.6 }
                : {
                    height: [`${bar.base}%`, `${bar.base * 1.32}%`, `${bar.base * 0.82}%`, `${bar.base}%`],
                    opacity: [0.5, 0.9, 0.6, 0.5],
                  }
            }
            transition={
              prefersReducedMotion
                ? undefined
                : {
                    duration: bar.duration,
                    delay: bar.delay,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }
            }
          />
        ))}
      </div>

      {/* Soft fade at the very bottom so bars melt into the section. */}
      <div
        className="absolute inset-x-0 bottom-0 h-24"
        style={{
          background: "linear-gradient(to top, var(--brand-deep), transparent)",
        }}
      />
    </div>
  );
}
