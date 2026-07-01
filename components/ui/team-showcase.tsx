'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Disc3 } from 'lucide-react';
import { SiSpotify, SiTidal } from 'react-icons/si';
import { cn } from '../../lib/utils';

/**
 * MUSIC SHOWCASE — reworked from the 21st.dev team-showcase into a grid of
 * cards for Isaac Rozsa's music (isaacrozsa.com). Each card is tinted with its
 * route's accent colour, sourced from the rozsa project's favicons / album art.
 */

export type MusicKind = 'home' | 'album' | 'single' | 'listen' | 'soon';

export interface MusicCard {
  id: string;
  /** Big title on the card. */
  title: string;
  /** Small kicker above the title (e.g. "Album", "Single"). */
  kind: string;
  /** One-line description. */
  blurb?: string;
  /** Destination. '#' renders as a non-navigating placeholder. */
  href: string;
  /** Accent colour (hex) — tints the whole card. */
  accent: string;
  /** Favicon path under /public, if the card has one. */
  icon?: string;
  /** Built-in glyph for streaming/placeholder cards. */
  glyph?: 'spotify' | 'tidal' | 'disc';
  /** Marks unfinished cards (dimmed, no navigation). */
  placeholder?: boolean;
}

interface MusicShowcaseProps {
  cards: MusicCard[];
}

export default function MusicShowcase({ cards }: MusicShowcaseProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="mx-auto grid w-full max-w-5xl grid-cols-2 gap-3 select-none sm:gap-4 md:grid-cols-4">
      {cards.map((card) => (
        <MusicCardTile
          key={card.id}
          card={card}
          dimmed={hoveredId !== null && hoveredId !== card.id}
          onHover={setHoveredId}
        />
      ))}
    </div>
  );
}

function Glyph({ glyph, className }: { glyph?: MusicCard['glyph']; className?: string }) {
  if (glyph === 'spotify') return <SiSpotify className={className} />;
  if (glyph === 'tidal') return <SiTidal className={className} />;
  return <Disc3 className={className} />;
}

function MusicCardTile({
  card,
  dimmed,
  onHover,
}: {
  card: MusicCard;
  dimmed: boolean;
  onHover: (id: string | null) => void;
}) {
  const isPlaceholder = card.placeholder ?? card.href === '#';
  const accent = card.accent;

  const content = (
    <motion.div
      onMouseEnter={() => onHover(card.id)}
      onMouseLeave={() => onHover(null)}
      whileHover={isPlaceholder ? undefined : { y: -6 }}
      transition={{ type: 'spring', stiffness: 320, damping: 24 }}
      className={cn(
        'group relative flex h-full min-h-[190px] flex-col justify-between overflow-hidden rounded-2xl border p-5 transition-opacity duration-300',
        dimmed ? 'opacity-55' : 'opacity-100',
        isPlaceholder ? 'cursor-default' : 'cursor-pointer',
      )}
      style={{
        borderColor: `color-mix(in oklab, ${accent} 32%, transparent)`,
        background: `linear-gradient(160deg, color-mix(in oklab, ${accent} 12%, white) 0%, color-mix(in oklab, ${accent} 4%, white) 100%)`,
      }}
    >
      {/* accent glow that blooms on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-40 blur-2xl transition-opacity duration-500 group-hover:opacity-80"
        style={{ background: accent }}
      />

      <div className="relative flex items-start justify-between">
        <span
          className="flex h-11 w-11 items-center justify-center rounded-xl ring-1"
          style={{
            background: `color-mix(in oklab, ${accent} 16%, white)`,
            color: accent,
            boxShadow: `0 0 0 1px color-mix(in oklab, ${accent} 20%, transparent)`,
          }}
        >
          {card.icon ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={card.icon} alt="" className="h-6 w-6" />
          ) : (
            <Glyph glyph={card.glyph} className="h-5 w-5" />
          )}
        </span>

        {!isPlaceholder && (
          <ArrowUpRight
            className="h-5 w-5 -translate-y-0.5 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
            style={{ color: accent }}
          />
        )}
      </div>

      <div className="relative">
        <p
          className="text-[10px] font-semibold uppercase tracking-[0.2em]"
          style={{ color: `color-mix(in oklab, ${accent} 78%, black)` }}
        >
          {card.kind}
        </p>
        <h3 className="mt-1 text-lg font-semibold leading-tight tracking-tight text-foreground">
          {card.title}
        </h3>
        {card.blurb && (
          <p className="mt-1 text-xs leading-snug text-foreground/55">{card.blurb}</p>
        )}
      </div>
    </motion.div>
  );

  if (isPlaceholder) return content;

  return (
    <a href={card.href} target="_blank" rel="noopener noreferrer" className="block h-full">
      {content}
    </a>
  );
}
