import Hero from "@/sections/Hero";
import PainPoints from "@/sections/PainPoints";
import WhatToExpect from "@/sections/WhatToExpect";
import Host from "@/sections/Host";
import AfterBroadcast from "@/sections/AfterBroadcast";
import FAQ from "@/sections/FAQ";
import FinalCTA from "@/sections/FinalCTA";
import Footer from "@/sections/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <PainPoints />
      <WhatToExpect />
      <Host />
      <AfterBroadcast />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
