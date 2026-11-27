import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Inter, JetBrains_Mono } from "next/font/google";
import { AppProvider } from "@/components/app-provider";
import { siteConfig } from "@/config/site";
import "./globals.css";

const display = Bricolage_Grotesque({
  variable: "--ff-display",
  subsets: ["latin"],
  weight: ["500", "700", "800"],
});

const body = Inter({
  variable: "--ff-body",
  subsets: ["latin"],
});

const mono = JetBrains_Mono({
  variable: "--ff-mono",
  subsets: ["latin"],
});

const title = `${siteConfig.name} | Desenvolvedor de Software Full Stack`;
const description =
  "Portfólio de Erick de Paula, desenvolvedor de software full stack em João Pessoa/PB. Aplicações web com React, Next.js, TypeScript, Node.js, PostgreSQL e Supabase — do levantamento de requisitos ao deploy. Disponível para vagas e projetos freelance.";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: title, template: `%s | ${siteConfig.name}` },
  description,
  applicationName: siteConfig.name,
  keywords: [
    "Erick de Paula",
    "desenvolvedor de software",
    "desenvolvedor full stack",
    "desenvolvedor React",
    "desenvolvedor Next.js",
    "desenvolvedor freelancer",
    "programador João Pessoa",
    "TypeScript",
    "Node.js",
    "PostgreSQL",
    "Supabase",
    "portfólio",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  alternates: { canonical: "/" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  openGraph: {
    type: "profile",
    locale: "pt_BR",
    alternateLocale: ["en_US"],
    url: "/",
    siteName: siteConfig.name,
    title,
    description: "Desenvolvedor de software full stack. Aplicações web reais com React, Next.js e TypeScript — do documento ao deploy.",
    firstName: "Erick",
    lastName: "de Paula",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: "Desenvolvedor de software full stack. Aplicações web reais com React, Next.js e TypeScript — do documento ao deploy.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
};

/** Dados estruturados (schema.org) — ajudam o Google a entender quem é a pessoa do site. */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  url: siteConfig.url,
  inLanguage: "pt-BR",
  mainEntity: {
    "@type": "Person",
    name: siteConfig.name,
    alternateName: "Erick Ricardo de Paula",
    jobTitle: "Desenvolvedor de Software Full Stack",
    url: siteConfig.url,
    email: `mailto:${siteConfig.contact.email}`,
    address: { "@type": "PostalAddress", addressLocality: "João Pessoa", addressRegion: "PB", addressCountry: "BR" },
    alumniOf: { "@type": "CollegeOrUniversity", name: "Universidade Cruzeiro do Sul" },
    knowsAbout: ["Desenvolvimento web", "React", "Next.js", "TypeScript", "Node.js", "PHP", "PostgreSQL", "Supabase", "Prisma", "Ciência de Dados"],
    sameAs: [siteConfig.contact.linkedin, siteConfig.contact.github],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${body.variable} ${mono.variable} antialiased`}>
      <body className="grain min-h-screen font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
