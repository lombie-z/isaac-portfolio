/**
 * SECTION 5 — MUSIC
 * Component: https://21st.dev/community/components/makviesainte/team-showcase/default
 *
 * A grid of music cards for Isaac Rozsa's project (isaacrozsa.com), reworked
 * from the pulled team-showcase into `components/ui/team-showcase.tsx`
 * (exported as MusicShowcase).
 *
 * Data sourced from ROZSA/rozsa (the live isaacrozsa.com app):
 * - Favicons copied to /public/music/ from the rozsa repo (root, /good-talk, /arrhythmia).
 * - Accent colours pulled from those favicons; single accents sampled from album art.
 * - Singles "Prologue" and "Dude Like Dust", and albums "Good Talk" / "Arrhythmia",
 *   confirmed in the rozsa home-page records + root metadata.
 * - Spotify has no real URL in the repo (disabled placeholder); Tidal isn't linked
 *   at all — both left as href "#" for Isaac to fill.
 */
import MusicShowcase, { type MusicCard } from '@/components/ui/team-showcase';

const CARDS: MusicCard[] = [
  {
    id: 'home',
    kind: 'isaacrozsa.com',
    title: 'I. Rozsa',
    blurb: 'Sydney bedroom producer & composer.',
    href: 'https://isaacrozsa.com',
    accent: '#7f1d1d', // root favicon.svg
    icon: '/music/rozsa.svg',
  },
  {
    id: 'good-talk',
    kind: 'Album',
    title: 'Good Talk',
    blurb: 'Tune out everything and shut your eyes.',
    href: 'https://isaacrozsa.com/good-talk',
    accent: '#8a8d93', // good-talk icon.svg (silver)
    icon: '/music/good-talk.svg',
  },
  {
    id: 'arrhythmia',
    kind: 'Album',
    title: 'Arrhythmia',
    blurb: 'An indie, neo-classical sulk.',
    href: 'https://isaacrozsa.com/arrhythmia',
    accent: '#2563eb', // arrhythmia favicon.svg (blue)
    icon: '/music/arrhythmia.svg',
  },
  {
    id: 'prologue',
    kind: 'Single',
    title: 'Prologue',
    blurb: 'Listen on isaacrozsa.com.',
    href: 'https://isaacrozsa.com',
    accent: '#15a29d', // sampled from prologue.png
    glyph: 'disc',
  },
  {
    id: 'dude-like-dust',
    kind: 'Single',
    title: 'Dude Like Dust',
    blurb: 'Listen on isaacrozsa.com.',
    href: 'https://isaacrozsa.com',
    accent: '#5c654c', // sampled from dude-like-dust.png
    glyph: 'disc',
  },
  {
    id: 'spotify',
    kind: 'Listen',
    title: 'Spotify',
    blurb: 'Link coming soon.',
    href: '#', // no URL in the rozsa repo yet
    accent: '#1db954',
    glyph: 'spotify',
    placeholder: true,
  },
  {
    id: 'tidal',
    kind: 'Listen',
    title: 'Tidal',
    blurb: 'Link coming soon.',
    href: '#', // not linked in the rozsa repo yet
    accent: '#000000',
    glyph: 'tidal',
    placeholder: true,
  },
  {
    id: 'coming-soon',
    kind: 'More',
    title: 'Coming soon',
    blurb: 'New sounds in the works.',
    href: '#',
    accent: '#6d28d9', // brand violet
    glyph: 'disc',
    placeholder: true,
  },
];

export function MusicSection() {
  return (
    <section
      id="music"
      className="flex min-h-screen flex-col items-center justify-center gap-10 bg-background px-6 py-24 text-foreground"
    >
      <div className="flex flex-col items-center gap-3 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand">Music</p>
        <h2 className="text-4xl font-semibold tracking-tight md:text-6xl">Isaac Rozsa</h2>
      </div>

      <MusicShowcase cards={CARDS} />

      <p className="max-w-md text-center text-sm text-foreground/55">
        I love AI but don&apos;t feel the need to use it for my music — this is all me and a few
        synths.
      </p>
    </section>
  );
}
