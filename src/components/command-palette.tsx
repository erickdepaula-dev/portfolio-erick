"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { siteConfig, whatsappLink } from "@/config/site";
import { scrollToId, useApp } from "./app-provider";
import { copyEmail } from "./contact";
import { sections } from "./navbar";
import { Copy, GitHub, Globe, Hash, LinkedIn, Search, Terminal, WhatsApp } from "./icons";

type Item = {
  id: string;
  group: "nav" | "actions" | "links";
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  hint?: string;
  run: () => void;
};

export function CommandPalette() {
  const { t, paletteOpen, setPaletteOpen, setTerminalOpen, toggleLang, showToast } = useApp();
  const [q, setQ] = useState("");
  const [idx, setIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const items = useMemo<Item[]>(
    () => [
      ...sections.map((id) => ({
        id: `nav-${id}`,
        group: "nav" as const,
        label: t.nav[id],
        icon: Hash,
        run: () => scrollToId(id),
      })),
      { id: "lang", group: "actions", label: t.palette.toggleLang, icon: Globe, hint: "EN/PT", run: toggleLang },
      { id: "copy", group: "actions", label: t.palette.copyEmail, icon: Copy, run: () => copyEmail(showToast, t.contact.copied) },
      { id: "term", group: "actions", label: t.palette.terminal, icon: Terminal, hint: "`", run: () => setTerminalOpen(true) },
      { id: "gh", group: "links", label: "GitHub", icon: GitHub, run: () => window.open(siteConfig.contact.github, "_blank") },
      { id: "li", group: "links", label: "LinkedIn", icon: LinkedIn, run: () => window.open(siteConfig.contact.linkedin, "_blank") },
      { id: "wa", group: "links", label: t.palette.whatsapp, icon: WhatsApp, run: () => window.open(whatsappLink(t.contact.greeting), "_blank") },
    ],
    [t, toggleLang, setTerminalOpen, showToast],
  );

  const filtered = items.filter((i) => i.label.toLowerCase().includes(q.trim().toLowerCase()));

  useEffect(() => {
    if (paletteOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- reset when opened
      setQ("");
      setIdx(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [paletteOpen]);

  if (!paletteOpen) return null;

  const exec = (item?: Item) => {
    if (!item) return;
    setPaletteOpen(false);
    item.run();
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setIdx((i) => (i + 1) % Math.max(1, filtered.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setIdx((i) => (i - 1 + filtered.length) % Math.max(1, filtered.length));
    } else if (e.key === "Enter") {
      e.preventDefault();
      exec(filtered[idx]);
    }
  };

  let lastGroup = "";

  return (
    <div className="fixed inset-0 z-[70] flex items-start justify-center bg-black/60 px-4 pt-[14vh] backdrop-blur-sm" onClick={() => setPaletteOpen(false)}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg overflow-hidden rounded-2xl border border-line-strong bg-elev shadow-[0_40px_120px_rgba(0,0,0,.7)]"
      >
        <div className="flex items-center gap-3 border-b border-line px-4">
          <Search width={18} height={18} className="text-dim" />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setIdx(0);
            }}
            onKeyDown={onKey}
            placeholder={t.palette.placeholder}
            autoFocus
            className="h-14 flex-1 bg-transparent text-fg outline-none placeholder:text-dim"
          />
          <span className="kbd">esc</span>
        </div>
        <ul className="max-h-[50vh] overflow-y-auto p-2">
          {filtered.length === 0 && <li className="px-3 py-8 text-center text-sm text-dim">{t.palette.empty}</li>}
          {filtered.map((item, i) => {
            const header = item.group !== lastGroup ? t.palette.groups[item.group] : null;
            lastGroup = item.group;
            const Icon = item.icon;
            return (
              <li key={item.id}>
                {header && <p className="px-3 pb-1 pt-3 font-mono text-[10px] uppercase tracking-widest text-dim">{header}</p>}
                <button
                  onMouseEnter={() => setIdx(i)}
                  onClick={() => exec(item)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition ${
                    i === idx ? "bg-lime text-bg" : "text-fg"
                  }`}
                >
                  <Icon width={16} height={16} />
                  {item.label}
                  {item.hint && <span className={`ml-auto font-mono text-[11px] ${i === idx ? "text-bg/70" : "text-dim"}`}>{item.hint}</span>}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
