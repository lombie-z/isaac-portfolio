/**
 * SECTION 2 — CTA / LEAD CAPTURE
 * Component: https://21st.dev/@kokonutd/components/animated-ai-input
 *
 * Riff on an AI chat input, centred in the viewport. Persona "models" stand in
 * for services; submitting POSTs to /api/contact, with an optional email
 * follow-up when the first message carried no address (see LeadCaptureChat).
 */
"use client";

import { LeadCaptureChat } from "@/components/ui/animated-ai-input";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="flex min-h-screen flex-col items-center justify-center gap-10 bg-background p-8 text-foreground"
    >
      <div className="flex flex-col items-center gap-3 text-center">
        <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">
          What can I build for you?
        </h2>
        <p className="max-w-md text-brand-muted md:text-lg">
          Pick a persona, tell me the idea, and I&apos;ll take it from there.
        </p>
      </div>
      <LeadCaptureChat />
    </section>
  );
}
