/**
 * SECTION 4 — ONE-SHOTS (the doozy)
 * No off-the-shelf component. Custom build.
 *
 * Assets:
 * - /billboard/billboard-base.png  — bus-stop billboard photo ("ONE-SHOT WEBSITES").
 * - /billboard/billboard-glass.png — extracted glass/reflection cutout to blend
 *   on top of the swapped-in screenshot (screen/overlay blend).
 *
 * Spec:
 * - Subtle parallax: the billboard scene stays mostly fixed and drifts slowly
 *   as you scroll ("rolling window" effect).
 * - Inside the billboard poster area, show screenshots of example demo sites.
 * - Overlay billboard-glass.png on top of the screenshot for the reflection.
 * - Left-hand controls: up/down arrows to cycle sites + a "take a geez" button
 *   in the middle (opens the live site).
 * - Glassy overlay fading the image out to the left/right edges; the button
 *   background feels "cut out" from that glass (fully saturated, clear sections).
 * - Placeholder demo sites for now; Isaac will replace.
 *
 * TODO(one-shots-agent / Isaac): build the parallax billboard. This one gets
 * prototyped by hand rather than blind-delegated.
 */
export function OneShotsSection() {
  return (
    <section
      id="one-shots"
      className="flex min-h-screen flex-col items-center justify-center gap-8 bg-neutral-950 p-8 text-neutral-50"
    >
      <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">
        One-shots
      </h2>
    </section>
  );
}
