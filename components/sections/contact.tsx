/**
 * SECTION 2 — CTA / LEAD CAPTURE
 * Component: https://21st.dev/@kokonutd/components/animated-ai-input
 *
 * Spec:
 * - Riff on an AI chat input. Placeholder: "What can I build for you?".
 * - Model selector with persona options ("marketing-isaac-mini",
 *   "design-consultant-4-pro", …) using people icons instead of provider logos.
 * - Sits cleanly centred in the viewport.
 * - Submit -> POST /api/contact { message }. If the message contains no email,
 *   reveal an optional "add an email?" field that POSTs { replyEmail } too.
 *   (No upfront contact fields.)
 *
 * TODO(contact-agent): replace this stub with the animated-ai-input form wired
 * to /api/contact.
 */
export function ContactSection() {
  return (
    <section
      id="contact"
      className="flex min-h-screen flex-col items-center justify-center gap-8 bg-background p-8 text-foreground"
    >
      <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">
        What can I build for you?
      </h2>
    </section>
  );
}
