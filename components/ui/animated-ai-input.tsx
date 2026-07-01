"use client";

import {
    ArrowRight,
    Check,
    ChevronDown,
    ClipboardList,
    Lightbulb,
    Loader2,
    Megaphone,
    Palette,
    Terminal,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { containsEmail } from "@/lib/email";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface UseAutoResizeTextareaProps {
    minHeight: number;
    maxHeight?: number;
}

function useAutoResizeTextarea({
    minHeight,
    maxHeight,
}: UseAutoResizeTextareaProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const adjustHeight = useCallback(
        (reset?: boolean) => {
            const textarea = textareaRef.current;
            if (!textarea) return;

            if (reset) {
                textarea.style.height = `${minHeight}px`;
                return;
            }

            textarea.style.height = `${minHeight}px`;

            const newHeight = Math.max(
                minHeight,
                Math.min(
                    textarea.scrollHeight,
                    maxHeight ?? Number.POSITIVE_INFINITY
                )
            );

            textarea.style.height = `${newHeight}px`;
        },
        [minHeight, maxHeight]
    );

    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = `${minHeight}px`;
        }
    }, [minHeight]);

    useEffect(() => {
        const handleResize = () => adjustHeight();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [adjustHeight]);

    return { textareaRef, adjustHeight };
}

/** Persona "models" — each a person doing a playful action, not a provider logo. */
const PERSONAS = [
    { id: "marketing-isaac-mini", icon: Megaphone },
    { id: "design-consultant-4-pro", icon: Palette },
    { id: "full-stack-isaac-o", icon: Terminal },
    { id: "brand-strategy-3.5", icon: Lightbulb },
    { id: "scrum-master-turbo", icon: ClipboardList },
] as const;

type PersonaId = (typeof PERSONAS)[number]["id"];

const PERSONA_ICON: Record<PersonaId, typeof Megaphone> = Object.fromEntries(
    PERSONAS.map((p) => [p.id, p.icon])
) as Record<PersonaId, typeof Megaphone>;

type SendState = "idle" | "sending" | "sent" | "error";

async function postContact(payload: {
    message: string;
    replyEmail?: string;
}): Promise<boolean> {
    try {
        const res = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });
        return res.ok;
    } catch {
        return false;
    }
}

