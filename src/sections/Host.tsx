"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useScrollReveal } from "@/hooks/useScrollReveal";

gsap.registerPlugin(ScrollTrigger);

export default function Host() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLParagraphElement>(null);

  const textRef = useScrollReveal<HTMLDivElement>({
    y: 40,
    duration: 0.8,
    start: "top 75%",
  });

  useEffect(() => {
    const imgContainer = imageContainerRef.current;
    if (!imgContainer) return;

    gsap.set(imgContainer, {
      clipPath: "inset(0 45% 0 45%)",
    });

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 70%",
      end: "center center",
      scrub: 1,
      onUpdate: (self) => {
        const p = self.progress;
        const inset = 45 * (1 - p);
        gsap.set(imgContainer, {
          clipPath: `inset(0 ${inset}% 0 ${inset}%)`,
        });
      },
    });

    return () => trigger.kill();
  }, []);

  useEffect(() => {
    const quote = quoteRef.current;
    if (!quote) return;

    const trigger = ScrollTrigger.create({
      trigger: quote,
      start: "top 80%",
      end: "bottom 60%",
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress * 100;
        quote.style.backgroundPosition = `${100 - progress}% 0`;
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-32 bg-soft-white/60 relative overflow-hidden" id="host">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_100%,rgba(196,149,106,0.03),transparent_60%)]" />
      <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div
            ref={imageContainerRef}
            className="relative w-full rounded-3xl overflow-hidden will-change-clip shadow-2xl mx-auto"
            style={{ paddingTop: '100%', maxWidth: '400px' }}
          >
            <Image
              src="/host.png"
              alt="Ведуча ефіру"
              fill
              className="object-cover object-[center_30%]"
              quality={90}
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(45,41,38,0.2) 0%, transparent 60%)",
              }}
            />
          </div>

          <div ref={textRef} className="flex flex-col justify-center text-center lg:text-left">
            <span
              className="inline-block text-[10px] md:text-sm tracking-[0.4em] uppercase mb-4"
              style={{ color: "var(--color-gold)", fontWeight: 500 }}
            >
              Ведуча ефіру
            </span>
            <h2
              className="mb-8 font-serif"
              style={{
                fontSize: "clamp(1.8rem, 8vw, 3.5rem)",
                fontWeight: 400,
                lineHeight: 1.1,
                color: "var(--color-charcoal)",
                letterSpacing: "-0.01em",
              }}
            >
              ХТО ПРОВОДИТЬ ЕФІР
            </h2>
            <div className="space-y-6 mb-10 max-w-xl mx-auto lg:mx-0">
              <p
                className="text-sm md:text-lg leading-relaxed opacity-80"
                style={{
                  color: "var(--color-charcoal-light)",
                  fontWeight: 300,
                }}
              >
                Практикуючий психолог з 8+ років досвіду у сфері парних стосунків.
                Провела 500+ консультацій, допомогла сотням пар знайти спільну мову.
              </p>
              <p
                className="text-sm md:text-lg leading-relaxed opacity-80"
                style={{
                  color: "var(--color-charcoal-light)",
                  fontWeight: 300,
                }}
              >
                Спеціалізація: емоційний інтелект, комунікація у парі, відновлення довіри
                та побудова здорових кордонів.
              </p>
            </div>

            <p
              ref={quoteRef}
              className="gradient-wipe-text text-lg md:text-2xl italic leading-relaxed font-serif pt-8 border-t border-gold/20"
              style={{
                fontWeight: 400,
              }}
            >
              &ldquo;Кожна жінка заслуговує на стосунки, де її чують, цінують і
              кохають. Я допоможу тобі створити саме такі.&rdquo;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
