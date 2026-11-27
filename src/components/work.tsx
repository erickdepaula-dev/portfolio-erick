"use client";

import { projects, type Project, type ProjectArt } from "@/config/site";
import { useApp } from "./app-provider";
import { Reveal, SectionHeading } from "./fx";
import { ArrowUpRight, GitHub, Sparkle } from "./icons";

/** Little hand-made UI illustrations instead of screenshots. */
function Art({ kind }: { kind: ProjectArt }) {
  if (kind === "finance") {
    const bars = [38, 62, 45, 80, 56, 92, 70];
    return (
      <div className="flex h-full flex-col justify-between p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-dim">Balance</p>
            <p className="font-display text-3xl font-extrabold">R$ 12.480<span className="text-dim">,00</span></p>
          </div>
          <span className="rounded-full bg-lime-soft px-2.5 py-1 font-mono text-[11px] text-lime">+18.4%</span>
        </div>
        <div className="flex h-28 items-end gap-2">
          {bars.map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-t-md bg-gradient-to-t from-lime/20 to-lime transition-all duration-500 group-hover:opacity-100"
              style={{ height: `${h}%`, opacity: i === bars.length - 2 ? 1 : 0.55 }}
            />
          ))}
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-line bg-black/30 px-3 py-2 text-xs text-muted">
          <Sparkle width={14} height={14} className="text-lime" /> AI: &quot;You spent 12% less on food this month.&quot;
        </div>
      </div>
    );
  }
  if (kind === "shopping") {
    const items = [
      { n: "Arroz 5kg", p: "27,90", done: true },
      { n: "Café 500g", p: "18,49", done: true },
      { n: "Azeite", p: "34,90", done: false },
      { n: "Frutas", p: "22,00", done: false },
    ];
    return (
      <div className="flex h-full flex-col justify-between p-6">
        <div className="space-y-2">
          {items.map((it) => (
            <div key={it.n} className="flex items-center gap-3 rounded-xl border border-line bg-black/30 px-3 py-2.5 text-sm">
              <span
                className={`grid h-4 w-4 place-items-center rounded-[5px] border ${
                  it.done ? "border-lime bg-lime text-bg" : "border-line-strong"
                }`}
              >
                {it.done && <span className="text-[10px] font-bold">✓</span>}
              </span>
              <span className={it.done ? "text-dim line-through" : ""}>{it.n}</span>
              <span className="ml-auto font-mono text-xs text-muted">R$ {it.p}</span>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <div className="mb-1.5 flex justify-between font-mono text-[11px] text-muted">
            <span>R$ 103,29</span>
            <span>/ R$ 150,00</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-[69%] rounded-full bg-lime" />
          </div>
        </div>
      </div>
    );
  }
  if (kind === "board") {
    const cols = [
      { t: "To do", c: 3 },
      { t: "Doing", c: 2 },
      { t: "Done", c: 3 },
    ];
    return (
      <div className="grid h-full grid-cols-3 gap-2.5 p-6">
        {cols.map((col, ci) => (
          <div key={col.t} className="flex flex-col gap-2 rounded-xl bg-black/30 p-2">
            <p className="px-1 font-mono text-[10px] uppercase tracking-widest text-dim">{col.t}</p>
            {Array.from({ length: col.c }).map((_, i) => (
              <div
                key={i}
                className={`rounded-lg border border-line bg-white/[0.04] p-2 transition duration-500 ${
                  ci === 1 && i === 0 ? "rotate-[-3deg] border-lime/60 shadow-[0_10px_30px_rgba(198,255,61,.15)] group-hover:rotate-0" : ""
                }`}
              >
                <div className={`mb-1.5 h-1.5 w-8 rounded-full ${ci === 2 ? "bg-lime/70" : "bg-white/20"}`} />
                <div className="h-1.5 w-full rounded-full bg-white/10" />
                <div className="mt-1 h-1.5 w-2/3 rounded-full bg-white/10" />
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="grid h-full place-items-center p-6">
      <div className="text-center">
        <p className="font-mono text-sm text-dim">
          <span className="text-lime">$</span> git commit -m &quot;soon&quot;<span className="animate-blink">_</span>
        </p>
      </div>
    </div>
  );
}

function ProjectCard({ p, index }: { p: Project; index: number }) {
  const { t } = useApp();
  const copy = t.work.projects[p.id as keyof typeof t.work.projects];
  const soon = p.status === "soon";

  return (
    <Reveal as="article" delay={(index % 2) * 120} className="h-full">
      <div
        className={`group relative flex h-full flex-col overflow-hidden rounded-[28px] border bg-card transition duration-500 ${
          soon ? "border-dashed border-line-strong" : "border-line hover:-translate-y-1 hover:border-lime/40"
        }`}
      >
        <div className="relative h-64 overflow-hidden border-b border-line bg-[radial-gradient(circle_at_70%_0%,rgba(198,255,61,.08),transparent_60%)]">
          <Art kind={p.art} />
          <span className="absolute right-5 top-5 font-mono text-xs text-dim">0{index + 1}</span>
        </div>

        <div className="flex flex-1 flex-col p-7">
          <div className="mb-3 flex items-center gap-2">
            <span className={`h-1.5 w-1.5 rounded-full ${soon ? "bg-dim" : "bg-lime"}`} />
            <span className="font-mono text-[11px] uppercase tracking-widest text-muted">{t.work.status[p.status]}</span>
          </div>
          <h3 className="font-display text-3xl font-extrabold tracking-tight">{soon ? t.work.status.soon + " ✦" : p.name}</h3>
          <p className="mt-2 font-medium text-fg/90">{copy.tagline}</p>
          <p className="mt-3 text-sm leading-relaxed text-muted">{copy.desc}</p>

          {p.stack.length > 0 && (
            <ul className="mt-5 flex flex-wrap gap-1.5">
              {p.stack.map((s) => (
                <li key={s} className="rounded-full border border-line px-2.5 py-1 font-mono text-[11px] text-muted">
                  {s}
                </li>
              ))}
            </ul>
          )}

          {!soon && (
            <div className="mt-auto flex flex-wrap gap-2 pt-7">
              {p.live && (
                <a
                  href={p.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-fg px-4 py-2 text-sm font-semibold text-bg transition hover:bg-lime"
                >
                  {t.work.live} <ArrowUpRight width={16} height={16} />
                </a>
              )}
              {p.repo && (
                <a
                  href={p.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-line-strong px-4 py-2 text-sm transition hover:border-fg"
                >
                  <GitHub width={15} height={15} /> {t.work.code}
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </Reveal>
  );
}

export function Work() {
  const { t } = useApp();
  return (
    <section id="work" className="relative mx-auto max-w-6xl -scroll-mt-16 px-4 py-24 sm:px-6 md:-scroll-mt-24 md:py-32">
      <SectionHeading kicker={t.work.kicker} title={t.work.title} accent={t.work.titleAccent} />
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((p, i) => (
          <ProjectCard key={p.id} p={p} index={i} />
        ))}
      </div>
    </section>
  );
}
