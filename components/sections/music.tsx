/**
 * SECTION 5 — MUSIC
 * Component: https://21st.dev/community/components/makviesainte/team-showcase/default
 *
 * Spec (rework the team-showcase into music sites/cards):
 * - isaacrozsa.com and its /good-talk and /arrhythmia routes — each has its own
 *   favicon (different colours, pulled from the rozsa project); each card
 *   reflects that colour.
 * - Include the two singles as cards.
 * - One card for Spotify, one for Tidal.
 * - Remaining cards: "coming soon" placeholders (or a retro graphic later).
 * - Footer line: "I love AI but don't feel the need to use it for my music —
 *   this is all me and a few synths."
 *
 * TODO(music-agent): rework the team-showcase grid. Favicons + exact links come
 * from round-2 grilling / the rozsa project.
 */
export function MusicSection() {
  return (
    <section
      id="music"
      className="flex min-h-screen flex-col items-center justify-center gap-8 bg-background p-8 text-foreground"
    >
      <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">
        Music
      </h2>
      <p className="max-w-md text-center text-muted-foreground">
        I love AI but don&apos;t feel the need to use it for my music — this is
        all me and a few synths.
      </p>
    </section>
  );
}
