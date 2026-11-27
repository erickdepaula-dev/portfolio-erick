"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";
import { scrollToId, useApp } from "./app-provider";
import { Command, Download } from "./icons";

export const sections = ["home", "about", "work", "contact"] as const;

export function Logo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 24" className={className} aria-hidden>
      <path
        d="M12 4a8 8 0 1 0 0 16c4.4 0 7-4 12-8s7.6-8 12-8a8 8 0 1 1 0 16c-4.4 0-7-4-12-8S16.4 4 12 4Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Navbar() {
  const { t, lang, toggleLang, setPaletteOpen, showToast } = useApp();
  const [active, setActive] = useState<string>("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  const resumeBtn = "inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition sm:px-4";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "border-b border-line bg-bg/70 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-[72px] max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <button onClick={() => scrollToId("home")} className="flex items-center gap-2 text-fg" aria-label={siteConfig.name}>
          <Logo className="h-6 w-12 text-fg transition hover:text-lime" />
        </button>

        <ul className="hidden items-center gap-1 rounded-full border border-line bg-white/[0.02] p-1 md:flex">
          {sections.map((id) => (
            <li key={id}>
              <button
                onClick={() => scrollToId(id)}
                className={`rounded-full px-4 py-1.5 text-sm transition ${
                  active === id ? "bg-fg text-bg" : "text-muted hover:text-fg"
                }`}
              >
                {t.nav[id]}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setPaletteOpen(true)}
            className="hidden items-center gap-1.5 rounded-full border border-line px-3 py-2 text-xs text-muted transition hover:border-line-strong hover:text-fg sm:flex"
            aria-label="Command palette"
          >
            <Command width={14} height={14} />
            <span className="font-mono">K</span>
          </button>
          <button
            onClick={toggleLang}
            className="rounded-full border border-line px-3 py-2 font-mono text-xs transition hover:border-lime hover:text-lime"
            aria-label={lang === "en" ? "Mudar para Português" : "Switch to English"}
          >
            <span className={lang === "en" ? "text-fg" : "text-dim"}>EN</span>
            <span className="mx-1 text-dim">/</span>
            <span className={lang === "pt" ? "text-fg" : "text-dim"}>PT</span>
          </button>
          {siteConfig.resume ? (
            <a href={siteConfig.resume} download aria-label={t.nav.resume} className={`${resumeBtn} bg-fg text-bg hover:bg-lime`}>
              <span className="hidden sm:inline">{t.nav.resume}</span>
              <Download width={15} height={15} />
            </a>
          ) : (
            <button
              onClick={() => showToast(t.nav.resumeSoon)}
              aria-label={t.nav.resume}
              className={`${resumeBtn} border border-line-strong text-fg hover:border-lime hover:text-lime`}
            >
              <span className="hidden sm:inline">{t.nav.resume}</span>
              <Download width={15} height={15} />
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}

/** Bottom dock for small screens (nav links are hidden there). */
export function MobileDock() {
  const { t, setTerminalOpen } = useApp();
  return (
    <nav className="fixed inset-x-0 bottom-4 z-50 flex justify-center px-4 md:hidden" aria-label="Mobile">
      <ul className="flex items-center gap-1 rounded-full border border-line-strong bg-elev/85 p-1.5 shadow-[0_20px_60px_rgba(0,0,0,.6)] backdrop-blur-xl">
        {sections.map((id) => (
          <li key={id}>
            <button onClick={() => scrollToId(id)} className="rounded-full px-3.5 py-2 text-xs text-muted transition active:bg-fg active:text-bg">
              {t.nav[id]}
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={() => setTerminalOpen(true)}
            aria-label="Terminal"
            className="grid h-8 w-8 place-items-center rounded-full bg-lime font-mono text-xs font-bold text-bg"
          >
            &gt;_
          </button>
        </li>
      </ul>
    </nav>
  );
}
