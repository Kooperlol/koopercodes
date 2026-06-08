"use client";

import axios from "axios";
import Link from "next/link";
import { useRef, useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import Navbar from "@/components/navbar";

interface FormDataValues {
  firstname: string;
  lastname: string;
  email: string;
  message: string;
  gRecaptchaToken: string;
}

type FormStatus = { type: "success" | "error"; message: string } | null;

export default function ContactPage() {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<FormStatus>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);
    setStatus(null);

    const form = e.currentTarget;
    const data = {
      firstname: (form.elements.namedItem("firstname") as HTMLInputElement).value.trim(),
      lastname: (form.elements.namedItem("lastname") as HTMLInputElement).value.trim(),
      email: (form.elements.namedItem("email") as HTMLInputElement).value.trim(),
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value.trim(),
    };

    if (!data.firstname || !data.lastname || !data.email || !data.message) {
      setStatus({ type: "error", message: "Please fill out all fields." });
      setIsSubmitting(false);
      return;
    }

    if (!executeRecaptcha) {
      setStatus({ type: "error", message: "Captcha not ready. Please try again." });
      setIsSubmitting(false);
      return;
    }

    executeRecaptcha("inquirySubmit").then(async (gRecaptchaToken) => {
      try {
        const payload: FormDataValues = { ...data, gRecaptchaToken };
        const response = await axios.post("/api/email", payload, {
          headers: { "Content-Type": "application/json" },
        });

        formRef.current?.reset();

        if (response?.data?.success === false) {
          setStatus({
            type: "error",
            message: "Unable to send your message. Please try again.",
          });
        } else {
          setStatus({ type: "success", message: "Message sent successfully." });
        }
      } catch {
        setStatus({
          type: "error",
          message: "Something went wrong. Please try again.",
        });
      } finally {
        setIsSubmitting(false);
      }
    });
  };

  const inputClass =
    "w-full rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-2.5 text-sm text-neutral-100 placeholder:text-neutral-600 outline-none transition-colors focus:border-neutral-600";

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <Navbar />

      <main className="mx-auto max-w-2xl px-6 pt-28 pb-20">
        <Link
          href="/"
          className="text-sm text-neutral-500 transition-colors hover:text-neutral-300"
        >
          ← Back
        </Link>

        <div className="mt-8 space-y-3">
          <h1 className="text-2xl font-semibold tracking-tight">Contact</h1>
          <p className="text-sm text-neutral-400 leading-relaxed">
            Or email directly at{" "}
            <a
              href="mailto:koopercodes@gmail.com"
              className="text-neutral-300 underline-offset-4 hover:underline"
            >
              koopercodes@gmail.com
            </a>
            .
          </p>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="mt-10 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              id="firstname"
              name="firstname"
              placeholder="First name"
              className={inputClass}
            />
            <input
              id="lastname"
              name="lastname"
              placeholder="Last name"
              className={inputClass}
            />
          </div>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            className={inputClass}
          />
          <textarea
            id="message"
            name="message"
            placeholder="Message"
            rows={5}
            className={`${inputClass} resize-none`}
          />

          {status && (
            <p
              className={`text-sm ${
                status.type === "success" ? "text-green-400" : "text-red-400"
              }`}
            >
              {status.message}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-lg border border-neutral-700 bg-neutral-900 px-5 py-2.5 text-sm font-medium transition-colors hover:border-neutral-500 hover:bg-neutral-800 disabled:opacity-50"
          >
            {isSubmitting ? "Sending…" : "Send message"}
          </button>
        </form>
      </main>
    </div>
  );
}
