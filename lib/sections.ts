import {
  AudioLines,
  LayoutGrid,
  type LucideIcon,
  Megaphone,
  MessageSquareText,
  Radio,
} from "lucide-react";

export type NavSection = {
  /** Anchor id on the target <section>. */
  id: string;
  /** Label shown in the hero hover-pill. */
  label: string;
  icon: LucideIcon;
};

/**
 * The sections the hero nav links to — everything after the hero itself.
 * Order matches the page scroll order.
 */
export const NAV_SECTIONS: NavSection[] = [
  { id: "contact", label: "Let's talk", icon: MessageSquareText },
  { id: "work", label: "Work", icon: LayoutGrid },
  { id: "one-shots", label: "One-shots", icon: Megaphone },
  { id: "music", label: "Music", icon: AudioLines },
  { id: "connect", label: "Connect", icon: Radio },
];