export function LeadCaptureChat() {
    const [value, setValue] = useState("");
    const [selectedPersona, setSelectedPersona] =
        useState<PersonaId>("full-stack-isaac-o");
    const { textareaRef, adjustHeight } = useAutoResizeTextarea({
        minHeight: 88,
        maxHeight: 300,
    });

    const [status, setStatus] = useState<SendState>("idle");

    // Email follow-up (only when the first message carried no email).
    const [askEmail, setAskEmail] = useState(false);
    const [replyEmail, setReplyEmail] = useState("");
    const [emailStatus, setEmailStatus] = useState<SendState>("idle");

    // The persona-tagged message we sent, reused for the follow-up POST.
    const sentMessageRef = useRef<string>("");

    const SelectedIcon = PERSONA_ICON[selectedPersona];

    const handleSubmit = async () => {
        const message = value.trim();
        if (!message || status === "sending") return;

        const tagged = `[${selectedPersona}] ${message}`;
        sentMessageRef.current = tagged;

        setStatus("sending");
        const ok = await postContact({ message: tagged });

        if (!ok) {
            setStatus("error");
            return;
        }

        setStatus("sent");
        adjustHeight(true);
        // No email in the message → offer to leave one for a reply.
        if (!containsEmail(message)) {
            setAskEmail(true);
        }
    };

    const handleEmailSubmit = async () => {
        const email = replyEmail.trim();
        if (!email || emailStatus === "sending") return;

        setEmailStatus("sending");
        const ok = await postContact({
            message: sentMessageRef.current,
            replyEmail: email,
        });
        setEmailStatus(ok ? "sent" : "error");
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    const sending = status === "sending";

    return (
        <div className="w-full max-w-2xl">
            <AnimatePresence mode="wait">
                {status === "sent" ? (
                    <motion.div
                        key="sent"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.3 }}
                        className="rounded-2xl border border-brand/15 bg-white p-6 shadow-[0_1px_30px_-12px_rgba(109,40,217,0.35)]"
                    >
                        <div className="flex items-center gap-3">
                            <span className="flex size-9 items-center justify-center rounded-full bg-brand text-brand-foreground">
                                <Check className="size-5" />
                            </span>
                            <div>
                                <p className="text-lg font-medium text-foreground">
                                    Sent — I&apos;ll be in touch
                                </p>
                                <p className="text-sm text-brand-muted">
                                    Thanks for reaching out.
                                </p>
                            </div>
                        </div>

                        <AnimatePresence>
                            {askEmail && emailStatus !== "sent" && (
                                <motion.div
                                    key="ask-email"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="overflow-hidden"
                                >
                                    <div className="mt-5 border-t border-brand/10 pt-5">
                                        <label
                                            htmlFor="reply-email"
                                            className="text-sm text-foreground/70"
                                        >
                                            Want a reply? Add an email —
                                            optional.
                                        </label>
                                        <div className="mt-2 flex items-center gap-2">
                                            <input
                                                id="reply-email"
                                                type="email"
                                                inputMode="email"
                                                autoComplete="email"
                                                value={replyEmail}
                                                placeholder="you@example.com"
                                                onChange={(e) =>
                                                    setReplyEmail(e.target.value)
                                                }
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter") {
                                                        e.preventDefault();
                                                        handleEmailSubmit();
                                                    }
                                                }}
                                                className="h-10 flex-1 rounded-xl border border-brand/20 bg-white px-3 text-sm text-foreground outline-none placeholder:text-foreground/30 focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-brand/20"
                                            />
                                            <button
                                                type="button"
                                                onClick={handleEmailSubmit}
                                                disabled={
                                                    !replyEmail.trim() ||
                                                    emailStatus === "sending"
                                                }
                                                className="flex h-10 items-center gap-1.5 rounded-xl bg-brand px-4 text-sm font-medium text-brand-foreground transition-colors hover:bg-brand-deep disabled:opacity-40"
                                            >
                                                {emailStatus === "sending" ? (
                                                    <Loader2 className="size-4 animate-spin" />
                                                ) : (
                                                    <ArrowRight className="size-4" />
                                                )}
                                                Add
                                            </button>
                                        </div>
                                        {emailStatus === "error" && (
                                            <p className="mt-2 text-sm text-destructive">
                                                Couldn&apos;t save that —
                                                try again.
                                            </p>
                                        )}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {emailStatus === "sent" && (
                            <p className="mt-4 border-t border-brand/10 pt-4 text-sm text-brand-muted">
                                Got it — I&apos;ll reply to {replyEmail.trim()}.
                            </p>
                        )}
                    </motion.div>
                ) : (
                    <motion.div
                        key="form"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.3 }}
                        className="rounded-2xl border border-brand/15 bg-white p-1.5 shadow-[0_1px_30px_-12px_rgba(109,40,217,0.35)]"
                    >
                        <div className="relative flex flex-col">
                            <div
                                className="overflow-y-auto"
                                style={{ maxHeight: "300px" }}
                            >
                                <Textarea
                                    id="lead-capture-input"
                                    value={value}
                                    disabled={sending}
                                    placeholder="What can I build for you?"
                                    className={cn(
                                        "w-full resize-none rounded-xl rounded-b-none border-none bg-transparent px-4 py-3 text-foreground placeholder:text-foreground/40 focus-visible:ring-0 focus-visible:ring-offset-0",
                                        "min-h-[88px]"
                                    )}
                                    ref={textareaRef}
                                    onKeyDown={handleKeyDown}
                                    onChange={(e) => {
                                        setValue(e.target.value);
                                        adjustHeight();
                                        if (status === "error")
                                            setStatus("idle");
                                    }}
                                />
                            </div>

                            <div className="flex h-14 items-center rounded-b-xl">
                                <div className="absolute bottom-3 left-3 right-3 flex w-[calc(100%-24px)] items-center justify-between">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <button
                                                type="button"
                                                className="flex h-8 items-center gap-1.5 rounded-lg px-2 text-xs font-medium text-brand transition-colors hover:bg-brand/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30"
                                            >
                                                <AnimatePresence mode="wait">
                                                    <motion.span
                                                        key={selectedPersona}
                                                        initial={{
                                                            opacity: 0,
                                                            y: -5,
                                                        }}
                                                        animate={{
                                                            opacity: 1,
                                                            y: 0,
                                                        }}
                                                        exit={{
                                                            opacity: 0,
                                                            y: 5,
                                                        }}
                                                        transition={{
                                                            duration: 0.15,
                                                        }}
                                                        className="flex items-center gap-1.5"
                                                    >
                                                        <SelectedIcon className="size-4" />
                                                        {selectedPersona}
                                                    </motion.span>
                                                </AnimatePresence>
                                                <ChevronDown className="size-3 opacity-60" />
                                            </button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent
                                            align="start"
                                            className="min-w-[13rem] border-brand/15"
                                        >
                                            {PERSONAS.map((persona) => {
                                                const Icon = persona.icon;
                                                return (
                                                    <DropdownMenuItem
                                                        key={persona.id}
                                                        onSelect={() =>
                                                            setSelectedPersona(
                                                                persona.id
                                                            )
                                                        }
                                                        className="flex items-center justify-between gap-2"
                                                    >
                                                        <span className="flex items-center gap-2">
                                                            <Icon className="size-4 text-brand" />
                                                            <span>
                                                                {persona.id}
                                                            </span>
                                                        </span>
                                                        {selectedPersona ===
                                                            persona.id && (
                                                            <Check className="size-4 text-brand" />
                                                        )}
                                                    </DropdownMenuItem>
                                                );
                                            })}
                                        </DropdownMenuContent>
                                    </DropdownMenu>

                                    <button
                                        type="button"
                                        aria-label="Send message"
                                        disabled={!value.trim() || sending}
                                        onClick={handleSubmit}
                                        className={cn(
                                            "flex size-9 items-center justify-center rounded-lg bg-brand text-brand-foreground transition-all",
                                            "hover:bg-brand-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40",
                                            "disabled:cursor-not-allowed disabled:opacity-30"
                                        )}
                                    >
                                        {sending ? (
                                            <Loader2 className="size-4 animate-spin" />
                                        ) : (
                                            <ArrowRight className="size-4" />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {status === "error" && (
                <p className="mt-3 text-center text-sm text-destructive">
                    Something went wrong sending that. Please try again.
                </p>
            )}
        </div>
    );
}
