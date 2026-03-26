"use client";

import MagneticButton from "@/components/MagneticButton";
import CountdownTimer from "@/components/CountdownTimer";

const TARGET_DATE = new Date("2026-04-15T19:00:00+02:00");

export default function FinalCTA() {
  return (
    <section className="section-padding bg-cream relative overflow-hidden" id="final-cta">
      {/* Dynamic Background Accents */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(circle_at_100%_0%,rgba(196,149,106,0.05),transparent_60%)] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/2 h-full bg-[radial-gradient(circle_at_0%_100%,rgba(232,196,184,0.05),transparent_60%)] pointer-events-none" />

      <div className="container-custom relative z-10 max-w-5xl text-center flex flex-col items-center">
        
        <header className="mb-16 md:mb-24 flex flex-col items-center">
          <span className="inline-block text-[10px] md:text-sm tracking-[0.4em] uppercase mb-10 text-gold font-semibold">
            Готова змінити життя?
          </span>
          <h2 className="heading-serif mb-12 text-charcoal" style={{ fontSize: "clamp(2.5rem, 8vw, 5.5rem)", lineHeight: 1.1, letterSpacing: "-0.01em" }}>
            ЗАБРОНЮЙ СВОЄ МІСЦЕ НА ЕФІРІ
          </h2>
          <div className="w-24 h-1 bg-gold rounded-full mb-12" />
          <p className="max-w-3xl text-xl md:text-3xl font-light text-charcoal leading-relaxed opacity-90">
            Зроби перший крок до стосунків, про які ти завжди мріяла. Це безкоштовно і це назавжди.
          </p>
        </header>

        <div className="w-full max-w-3xl mb-20 md:mb-28 px-4">
          <div className="p-8 md:p-14 bg-white/50 backdrop-blur-3xl rounded-[3rem] border border-gold/10 shadow-xl">
             <CountdownTimer targetDate={TARGET_DATE} />
          </div>
        </div>

        <div className="flex flex-col items-center gap-10">
          <MagneticButton href="#" className="btn-primary">
            Зареєструватися безкоштовно
          </MagneticButton>
          <div className="flex items-center gap-4 text-xs tracking-widest uppercase text-gold font-bold opacity-70">
            <span className="w-8 h-px bg-gold/30" />
            Вже 500+ учасниць
            <span className="w-8 h-px bg-gold/30" />
          </div>
        </div>

      </div>
    </section>
  );
}
