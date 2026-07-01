"use client";

/**
 * SECTION 3 — DEV SHOWCASE
 * Reference: https://21st.dev/@prebuiltui/components/cards/marquee-cards-with-hover-effect
 * (source component returns HTTP 500 and can't be pulled — built from scratch).
 *
 * Two hero-styled marquee rows scrolling in opposite directions. Hovering a row
 * pauses it and lifts the hovered card. Mix of real services + placeholder
 * projects, mix of info and image cards.
 */
import { Boxes, Layers, PenTool, Users } from "lucide-react";
import { MarqueeRow, type ShowcaseCard } from "@/components/ui/marquee-cards";

// Real services offered.
const SERVICES: ShowcaseCard[] = [
  {
    id: "svc-tinacms",
    kind: "info",
    eyebrow: "Service",
    icon: Layers,
    title: "TinaCMS — UI, UX & development",
    description: "Visual editing, schema design and front-end build on TinaCMS + Next.js.",
  },
  {
    id: "svc-business",
    kind: "info",
    eyebrow: "Service",
    icon: Boxes,
    title: "Custom business solutions",
    description: "Bespoke tooling and web apps that fit how your team actually works.",
  },
  {
    id: "svc-design",
    kind: "info",
    eyebrow: "Service",
    icon: PenTool,
    title: "Graphic design",
    description: "Brand-consistent visual design, from identity to marketing collateral.",
  },
  {
    id: "svc-scrum",
    kind: "info",
    eyebrow: "Service",
    icon: Users,
    title: "Scrum Master / Product Owner",
    description: "Agile facilitation and product ownership for creative teams.",
  },
];

// PLACEHOLDER projects — Isaac to replace name / copy / real screenshot.
const PROJECTS: ShowcaseCard[] = [
  {
    id: "proj-1",
    kind: "image",
    eyebrow: "Project · placeholder",
    title: "Project Alpha",
    description: "One-line summary of a shipped client project.",
    imageClassName: "from-brand-muted via-brand to-brand-deep",
    isPlaceholder: true,
  },
  {
    id: "proj-2",
    kind: "image",
    eyebrow: "Project · placeholder",
    title: "Project Beta",
    description: "One-line summary of a shipped client project.",
    imageClassName: "from-brand via-brand-deep to-brand-muted",
    isPlaceholder: true,
  },
  {
    id: "proj-3",
    kind: "image",
    eyebrow: "Project · placeholder",
    title: "Project Gamma",
    description: "One-line summary of a shipped client project.",
    imageClassName: "from-brand-deep via-brand to-brand-muted",
    isPlaceholder: true,
  },
  {
    id: "proj-4",
    kind: "image",
    eyebrow: "Project · placeholder",
    title: "Project Delta",
    description: "One-line summary of a shipped client project.",
    imageClassName: "from-brand-muted via-brand-deep to-brand",
    isPlaceholder: true,
  },
];

// Interleave so each row carries a mix of service (info) and project (image) cards.
const ROW_ONE: ShowcaseCard[] = [SERVICES[0], PROJECTS[0], SERVICES[1], PROJECTS[1]];
const ROW_TWO: ShowcaseCard[] = [SERVICES[2], PROJECTS[2], SERVICES[3], PROJECTS[3]];

export function ShowcaseSection() {
  return (
    <section
      id="work"
      className="flex min-h-screen flex-col items-center justify-center gap-10 overflow-hidden bg-background py-24 text-foreground"
    >
      <header className="flex flex-col items-center gap-3 px-8 text-center">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-brand">Work</p>
        <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">What I build</h2>
        <p className="max-w-xl text-balance text-muted-foreground">
          Services I offer and a selection of projects. Hover a card to take a closer look.
        </p>
      </header>

      <div className="flex w-full flex-col gap-6">
        <MarqueeRow cards={ROW_ONE} direction="left" durationSeconds={44} />
        <MarqueeRow cards={ROW_TWO} direction="right" durationSeconds={52} />
      </div>
    </section>
  );
}
