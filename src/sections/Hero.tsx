"use client";

import Image from "next/image";
import CountdownTimer from "@/components/CountdownTimer";
import MagneticButton from "@/components/MagneticButton";

const TARGET_DATE = new Date("2026-04-15T19:00:00+02:00");

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden" id="hero">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero.png"
          alt="Hero background"
          fill
          className="object-cover object-top brightness-[0.95]"
          priority
          sizes="100vw"
        />
        {/* Gradient Overlay for Readability */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, rgba(45,41,38,0.1) 0%, rgba(232,196,184,0.1) 40%, rgba(255,248,240,0.3) 70%, var(--color-cream) 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="container-custom relative z-10 flex flex-col items-center justify-end text-center pt-20 pb-4 md:pb-20 min-h-[100dvh]">
        

        {/* White glow behind text area for readability */}
        <div
          className="absolute inset-x-0 bottom-0 top-[35%] pointer-events-none z-0 bg-[radial-gradient(circle_at_50%_90%,rgba(255,248,240,0.95)_0%,rgba(255,248,240,0.6)_40%,transparent_100%)]"
        />

        <div className="w-full max-w-5xl flex flex-col items-center relative z-10">
          <div className="flex flex-col items-center mb-4 md:mb-12 px-4 py-8 rounded-[2.5rem]">
            
            <div className="mb-4 md:mb-10">
              <span className="inline-block text-[10px] md:text-sm tracking-[0.4em] uppercase px-5 py-2 rounded-full bg-white/60 backdrop-blur-md border border-gold/20 text-gold-dark font-bold shadow-sm">
                Безкоштовний онлайн ефір
              </span>
            </div>

            <h1 className="heading-serif mb-4 md:mb-10 text-charcoal" style={{ fontSize: "clamp(1.6rem, 9vw, 6.5rem)", lineHeight: 1.1, letterSpacing: "-0.01em" }}>
              ХОЧЕШ ВІД ЧОЛОВІКА БІЛЬШЕ?
            </h1>

            <div className="mb-6 md:mb-12 max-w-4xl">
              <p className="text-xl md:text-3xl font-light text-charcoal-light leading-relaxed">
                Приєднуйся до безкоштовного ефіру про стосунки <br className="hidden md:block" /> які змінять твоє життя назавжди
              </p>
            </div>

            <div className="w-full flex flex-col items-center gap-4 md:gap-16">
              <div className="w-full max-w-2xl px-2">
                <CountdownTimer targetDate={TARGET_DATE} />
              </div>

              <div className="flex justify-center w-full px-2 pt-2">
                <MagneticButton href="#" className="btn-primary w-full md:w-fit shadow-[0_20px_60px_-15px_rgba(196,149,106,0.6)]">
                  Забронювати місце
                </MagneticButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
