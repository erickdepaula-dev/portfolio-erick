"use client";

import { siteConfig, whatsappLink } from "@/config/site";
import { scrollToId, useApp } from "./app-provider";
import { sections } from "./navbar";
import { GitHub, LinkedIn, Mail, WhatsApp } from "./icons";

export function Footer() {
  const { t } = useApp();
  const socials = [
    { icon: GitHub, href: siteConfig.contact.github, label: "GitHub" },
    { icon: LinkedIn, href: siteConfig.contact.linkedin, label: "LinkedIn" },
    { icon: WhatsApp, href: whatsappLink(), label: "WhatsApp" },
    { icon: Mail, href: `mailto:${siteConfig.contact.email}`, label: "Email" },
  ];
  return (
    <footer className="relative mt-10 overflow-hidden border-t border-line pb-24 md:pb-0">
      <div className="mx-auto max-w-6xl px-4 pt-16 sm:px-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
            {sections.map((id) => (
              <li key={id}>
                <button onClick={() => scrollToId(id)} className="transition hover:text-lime">
                  {t.nav[id]}
                </button>
              </li>
            ))}
          </ul>
          <div className="flex gap-2">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={label}
                className="grid h-11 w-11 place-items-center rounded-full border border-line text-muted transition hover:border-lime hover:bg-lime hover:text-bg"
              >
                <Icon width={18} height={18} />
              </a>
            ))}
          </div>
        </div>

        <p
          aria-hidden
          className="mt-14 select-none whitespace-nowrap text-center font-display text-[clamp(48px,14.5vw,190px)] font-extrabold leading-[0.8] tracking-[-0.05em] text-white/[0.04]"
        >
          {siteConfig.name}
        </p>

        <div className="flex flex-col gap-2 border-t border-line py-6 text-xs text-dim sm:flex-row sm:justify-between">
          <p>
            © 2026 {siteConfig.name}. {t.footer.rights}
          </p>
          <p>
            {t.footer.made} <span className="text-fg">{siteConfig.name}</span> · Next.js + Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
}
