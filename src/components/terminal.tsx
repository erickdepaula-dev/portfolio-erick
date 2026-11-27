"use client";

import { useEffect, useRef, useState } from "react";
import { projects, siteConfig, techStack, whatsappLink } from "@/config/site";
import { scrollToId, useApp } from "./app-provider";

type Line = { kind: "in" | "out" | "accent" | "err"; text: string };

export function TerminalEgg() {
  const { t, lang, terminalOpen, setTerminalOpen, toggleLang } = useApp();
  const [lines, setLines] = useState<Line[]>([]);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [hIdx, setHIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!terminalOpen) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- greet on open
    setLines([
      { kind: "accent", text: t.terminal.welcome },
      { kind: "out", text: "" },
    ]);
    requestAnimationFrame(() => inputRef.current?.focus());
  }, [terminalOpen, t.terminal.welcome]);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [lines]);

  if (!terminalOpen) return null;

  const pt = lang === "pt";
  const commands: Record<string, { desc: string; run: () => Line[] | void }> = {
    help: { desc: pt ? "lista os comandos" : "list commands", run: () => [] },
    whoami: {
      desc: pt ? "quem é o Erick" : "who is Erick",
      run: () => t.about.bio.map((b) => ({ kind: "out" as const, text: b })),
    },
    stack: {
      desc: pt ? "tecnologias que uso" : "technologies I use",
      run: () => [{ kind: "out", text: techStack.map((s) => s.label).join("  ·  ") }],
    },
    projects: {
      desc: pt ? "meus projetos" : "my projects",
      run: () =>
        projects
          .filter((p) => p.live)
          .map((p) => ({ kind: "out" as const, text: `▸ ${p.name.padEnd(18)} ${p.live}` })),
    },
    contact: {
      desc: pt ? "como falar comigo" : "how to reach me",
      run: () => [
        { kind: "out", text: `email     ${siteConfig.contact.email}` },
        { kind: "out", text: `linkedin  ${siteConfig.contact.linkedin}` },
        { kind: "out", text: `github    ${siteConfig.contact.github}` },
        { kind: "out", text: `whatsapp  ${siteConfig.contact.whatsappDisplay}` },
      ],
    },
    lang: { desc: pt ? "alterna EN/PT" : "toggle EN/PT", run: () => void toggleLang() },
    goto: {
      desc: pt ? "goto <about|work|contact>" : "goto <about|work|contact>",
      run: () => [],
    },
    "sudo hire-erick": {
      desc: pt ? "😉" : "😉",
      run: () => {
        setTimeout(() => window.open(whatsappLink(t.contact.greeting), "_blank"), 900);
        return [
          { kind: "out", text: "[sudo] password for recruiter: ********" },
          { kind: "accent", text: pt ? "✔ Permissão concedida. Abrindo WhatsApp…" : "✔ Permission granted. Opening WhatsApp…" },
        ];
      },
    },
    clear: { desc: pt ? "limpa a tela" : "clear screen", run: () => [] },
    exit: { desc: pt ? "fecha o terminal" : "close terminal", run: () => [] },
  };

  const run = (raw: string) => {
    const cmd = raw.trim();
    const echo: Line = { kind: "in", text: cmd };
    if (!cmd) return setLines((l) => [...l, echo]);
    setHistory((h) => [cmd, ...h]);
    setHIdx(-1);

    if (cmd === "clear") return setLines([]);
    if (cmd === "exit") return setTerminalOpen(false);
    if (cmd === "help") {
      return setLines((l) => [
        ...l,
        echo,
        { kind: "accent", text: t.terminal.help + ":" },
        ...Object.entries(commands).map(([k, v]) => ({ kind: "out" as const, text: `  ${k.padEnd(16)} ${v.desc}` })),
      ]);
    }
    if (cmd.startsWith("goto")) {
      const target = cmd.split(/\s+/)[1];
      if (target && ["home", "about", "work", "contact"].includes(target)) {
        setTerminalOpen(false);
        setTimeout(() => scrollToId(target), 50);
        return;
      }
      return setLines((l) => [...l, echo, { kind: "err", text: "usage: goto <home|about|work|contact>" }]);
    }
    const found = commands[cmd];
    if (!found) return setLines((l) => [...l, echo, { kind: "err", text: `${cmd}: ${t.terminal.notFound}` }]);
    const out = found.run() ?? [];
    setLines((l) => [...l, echo, ...out]);
  };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      run(value);
      setValue("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const n = Math.min(hIdx + 1, history.length - 1);
      if (history[n] !== undefined) {
        setHIdx(n);
        setValue(history[n]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const n = hIdx - 1;
      setHIdx(Math.max(-1, n));
      setValue(n >= 0 ? history[n] : "");
    } else if (e.key === "Tab") {
      e.preventDefault();
      const match = Object.keys(commands).find((k) => k.startsWith(value));
      if (match && value) setValue(match);
    }
  };

  const color = { in: "text-fg", out: "text-muted", accent: "text-lime", err: "text-red-300" };

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center bg-black/60 p-4 backdrop-blur-sm sm:items-center" onClick={() => setTerminalOpen(false)}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Terminal"
        onClick={(e) => {
          e.stopPropagation();
          inputRef.current?.focus();
        }}
        className="w-full max-w-2xl overflow-hidden rounded-2xl border border-line-strong bg-[#0c0c0e] font-mono text-[13px] shadow-[0_40px_120px_rgba(0,0,0,.8)]"
      >
        <div className="flex items-center gap-2 border-b border-line bg-white/[0.03] px-4 py-3">
          <button onClick={() => setTerminalOpen(false)} aria-label="Close" className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          <span className="ml-3 text-xs text-dim">erick@portfolio: ~</span>
        </div>
        <div ref={bodyRef} className="h-[min(60vh,420px)] overflow-y-auto p-4 leading-relaxed">
          {lines.map((l, i) => (
            <p key={i} className={`whitespace-pre-wrap break-words ${color[l.kind]}`}>
              {l.kind === "in" && <span className="text-lime">➜ ~ </span>}
              {l.text || " "}
            </p>
          ))}
          <div className="flex items-center">
            <span className="text-lime">➜ ~&nbsp;</span>
            <input
              ref={inputRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={onKey}
              spellCheck={false}
              autoCapitalize="off"
              autoComplete="off"
              aria-label="Terminal input"
              className="flex-1 bg-transparent text-fg caret-lime outline-none"
              placeholder="whoami"
              autoFocus
            />
          </div>
        </div>
      </div>
    </div>
  );
}
