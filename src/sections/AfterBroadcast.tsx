"use client";

import { CheckCircle } from "lucide-react";

const results = [
  {
    title: "Впевненість",
    desc: "Зрозумієш свою цінність та як правильно висловлювати свої потреби",
  },
  {
    title: "Комунікація",
    desc: "Отримаєш готові інструменти для діалогу без сварок та звинувачень",
  },
  {
    title: "Розуміння",
    desc: "Дізнаєшся, що насправді думають та відчувають чоловіки",
  },
  {
    title: "Гармонія",
    desc: "Зможеш почати відновлення теплоти та близькості у парі",
  },
  {
    title: "Сексуальність",
    desc: "Повернеш яскравість та пристрасть у ваші стосунки",
  },
  {
    title: "Межі",
    desc: "Навчишся захищати свій простір, не відштовхуючи партнера",
  },
];

export default function AfterBroadcast() {
  return (
    <section className="section-padding bg-cream relative" id="after-broadcast">
      {/* Subtle Background Accent */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(232,196,184,0.05),transparent_60%)] pointer-events-none" />

      <div className="container-custom relative z-10">
        <header className="text-center mb-16 md:mb-24 flex flex-col items-center">
          <span className="inline-block text-[10px] md:text-sm tracking-[0.4em] uppercase mb-6 text-gold font-medium">
            Результат
          </span>
          <h2 className="heading-serif mb-8 text-charcoal" style={{ fontSize: "clamp(2rem, 8vw, 4.5rem)", lineHeight: 1.1 }}>
            ПІСЛЯ ЕФІРУ ТИ
          </h2>
          <div className="w-24 h-px bg-gold/30 mb-8" />
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {results.map((result, i) => (
            <div 
              key={i} 
              className="group bg-white rounded-[2.5rem] p-10 md:p-14 border border-gold/5 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 flex flex-col gap-8"
            >
              <div className="flex items-center gap-6">
                 <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gold/5 flex items-center justify-center text-gold group-hover:bg-gold/10 transition-colors">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-serif text-charcoal">
                  {result.title}
                </h3>
              </div>
              <p className="text-lg md:text-xl font-light text-charcoal-light leading-relaxed opacity-80">
                {result.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
