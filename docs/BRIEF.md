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
   - Generous white padding framing a brand-violet panel. Its display font becomes the site display font.
   - Bottom nav icons (one per `NAV_SECTIONS`); on hover a white pill slides up from the padding, label in brand violet (text === background colour).

2. **Contact / lead capture** — `components/sections/contact.tsx`
   - Component: https://21st.dev/@kokonutd/components/animated-ai-input
   - Riff on an AI chat input. Placeholder: "What can I build for you?". Centred in viewport.
   - Model selector with persona options ("marketing-isaac-mini", "design-consultant-4-pro", …), people icons instead of provider logos.
   - Submit → `POST /api/contact { message }`. If the message has no email (`lib/email.ts` `containsEmail`), reveal an optional "add an email?" field that POSTs `{ message, replyEmail }`. No upfront contact fields.

3. **Dev showcase** — `components/sections/showcase.tsx`
   - Component: https://21st.dev/@prebuiltui/components/cards/marquee-cards-with-hover-effect
   - Hero-styled cards, mix of services + projects, mix of image and info cards. Content from round-2 grilling.

4. **One-shots (custom, the doozy)** — `components/sections/one-shots.tsx`
   - Assets: `/public/billboard/billboard-base.png` (billboard photo), `/public/billboard/billboard-glass.png` (reflection cutout to blend on top).
   - Subtle parallax "rolling window": scene mostly fixed, drifts slowly on scroll.
   - Demo-site screenshots inside the billboard poster area; glass reflection blended over (screen/overlay).
   - Left controls: up/down arrows to cycle sites + a centred "take a geez" button (opens live site).
   - Glassy overlay fades the image out to left/right edges; button background "cut out" from that glass (fully saturated, clear sections).
   - Placeholder demo sites for now; Isaac replaces later.

5. **Music** — `components/sections/music.tsx`
   - Component: https://21st.dev/community/components/makviesainte/team-showcase/default
   - Cards for isaacrozsa.com + `/good-talk` + `/arrhythmia` (each with its own favicon colour from the rozsa project), the two singles, one Spotify card, one Tidal card, rest "coming soon".
   - Footer line: "I love AI but don't feel the need to use it for my music — this is all me and a few synths."

6. **Socials / end** — `components/sections/connect.tsx`
   - Component: https://21st.dev/@aliimam/components/cosmos-spectrum
   - Social icons white against the brand colour, glowing on hover. Links from round-2 grilling.

## Pulling 21st.dev components

Isaac has a 21st.dev subscription. Add components via the shadcn registry, e.g.
`pnpm dlx shadcn@latest add "https://21st.dev/r/<author>/<component>"` (grab the exact "npx shadcn add" URL from each component's 21st.dev page).
