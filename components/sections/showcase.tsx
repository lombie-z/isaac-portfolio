"use client";

/**
 * SECTION 3 — DEV SHOWCASE
 * Component: https://21st.dev/@prebuiltui/components/cards/marquee-cards-with-hover-effect
 *
 * The real PrebuiltUI marquee-cards-with-hover-effect (see components/ui/
 * marquee-cards.tsx), fed Isaac's services + placeholder projects.
 */
import { PenTool, Users } from "lucide-react";
import { type MarqueeCard, MarqueeCards } from "@/components/ui/marquee-cards";

const CARDS: MarqueeCard[] = [
  { kind: "Worked on", title: "TinaCMS — UI, UX & development", image: "/work/tinacms.jpg" },
  { kind: "Project", title: "Project Alpha", placeholder: true, gradient: "from-fuchsia-500 via-brand to-indigo-700" },
  { kind: "Worked on", title: "Enterprise software solutions — SSW", image: "/work/ssw.jpg" },
  { kind: "Project", title: "Project Beta", placeholder: true, gradient: "from-indigo-500 via-brand-deep to-fuchsia-600" },
  { kind: "Service", title: "Graphic design", icon: PenTool, gradient: "from-brand-deep via-brand to-brand-muted" },
  { kind: "Project", title: "Project Gamma", placeholder: true, gradient: "from-violet-500 via-brand to-brand-deep" },
  { kind: "Service", title: "Scrum Master / Product Owner", icon: Users, gradient: "from-brand-muted via-brand-deep to-brand" },
  { kind: "Project", title: "Project Delta", placeholder: true, gradient: "from-purple-500 via-brand to-indigo-700" },
];

export function ShowcaseSection() {
  return (
    <section
      id="work"
      className="flex min-h-screen flex-col items-center justify-center gap-12 overflow-hidden bg-background py-24 text-foreground"
    >
      <h2 className="font-heading text-4xl font-semibold tracking-tight md:text-6xl">
        Development, UX and MGMT
      </h2>

      <MarqueeCards cards={CARDS} />
    </section>
  );
}
