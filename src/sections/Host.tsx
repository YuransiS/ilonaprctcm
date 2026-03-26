"use client";

import Image from "next/image";

export default function Host() {
  return (
    <section className="section-padding bg-soft-white relative overflow-hidden" id="host">
      {/* Background Accent Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_100%,rgba(196,149,106,0.03),transparent_60%)] pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-center">
          
          {/* Image Column */}
          <div className="relative group mx-auto w-full max-w-[550px]">
            <div className="relative z-10 aspect-[3/4] rounded-[3rem] overflow-hidden shadow-2xl shadow-charcoal/10 border border-gold/5">
              <Image
                src="/host.png"
                alt="Ведуча ефіру"
                fill
                className="object-cover object-[center_20%] group-hover:scale-105 transition-transform duration-1000 ease-out"
                quality={90}
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div
                className="absolute inset-0 z-1"
                style={{
                  background: "linear-gradient(to top, rgba(45,41,38,0.2) 0%, transparent 60%)",
                }}
              />
            </div>
            {/* Decorative Frame Elements */}
            <div className="absolute -inset-8 md:-inset-12 border border-gold/10 rounded-[4rem] pointer-events-none -rotate-1 group-hover:rotate-0 transition-transform duration-700" />
            <div className="absolute -inset-10 md:-inset-16 border border-gold/5 rounded-[5rem] pointer-events-none rotate-2 group-hover:rotate-0 transition-transform duration-1000" />
          </div>

          {/* Text Content Column */}
          <div className="flex flex-col text-center lg:text-left pt-10 lg:pt-0">
            <span className="inline-block text-[10px] md:text-sm tracking-[0.4em] uppercase mb-10 text-gold font-semibold">
              Ведуча ефіру
            </span>

            <h2 className="heading-serif mb-12 text-charcoal" style={{ fontSize: "clamp(2rem, 8vw, 4.5rem)", lineHeight: 1.1 }}>
              ХТО ПРОВОДИТЬ ЕФІР
            </h2>

            <div className="space-y-10 mb-16 max-w-2xl mx-auto lg:mx-0">
              <div className="flex flex-col gap-6">
                <p className="text-xl md:text-2xl font-light text-charcoal-light leading-relaxed">
                  Практикуючий психолог з 8+ роками досвіду у сфері парних стосунків. Провела понад 500 консультацій, допомогла сотням пар відновити гармонію.
                </p>
                <div className="w-16 h-px bg-gold/20 mx-auto lg:mx-0" />
                <p className="text-lg md:text-xl font-light text-charcoal-light leading-relaxed opacity-80">
                  Спеціалізація: емоційний інтелект, психологія чоловіків, відновлення довіри та побудова здорової комунікації.
                </p>
              </div>
            </div>

            <div className="relative pt-10 border-t border-gold/10">
              <p className="font-serif italic text-2xl md:text-3xl lg:text-4xl text-charcoal leading-relaxed">
                &ldquo;Кожна жінка заслуговує бути коханою, почутою та щасливою у своїх стосунках.&rdquo;
              </p>
              <div className="mt-8 flex items-center justify-center lg:justify-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gold/10" />
                <span className="text-sm tracking-widest uppercase text-gold font-bold">Ілона</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
