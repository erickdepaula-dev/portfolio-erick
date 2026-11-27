"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { dictionaries, type Dict, type Lang } from "@/i18n/dictionary";

type AppState = {
  lang: Lang;
  t: Dict;
  setLang: (l: Lang) => void;
  toggleLang: () => void;
  paletteOpen: boolean;
  setPaletteOpen: (v: boolean) => void;
  terminalOpen: boolean;
  setTerminalOpen: (v: boolean) => void;
  toast: string | null;
  showToast: (msg: string) => void;
};

const AppContext = createContext<AppState | null>(null);
const STORAGE_KEY = "ep-lang";

export function AppProvider({ children }: { children: React.ReactNode }) {
  // PT é o padrão: é o que o Google indexa e o que aparece no HTML inicial.
  const [lang, setLangState] = useState<Lang>("pt");
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // Restore saved language (or switch to EN for non-Portuguese browsers on first visit)
  useEffect(() => {
    let initial: Lang = "pt";
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "pt" || saved === "en") initial = saved;
      else if (navigator.language && !navigator.language.toLowerCase().startsWith("pt")) initial = "en";
    } catch {}
    // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrate from storage once
    setLangState(initial);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {}
  }, []);

  const toggleLang = useCallback(() => setLang(lang === "en" ? "pt" : "en"), [lang, setLang]);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2200);
  }, []);

  // Global shortcuts: Ctrl/⌘+K → palette, ` → terminal
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const typing = target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable);
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setTerminalOpen(false);
        setPaletteOpen((v) => !v);
      } else if (e.key === "`" && !typing) {
        e.preventDefault();
        setPaletteOpen(false);
        setTerminalOpen((v) => !v);
      } else if (e.key === "Escape") {
        setPaletteOpen(false);
        setTerminalOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const value = useMemo<AppState>(
    () => ({
      lang,
      t: dictionaries[lang],
      setLang,
      toggleLang,
      paletteOpen,
      setPaletteOpen,
      terminalOpen,
      setTerminalOpen,
      toast,
      showToast,
    }),
    [lang, setLang, toggleLang, paletteOpen, terminalOpen, toast, showToast],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside <AppProvider>");
  return ctx;
}

export function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}
