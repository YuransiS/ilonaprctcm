"use client";

// import { useScrollReveal } from "@/hooks/useScrollReveal";
import MagneticButton from "@/components/MagneticButton";
import CountdownTimer from "@/components/CountdownTimer";

const TARGET_DATE = new Date("2026-04-15T19:00:00+02:00");

export default function FinalCTA() {
  /*
  const ref = useScrollReveal<HTMLDivElement>({
    y: 40,
    duration: 0.8,
    start: "top 80%",
  });
  */

  return (
    <section
      className="section-padding relative overflow-hidden"
      id="final-cta"
      style={{ background: "var(--color-charcoal)" }}
    >
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, var(--color-gold) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8 overflow-visible">
        <span
          className="inline-block text-[10px] md:text-sm tracking-[0.4em] uppercase mb-10"
          style={{ color: "var(--color-gold)", fontWeight: 600 }}
        >
          Не зволікай
        </span>
        <h2
          className="mb-6 md:mb-10 font-serif"
          style={{
            fontSize: "clamp(2rem, 9vw, 4.5rem)",
            fontWeight: 400,
            lineHeight: 1,
            color: "var(--color-cream)",
            letterSpacing: "-0.01em",
          }}
        >
          ГОТОВА ЗМІНИТИ СВОЇ СТОСУНКИ?
        </h2>
        <p
          className="text-sm md:text-xl mb-12 md:mb-20 max-w-2xl mx-auto opacity-70"
          style={{
            color: "var(--color-warm-gray)",
            fontWeight: 300,
            lineHeight: 1.6,
          }}
        >
          Місця обмежені. Забронюй своє прямо зараз і зроби перший крок до
          стосунків, про які ти мрієш.
        </p>

        <div className="flex flex-col items-center gap-16 md:gap-24">
          <div className="w-full max-w-2xl overflow-visible px-2">
            <CountdownTimer targetDate={TARGET_DATE} />
          </div>

          <div className="relative pt-6 md:pt-10 overflow-visible w-full flex justify-center pb-12">
            <MagneticButton
              href="#"
              className="group relative inline-block focus:outline-none"
            >
              <div
                className="absolute -inset-10 bg-gold/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              />
              <span
                className="relative inline-block px-12 py-5 md:px-20 md:py-8 rounded-full text-xs md:text-lg tracking-[0.2em] md:tracking-[0.25em] uppercase font-bold transition-all duration-500 hover:scale-110 shadow-2xl"
                style={{
                  background: "linear-gradient(135deg, var(--color-gold) 0%, var(--color-gold-dark) 100%)",
                  color: "#fff",
                  boxShadow: "0 15px 40px -10px rgba(196, 149, 106, 0.5)",
                }}
              >
                Забронювати місце
              </span>
            </MagneticButton>
          </div>
        </div>
      </div>

    </section>
  );
}
