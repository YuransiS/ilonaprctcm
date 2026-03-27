"use client";

import { useState } from "react";
import Hero from "@/sections/Hero";
import PainPoints from "@/sections/PainPoints";
import WhatToExpect from "@/sections/WhatToExpect";
import Host from "@/sections/Host";
import AfterBroadcast from "@/sections/AfterBroadcast";
import FAQ from "@/sections/FAQ";
import FinalCTA from "@/sections/FinalCTA";
import Footer from "@/sections/Footer";
import RegistrationPopup from "@/components/RegistrationPopup";

export default function Home() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  return (
    <main>
      <Hero onRegisterAction={openPopup} />
      <PainPoints />
      <WhatToExpect />
      <Host />
      <AfterBroadcast />
      <FAQ />
      <FinalCTA onRegisterAction={openPopup} />
      <Footer />

      <RegistrationPopup
        isOpen={isPopupOpen}
        onClose={closePopup}
        telegramLink="https://t.me/ilonaasoldatiuk_bot?start=69c6efac1a79a3d88f059bee"
      />
    </main>
  );
}
