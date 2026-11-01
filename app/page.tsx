import { MobileNav } from "@/components/mobile-nav";
import { ConnectSection } from "@/components/sections/connect";
import { ContactSection } from "@/components/sections/contact";
import { ElsewhereSection } from "@/components/sections/elsewhere";
import { HeroSection } from "@/components/sections/hero";
import { ShowcaseSection } from "@/components/sections/showcase";

export default function Home() {
  return (
    <main>
      <MobileNav />
      <HeroSection />
      <ContactSection />
      <ShowcaseSection />
      <ElsewhereSection />
      <ConnectSection />
    </main>
  );
}
