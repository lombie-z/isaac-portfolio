import { ConnectSection } from "@/components/sections/connect";
import { ContactSection } from "@/components/sections/contact";
import { HeroSection } from "@/components/sections/hero";
import { MusicSection } from "@/components/sections/music";
import { OneShotsSection } from "@/components/sections/one-shots";
import { ShowcaseSection } from "@/components/sections/showcase";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ContactSection />
      <ShowcaseSection />
      <OneShotsSection />
      <MusicSection />
      <ConnectSection />
    </main>
  );
}
