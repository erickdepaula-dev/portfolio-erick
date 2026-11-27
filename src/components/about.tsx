"use client";

import { techStack } from "@/config/site";
import { useApp } from "./app-provider";
import { CountUp, Reveal, SectionHeading } from "./fx";

export function About() {
  const { t } = useApp();
  const a = t.about;

  return (
    <section id="about" className="relative mx-auto max-w-6xl -scroll-mt-16 px-4 py-24 sm:px-6 md:-scroll-mt-24 md:py-32">
      <SectionHeading kicker={a.kicker} title={a.title} accent={a.titleAccent} />

      <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
        <Reveal className="space-y-5 text-lg leading-relaxed text-muted">
          {a.bio.map((p, i) => (
            <p key={i} className={i === 0 ? "text-xl text-fg sm:text-2xl" : ""}>
              {p}
            </p>
          ))}
        </Reveal>

        <Reveal delay={120}>
          <dl className="divide-y divide-line overflow-hidden rounded-3xl border border-line bg-card">
            {a.facts.map((f) => (
              <div key={f.k} className="flex items-baseline justify-between gap-4 px-6 py-4">
                <dt className="font-mono text-xs uppercase tracking-widest text-dim">{f.k}</dt>
                <dd className="text-right text-sm font-medium">{f.v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>

      {/* Stats */}
      <div className="mt-16 grid gap-4 sm:grid-cols-3">
        {a.stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 100} className="rounded-3xl border border-line bg-card p-7">
            <p className="font-display text-5xl font-extrabold tracking-tight text-lime md:text-6xl">
              <CountUp value={s.value} suffix={s.suffix} />
            </p>
            <p className="mt-2 text-sm text-muted">{s.label}</p>
          </Reveal>
        ))}
      </div>

      {/* Process */}
      <Reveal className="mt-20">
        <h3 className="mb-8 font-display text-2xl font-bold">{a.processTitle}</h3>
      </Reveal>
      <ol className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
        {a.process.map((step, i) => (
          <li key={step.t} className="group bg-bg p-6 transition hover:bg-card">
            <span className="font-mono text-xs text-dim transition group-hover:text-lime">0{i + 1}</span>
            <p className="mt-6 font-display text-lg font-bold">{step.t}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">{step.d}</p>
          </li>
        ))}
      </ol>

      {/* Stack marquee */}
      <div className="relative mt-20 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
        <div className="flex w-max animate-[marquee_32s_linear_infinite] gap-4 hover:[animation-play-state:paused]">
          {[...techStack, ...techStack].map((tech, i) => (
            <div
              key={`${tech.key}-${i}`}
              className="flex items-center gap-3 rounded-full border border-line bg-card py-2 pl-2 pr-5"
              aria-hidden={i >= techStack.length}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/tech/${tech.key}.svg`} alt="" className="h-8 w-8 rounded-full" />
              <span className="whitespace-nowrap text-sm font-medium">{tech.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
