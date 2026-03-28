"use client"

import { FormEvent, useState } from "react";
import SoundHover from "../PlaySound/HoverSound";

type Status = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, message }),
      });

      if (!res.ok) {
        throw new Error("Failed to send message");
      }

      setStatus("success");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-500 dark:text-cyan-100">
          Get in touch
        </h2>
        <p className="text-sm sm:text-base mt-1 opacity-70">
          Send me a message and i&apos;ll get back to you!
        </p>
      </div>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {/* Email field */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium opacity-80">Your email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status !== "idle") {
                setStatus("idle");
              }
            }}
            placeholder="you@example.com"
            className="w-full rounded-lg border border-window-border bg-amber-50/30 dark:bg-wave-from/20 px-3 py-2 text-sm outline-none focus:border-amber-500 dark:focus:border-cyan-200 transition-colors"
          />
        </div>

        {/* Message field */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium opacity-80">Message</label>
          <textarea
            required
            rows={5}
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              if (status !== "idle") {
                setStatus("idle");
              }
            }}
            placeholder="what's on your mind?"
            className="w-full rounded-lg border border-window-border bg-amber-50/30 dark:bg-wave-from/20 px-3 py-2 text-sm outline-none focus:border-amber-500 dark:focus:border-cyan-200 transition-colors resize-none"
          />
        </div>

        {/* Status messages */}
        {status === "success" && (
          <p className="text-sm text-amber-500 dark:text-cyan-200 font-medium">
            Message sent! i&apos;ll get back to you soon.
          </p>
        )}
        {status === "error" && (
          <p className="text-sm text-red-400 font-medium">
            Something went wrong. please try again.
          </p>
        )}

        {/* Submit button */}
        <div className="flex justify-end">
          <SoundHover playType="click" src="/assets/original/sounds/click_general.mp3" vol={0.5}>
            <div className="h-10 group">
              <button
                type="submit"
                disabled={status === "loading"}
                className="group-hover:mt-0.75 border-window-border border rounded-lg pl-4.5 pr-5 pb-1.5 pt-1 duration-150 text-sm sm:text-base shadow-flat bg-amber-50 dark:bg-linear-to-br dark:from-wave-from dark:to-wave-from/50 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "loading" ? "Sending..." : "Send"}
              </button>
            </div>
          </SoundHover>
        </div>
      </form>
    </div>
  );
}
