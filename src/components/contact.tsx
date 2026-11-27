"use client";

import { useState } from "react";
import { siteConfig, whatsappLink } from "@/config/site";
import { useApp } from "./app-provider";
import { Reveal, SectionHeading } from "./fx";
import { ArrowUpRight, Copy, GitHub, LinkedIn, Mail, WhatsApp } from "./icons";

/** (11) 98058-5077 style mask */
function maskPhone(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

type Errors = Partial<Record<"name" | "phone" | "message", string>>;

export function copyEmail(showToast: (m: string) => void, msg: string) {
  navigator.clipboard?.writeText(siteConfig.contact.email).then(
    () => showToast(msg),
    () => (window.location.href = `mailto:${siteConfig.contact.email}`),
  );
}

export function Contact() {
  const { t, showToast } = useApp();
  const c = t.contact;
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Errors = {};
    if (form.name.trim().length < 2) next.name = c.errors.name;
    if (form.phone.replace(/\D/g, "").length < 10) next.phone = c.errors.phone;
    if (form.message.trim().length < 5) next.message = c.errors.message;
    setErrors(next);
    if (Object.keys(next).length) return;

    const text = [
      c.greeting,
      "",
      `*${c.labels.name}:* ${form.name.trim()}`,
      `*${c.labels.phone}:* ${form.phone}`,
      `*${c.labels.message}:*`,
      form.message.trim(),
    ].join("\n");
    window.open(whatsappLink(text), "_blank", "noopener,noreferrer");
  };

  const field =
    "w-full rounded-2xl border bg-black/30 px-4 py-3.5 text-fg placeholder:text-dim outline-none transition focus:border-lime focus:ring-4 focus:ring-lime/10";

  const channels = [
    { icon: Mail, label: siteConfig.contact.email, href: `mailto:${siteConfig.contact.email}`, copy: true },
    { icon: LinkedIn, label: "in/erick-ricardo", href: siteConfig.contact.linkedin },
    { icon: GitHub, label: siteConfig.contact.githubUser, href: siteConfig.contact.github },
    { icon: WhatsApp, label: siteConfig.contact.whatsappDisplay, href: whatsappLink(c.greeting) },
  ];

  return (
    <section id="contact" className="relative mx-auto max-w-6xl -scroll-mt-16 px-4 py-24 sm:px-6 md:-scroll-mt-24 md:py-32">
      <SectionHeading kicker={c.kicker} title={c.title} accent={c.titleAccent} />

      <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <Reveal>
          <p className="max-w-md text-lg leading-relaxed text-muted">{c.sub}</p>
          <p className="mb-4 mt-10 font-mono text-xs uppercase tracking-widest text-dim">{c.or}</p>
          <ul className="space-y-2">
            {channels.map(({ icon: Icon, label, href, copy }) => (
              <li key={href} className="group flex items-center gap-2">
                <a
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center gap-4 rounded-2xl border border-line bg-card px-4 py-3.5 transition hover:border-lime/40"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/[0.04] text-muted transition group-hover:bg-lime group-hover:text-bg">
                    <Icon width={18} height={18} />
                  </span>
                  <span className="truncate text-sm font-medium">{label}</span>
                  <ArrowUpRight width={16} height={16} className="ml-auto shrink-0 text-dim transition group-hover:text-lime" />
                </a>
                {copy && (
                  <button
                    onClick={() => copyEmail(showToast, c.copied)}
                    aria-label="Copy email"
                    className="grid h-[68px] w-14 shrink-0 place-items-center rounded-2xl border border-line bg-card text-muted transition hover:border-lime/40 hover:text-lime"
                  >
                    <Copy width={18} height={18} />
                  </button>
                )}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={120}>
          <form
            onSubmit={submit}
            noValidate
            className="relative overflow-hidden rounded-[28px] border border-line bg-card p-6 sm:p-8"
          >
            <div aria-hidden className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-lime/10 blur-3xl" />
            <div className="relative space-y-5">
              <label className="block">
                <span className="mb-2 block text-sm font-medium">{c.labels.name}</span>
                <input
                  className={`${field} ${errors.name ? "border-red-400/70" : "border-line"}`}
                  placeholder={c.name}
                  autoComplete="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                {errors.name && <span className="mt-1.5 block text-xs text-red-300">{errors.name}</span>}
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-medium">{c.labels.phone}</span>
                <input
                  className={`${field} ${errors.phone ? "border-red-400/70" : "border-line"}`}
                  placeholder="(11) 90000-0000"
                  inputMode="tel"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: maskPhone(e.target.value) })}
                />
                {errors.phone && <span className="mt-1.5 block text-xs text-red-300">{errors.phone}</span>}
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-medium">{c.labels.message}</span>
                <textarea
                  rows={5}
                  className={`${field} resize-none ${errors.message ? "border-red-400/70" : "border-line"}`}
                  placeholder={c.message}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
                {errors.message && <span className="mt-1.5 block text-xs text-red-300">{errors.message}</span>}
              </label>
              <button
                type="submit"
                className="group flex w-full items-center justify-center gap-2.5 rounded-2xl bg-lime px-6 py-4 font-semibold text-bg transition hover:shadow-[0_0_40px_rgba(198,255,61,.4)]"
              >
                <WhatsApp width={20} height={20} />
                {c.send}
                <ArrowUpRight width={18} height={18} className="transition group-hover:rotate-45" />
              </button>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
