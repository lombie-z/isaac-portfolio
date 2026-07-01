# isaac-portfolio — build brief

Single-page scroll portfolio for Isaac W. R. Lombard (technical & creative consultant).

## Foundations

- Next.js 16 (App Router) · React 19 · TypeScript · Tailwind 4 · shadcn/ui · motion (Framer Motion) · pnpm.
- Brand colour: **deep violet #6D28D9** — tokens `--brand`, `--brand-foreground`, `--brand-muted`, `--brand-deep` (see `app/globals.css`), exposed as Tailwind `bg-brand`, `text-brand-foreground`, etc.
- One fixed theme (white + violet), no dark-mode toggle.
- Smooth anchor-scroll between full-height sections; **no scroll-snap** (Section 4 is a taller parallax region).
- Responsiveness is a later pass — build desktop-first for now.
- Each section is `components/sections/*.tsx`, composed in `app/page.tsx`. Hero nav config in `lib/sections.ts`.

## Sections

1. **Hero** — `components/sections/hero.tsx`
   - Component: https://21st.dev/@danielpetho/components/text-cursor-proximity
   - "Isaac W. R. Lombard" as the cursor-proximity headline. Top-right: "Technical and creative consultant".
   - White site background; a brand-violet hero **card centred on screen** (the white margin around it is the "generous white padding"). The component's display font becomes the site display font.
   - Nav icons row at the bottom of the card (one per `NAV_SECTIONS`). On hover, a single **white pill slides in from OUTSIDE the card** and settles just above the hovered icon; the label fades in **only once settled**, coloured the same as the card background (brand violet). White pill === site background.

2. **Contact / lead capture** — `components/sections/contact.tsx`
   - Component: https://21st.dev/@kokonutd/components/animated-ai-input
   - Riff on an AI chat input. Placeholder: "What can I build for you?". Centred in viewport.
   - Model selector with persona "models", each a person icon doing a **fun action** (playful lucide icons, not provider logos). Final set (each roughly maps to a service): `marketing-isaac-mini` · `design-consultant-4-pro` · `full-stack-isaac-o` · `brand-strategy-3.5` · `scrum-master-turbo`.
   - Submit → `POST /api/contact { message }`. If the message has no email (`lib/email.ts` `containsEmail`), reveal an optional "add an email?" field that POSTs `{ message, replyEmail }`. No upfront contact fields.

3. **Dev showcase** — `components/sections/showcase.tsx`
   - Component: https://21st.dev/@prebuiltui/components/cards/marquee-cards-with-hover-effect
   - Hero-styled cards, mix of services + projects, mix of image and info cards.
   - Services (refine later): TinaCMS (UI, UX & development) · custom business solutions · graphic design · Scrum Master / Product Owner for creative teams. Projects TBD.

4. **One-shots (custom, the doozy)** — `components/sections/one-shots.tsx`
   - Assets: `/public/billboard/billboard-base.png` (billboard photo), `/public/billboard/billboard-glass.png` (reflection cutout to blend on top).
   - Subtle parallax "rolling window": scene mostly fixed, drifts slowly on scroll.
   - Demo-site screenshots inside the billboard poster area; glass reflection blended over (screen/overlay).
   - Left controls: up/down arrows to cycle sites + a centred "take a geez" button (opens live site).
   - Glassy overlay fades the image out to left/right edges; button background "cut out" from that glass (fully saturated, clear sections).
   - Placeholder demo sites for now; Isaac replaces later.

5. **Music** — `components/sections/music.tsx`
   - Component: https://21st.dev/community/components/makviesainte/team-showcase/default
   - Everything is folded into the **`ROZSA/rozsa`** app (isaacrozsa.com). Routes: `/` (home), `/good-talk` (formerly the `flowers` project), `/arrhythmia` (corrected spelling). The two singles also live on isaacrozsa.com.
   - Each route has its own accent colour/favicon — source from `ROZSA/rozsa` (fall back to `ROZSA/flowers` and `ROZSA/arrythmia` for colours/favicons). Copy favicons into `public/music/` and tint each card to match.
   - Cards: home, good-talk, arrhythmia, the two singles, a Spotify card, a Tidal card, rest "coming soon". Spotify/Tidal URLs + single names: mine from the rozsa repo if present, else placeholder for Isaac to fill.
   - Footer line: "I love AI but don't feel the need to use it for my music — this is all me and a few synths."

6. **Socials / end** — `components/sections/connect.tsx`
   - Component: https://21st.dev/@aliimam/components/cosmos-spectrum
   - Social icons white against the brand colour, glowing on hover. Links: GitHub (github.com/isaaclombardssw) + LinkedIn (URL TBD — placeholder). Just these two.

## Pulling 21st.dev components

Isaac has a 21st.dev subscription. Add components via the shadcn registry, e.g.
`pnpm dlx shadcn@latest add "https://21st.dev/r/<author>/<component>"` (grab the exact "npx shadcn add" URL from each component's 21st.dev page).
