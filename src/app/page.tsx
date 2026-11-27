import { About } from "@/components/about";
import { CommandPalette } from "@/components/command-palette";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { Spotlight, Toast } from "@/components/fx";
import { Hero } from "@/components/hero";
import { MobileDock, Navbar } from "@/components/navbar";
import { TerminalEgg } from "@/components/terminal";
import { Work } from "@/components/work";

export default function Home() {
  return (
    <>
      <Spotlight />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Work />
        <Contact />
      </main>
      <Footer />
      <MobileDock />
      <CommandPalette />
      <TerminalEgg />
      <Toast />
    </>
  );
}
