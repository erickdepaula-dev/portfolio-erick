"use client";

import { useEffect, useRef } from "react";
import { siteConfig, techStack } from "@/config/site";
import { scrollToId, useApp } from "./app-provider";
import { ArrowDown, ArrowUpRight, Terminal } from "./icons";

/** Positions (in % of the stage) + parallax depth for each floating tech icon. */
const orbit = [
  { x: 6, y: 14, d: 1.4, s: 1 },
  { x: 78, y: 4, d: 0.8, s: 1.1 },
  { x: 92, y: 36, d: 1.6, s: 0.9 },
  { x: -2, y: 52, d: 0.6, s: 1.15 },
  { x: 86, y: 70, d: 1.2, s: 1 },
  { x: 14, y: 86, d: 1.8, s: 0.85 },
  { x: 46, y: -4, d: 1.0, s: 0.8 },
  { x: 30, y: 92, d: 0.7, s: 0.95 },
  { x: 30, y: 2, d: 2.0, s: 0.75 },
];

function Avatar() {
  if (siteConfig.avatar) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={siteConfig.avatar}
        alt={siteConfig.name}
        className="relative z-10 h-full w-full object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
      />
    );
  }
  // Placeholder until the real memoji arrives
  return (
    <div className="relative z-10 grid h-full w-full place-items-center">
      <div
        className="relative grid aspect-square w-[78%] place-items-center rounded-full"
        style={{
          background:
            "radial-gradient(circle at 32% 28%, #3a3a40 0%, #1c1c20 38%, #0e0e10 72%), #111",
          boxShadow:
            "inset -18px -24px 60px rgba(0,0,0,.7), inset 14px 16px 40px rgba(255,255,255,.06), 0 40px 80px rgba(0,0,0,.6), 0 0 0 1px rgba(255,255,255,.06)",
        }}
      >
        <span className="font-display text-[clamp(64px,11vw,132px)] font-extrabold tracking-tighter text-fg">
          E<span className="text-lime">P</span>
        </span>
        <span
          className="absolute left-[22%] top-[14%] h-[18%] w-[30%] rotate-[-25deg] rounded-full bg-white/10 blur-md"
          aria-hidden
        />
      </div>
    </div>
  );
}

export function Hero() {
  const { t, setPaletteOpen, setTerminalOpen } = useApp();
  const stageRef = useRef<HTMLDivElement>(null);

  // Mouse parallax on the floating icons
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || !window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const cx = (e.clientX / window.innerWidth - 0.5) * 2;
        const cy = (e.clientY / window.innerHeight - 0.5) * 2;
        stage.querySelectorAll<HTMLElement>("[data-depth]").forEach((el) => {
          const d = Number(el.dataset.depth);
          el.style.transform = `translate3d(${cx * d * -14}px, ${cy * d * -14}px, 0)`;
        });
      });
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <section id="home" className="relative flex min-h-[100svh] items-center overflow-hidden pt-[72px]">
      {/* Backdrop glow + grid */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute right-[-10%] top-[10%] h-[520px] w-[520px] rounded-full bg-lime/[0.07] blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage: "radial-gradient(ellipse at 60% 40%, black 20%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-12 px-4 py-12 sm:px-6 lg:grid-cols-[1.15fr_1fr] lg:gap-6">
        <div className="hero-rise">
          <p className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-line bg-white/[0.03] px-3.5 py-1.5 text-xs text-muted">
            <span className="animate-pulse-dot h-2 w-2 rounded-full bg-lime" />
            {t.hero.available}
          </p>

          <h1 className="font-display font-extrabold leading-[0.88] tracking-[-0.04em]">
            <span className="block text-lg font-medium tracking-normal text-muted sm:text-xl">{t.hero.hello}</span>
            <span className="mt-3 block text-[clamp(56px,10.5vw,128px)]">Erick</span>
            <span className="block text-[clamp(56px,10.5vw,128px)]">
              de Paula<span className="text-lime">.</span>
            </span>
          </h1>

          <div className="mt-8 max-w-xl">
            <p className="font-display text-2xl font-bold sm:text-3xl">
              <span className="text-outline">{"<"}</span>
              {t.hero.role}
              <span className="text-outline">{" />"}</span>
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{t.hero.tagline}</p>
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <button
              onClick={() => scrollToId("contact")}
              className="group inline-flex items-center gap-2 rounded-full bg-lime px-6 py-3.5 text-sm font-semibold text-bg transition hover:shadow-[0_0_40px_rgba(198,255,61,.45)]"
            >
              {t.hero.cta}
              <ArrowUpRight width={18} height={18} className="transition group-hover:rotate-45" />
            </button>
            <button
              onClick={() => scrollToId("about")}
              className="inline-flex items-center gap-2 rounded-full border border-line-strong px-6 py-3.5 text-sm font-medium transition hover:border-fg"
            >
              {t.hero.more}
              <ArrowDown width={16} height={16} />
            </button>
          </div>

          <div className="mt-10 hidden flex-wrap items-center gap-x-4 gap-y-2 text-xs text-dim sm:flex">
            <button onClick={() => setPaletteOpen(true)} className="flex items-center gap-2 transition hover:text-fg">
              {t.hero.hint} <span className="kbd">Ctrl</span>
              <span className="kbd">K</span> {t.hero.hintAfter}
            </button>
            <span className="h-3 w-px bg-line-strong" />
            <button onClick={() => setTerminalOpen(true)} className="flex items-center gap-2 font-mono transition hover:text-lime">
              <Terminal width={14} height={14} /> ~/erick $ whoami<span className="animate-blink">_</span>
            </button>
          </div>
        </div>

        {/* Avatar stage */}
        <div ref={stageRef} className="relative mx-auto aspect-square w-full max-w-[460px]" aria-hidden>
          <div className="animate-spin-slow absolute inset-[6%] rounded-full border border-dashed border-lime/25" />
          <div className="absolute inset-[18%] rounded-full border border-line" />
          <div className="animate-float absolute inset-[12%]">
            <Avatar />
          </div>

          {techStack.map((tech, i) => {
            const o = orbit[i];
            return (
              <div
                key={tech.key}
                data-depth={o.d}
                className="absolute z-20 transition-transform duration-300 ease-out"
                style={{ left: `${o.x}%`, top: `${o.y}%` }}
              >
                <div
                  className="animate-float group relative"
                  style={{ animationDelay: `${i * -0.7}s`, animationDuration: `${5 + (i % 3)}s` }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/tech/${tech.key}.svg`}
                    alt=""
                    className="rounded-[22%] shadow-[0_12px_30px_rgba(0,0,0,.55)] ring-1 ring-white/10"
                    style={{ width: `calc(clamp(38px, 6vw, 56px) * ${o.s})`, height: "auto" }}
                  />
                </div>
              </div>
            );
          })}

          <div className="absolute -bottom-2 right-[6%] z-30 hidden sm:block rotate-[-4deg] rounded-2xl rounded-br-sm border border-line-strong bg-elev/90 px-4 py-2 font-mono text-xs backdrop-blur">
            <span className="text-lime">const</span> hello = <span className="text-muted">&quot;world&quot;</span> 👋
          </div>
        </div>
      </div>

      <button
        onClick={() => scrollToId("about")}
        aria-label={t.hero.more}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-dim transition hover:text-fg md:flex"
      >
        scroll
        <span className="h-10 w-px bg-gradient-to-b from-dim to-transparent" />
      </button>
    </section>
  );
}
