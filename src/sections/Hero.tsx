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
      <div className="container-custom relative z-10 flex flex-col items-center justify-end text-center pt-48 pb-12 md:pb-32 min-h-[100dvh]">
        <div className="w-full max-w-5xl flex flex-col items-center mb-8 md:mb-16">
          
          <div className="mb-8 md:mb-10">
            <span className="inline-block text-[10px] md:text-sm tracking-[0.4em] uppercase px-6 py-2 rounded-full bg-gold/10 backdrop-blur-md border border-gold/10 text-gold-dark font-semibold">
              Безкоштовний онлайн ефір
            </span>
          </div>

          <h1 className="heading-serif mb-8 md:mb-12 text-charcoal" style={{ fontSize: "clamp(2.2rem, 9vw, 6.5rem)", lineHeight: 1.1, letterSpacing: "-0.01em" }}>
            ХОЧЕШ ВІД ЧОЛОВІКА БІЛЬШЕ?
          </h1>

          <div className="mb-12 md:mb-20 max-w-3xl">
            <p className="text-xl md:text-3xl font-light text-charcoal leading-relaxed">
              Приєднуйся до безкоштовного ефіру про стосунки, які змінять твоє життя назавжди
            </p>
          </div>

          <div className="w-full flex flex-col items-center gap-16 md:gap-24">
            <div className="w-full max-w-2xl px-4 text-reveal-mask">
              <CountdownTimer targetDate={TARGET_DATE} />
            </div>

            <div className="flex justify-center pb-10 w-full px-4">
              <MagneticButton href="#" className="btn-primary w-full md:w-fit">
                Забронювати місце
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
