"use client";

import { useState } from "react";
import { Check, Copy, Mail } from "lucide-react";
import { site } from "@/data/site";

/**
 * No backend is configured, so nothing here pretends to send a message.
 * The composer opens a pre-filled Gmail compose window in a new tab.
 */
export default function ContactPanel() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const s = encodeURIComponent(subject || "Hello");
  const b = encodeURIComponent(message);
  const gmail = `https://mail.google.com/mail/?view=cm&fs=1&to=${site.email}&su=${s}&body=${b}`;
  const mailto = `mailto:${site.email}?subject=${s}&body=${b}`;

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="border border-rule bg-panel">
      <div className="flex flex-col gap-4 border-b border-rule p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <p className="font-mono text-lg text-ink sm:text-xl">{site.email}</p>
        <button
          type="button"
          onClick={copyEmail}
          className="inline-flex items-center gap-2 self-start border border-rule-strong px-4 py-2.5 text-sm text-dim transition-colors hover:border-accent hover:text-accent"
        >
          {copied ? <Check size={15} aria-hidden /> : <Copy size={15} aria-hidden />}
          {copied ? "Copied" : "Copy address"}
        </button>
      </div>

      <div className="p-6 sm:p-8">
        <p className="text-sm leading-relaxed text-muted">
          Write your message here, then send it from Gmail in a new tab.
        </p>

        <div className="mt-7 space-y-5">
          <div>
            <label htmlFor="subject" className="meta block">
              subject
            </label>
            <input
              id="subject"
              name="subject"
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
              className="mt-2 w-full border border-rule bg-void px-4 py-3 text-base text-ink outline-none transition-colors focus:border-accent"
              placeholder="What this is about"
            />
          </div>

          <div>
            <label htmlFor="message" className="meta block">
              message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              className="mt-2 w-full resize-y border border-rule bg-void px-4 py-3 text-base leading-relaxed text-ink outline-none transition-colors focus:border-accent"
              placeholder="Say as much or as little as you like"
            />
          </div>
        </div>

        <a
          href={gmail}
          target="_blank"
          rel="noreferrer noopener"
          className="mt-7 inline-flex items-center justify-center gap-3 border border-rule-strong px-6 py-4 text-sm text-ink transition-colors hover:border-accent hover:text-accent"
        >
          <Mail size={15} aria-hidden />
          Send with Gmail
        </a>

        <a
          href={mailto}
          className="mt-4 block text-xs text-muted underline underline-offset-4 hover:text-accent"
        >
          or use your default mail app
        </a>
      </div>
    </div>
  );
}
