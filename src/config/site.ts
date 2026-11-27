/**
 * ─────────────────────────────────────────────────────────────
 *  Configuração central do portfólio.
 *  Troque dados aqui — o site inteiro se atualiza.
 * ─────────────────────────────────────────────────────────────
 */

export const siteConfig = {
  name: "Erick de Paula",
  shortName: "EP",
  role: "Software Developer",
  url: "https://erickdepaula.com.br",

  /** Caminho do avatar (memoji/3D, PNG com fundo transparente) dentro de /public.
   *  Deixe `null` para usar o placeholder animado. Ex.: "/avatar.png" */
  avatar: null as string | null,

  /** Currículo em PDF dentro de /public. Deixe `null` até enviar o arquivo.
   *  Ex.: "/curriculo-erick-de-paula.pdf" */
  resume: "/curriculo-erick-de-paula.pdf" as string | null,

  contact: {
    email: "erickricardowork@gmail.com",
    /** Somente números, com DDI 55 + DDD */
    whatsapp: "5511980585077",
    whatsappDisplay: "+55 (11) 98058-5077",
    linkedin: "https://www.linkedin.com/in/erick-ricardo/",
    github: "https://github.com/erickdepaula-dev",
    githubUser: "erickdepaula-dev",
  },
} as const;

export type TechKey =
  | "html"
  | "css"
  | "ts"
  | "react"
  | "nextjs"
  | "nodejs"
  | "prisma"
  | "postgres"
  | "supabase";

export const techStack: { key: TechKey; label: string }[] = [
  { key: "html", label: "HTML" },
  { key: "css", label: "CSS" },
  { key: "ts", label: "TypeScript" },
  { key: "react", label: "React" },
  { key: "nextjs", label: "Next.js" },
  { key: "nodejs", label: "Node.js" },
  { key: "prisma", label: "Prisma" },
  { key: "postgres", label: "PostgreSQL" },
  { key: "supabase", label: "Supabase" },
];

export type ProjectArt = "finance" | "shopping" | "board" | "soon";

export type Project = {
  id: string;
  name: string;
  art: ProjectArt;
  stack: string[];
  live?: string;
  repo?: string;
  status: "production" | "live" | "daily" | "soon";
};

/** Para adicionar o projeto do cliente: troque o último item (status "soon"). */
export const projects: Project[] = [
  {
    id: "finance",
    name: "Finance Connect",
    art: "finance",
    status: "production",
    stack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Clerk", "IA (Gemini/OpenAI)"],
    live: "https://www.financeconnect.com.br/",
  },
  {
    id: "despesas",
    name: "Connect Despesas",
    art: "shopping",
    status: "live",
    stack: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS", "IA"],
    live: "https://despesas.connectcode.site/",
  },
  {
    id: "board",
    name: "Connect Board",
    art: "board",
    status: "daily",
    stack: ["Next.js", "TypeScript", "Drizzle", "PostgreSQL", "Better Auth", "Vitest"],
    live: "https://trello.connectcode.site/",
  },
  {
    id: "client",
    name: "Client Project",
    art: "soon",
    status: "soon",
    stack: [],
  },
];

export const whatsappLink = (text?: string) =>
  `https://wa.me/${siteConfig.contact.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
