"use client";

import { CheckCircle } from "lucide-react";

const painPoints = [
  {
    icon: <CheckCircle className="w-8 h-8" />,
    text: "Відчуваєш, що твій партнер тебе не чує і не розуміє твоїх потреб",
  },
  {
    icon: <CheckCircle className="w-8 h-8" />,
    text: "Втомилася від постійних конфліктів через дрібниці, які не вирішуються",
  },
  {
    icon: <CheckCircle className="w-8 h-8" />,
    text: "Тобі не вистачає уваги, компліментів та вдячності від чоловіка",
  },
  {
    icon: <CheckCircle className="w-8 h-8" />,
    text: "Відчуваєш емоційне відсторонення і холод у стосунках останнім часом",
  },
  {
    icon: <CheckCircle className="w-8 h-8" />,
    text: "Боїшся висловлювати свої бажання, щоб не спровокувати чергову сварку",
  },
  {
    icon: <CheckCircle className="w-8 h-8" />,
    text: "Маєш відчуття, що ви просто сусіди, а була пристрасть і близькість",
  },
];

export default function PainPoints() {
  return (
    <section className="section-padding bg-soft-white relative" id="pain-points">
      {/* Subtle Background Accent */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(196,149,106,0.05),transparent_60%)] pointer-events-none" />

      <div className="container-custom relative z-10">
        <header className="text-center mb-16 md:mb-24 flex flex-col items-center">
          <span className="inline-block text-[10px] md:text-sm tracking-[0.4em] uppercase mb-6 text-gold font-medium">
            Знайоме?
          </span>
          <h2 className="heading-serif mb-8 text-charcoal" style={{ fontSize: "clamp(2rem, 8vw, 4.5rem)", lineHeight: 1.1 }}>
            ВПІЗНАЄШ СЕБЕ?
          </h2>
          <div className="w-24 h-px bg-gold/30 mb-8" />
          <p className="max-w-2xl text-lg md:text-2xl font-light text-charcoal-light leading-relaxed">
            Якщо хоча б один пункт — про тебе, цей ефір створений саме для тебе
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {painPoints.map((point, i) => (
            <div 
              key={i} 
              className="group bg-white rounded-[2.5rem] p-10 md:p-14 border border-gold/5 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 flex flex-col gap-10"
            >
              <div className="w-16 h-16 rounded-3xl bg-gold/10 flex items-center justify-center text-gold transition-all duration-500 group-hover:bg-gold group-hover:text-white group-hover:scale-110">
                {point.icon}
              </div>
              <p className="text-xl md:text-2xl font-light text-charcoal leading-relaxed">
                {point.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
