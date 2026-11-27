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

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: `${siteConfig.name} — ${siteConfig.role}`,
  description:
    "Erick de Paula — Software Developer. TypeScript, React, Next.js, Node.js, Prisma, PostgreSQL e Supabase. Produtos reais, do documento ao deploy.",
  keywords: ["Erick de Paula", "Software Developer", "Next.js", "React", "TypeScript", "Full Stack", "Brasil"],
  authors: [{ name: siteConfig.name, url: siteConfig.contact.github }],
  openGraph: {
    title: `${siteConfig.name} — ${siteConfig.role}`,
    description: "Products built from the first doc to the last deploy.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable} antialiased`}>
      <body className="grain min-h-screen font-sans">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
