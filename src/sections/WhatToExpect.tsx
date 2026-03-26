"use client";

import { LucideIcon, Sparkles, Heart, MessageCircle, ShieldCheck, Zap, Users } from "lucide-react";

const topics = [
  {
    icon: <Sparkles className="w-10 h-10" />,
    title: "Психологія стосунків",
    desc: "Як працює чоловіча психологія і що насправді шукає партнер у шлюбі.",
  },
  {
    icon: <Heart className="w-10 h-10" />,
    title: "Близькість і пристрасть",
    desc: "Повернення щирості, емоційної глибини та сексуальної енергії у пару.",
  },
  {
    icon: <MessageCircle className="w-10 h-10" />,
    title: "Комунікація без сварок",
    desc: "Мистецтво говорити про складне так, щоб тебе чули, а не захищалися.",
  },
  {
    icon: <ShieldCheck className="w-10 h-10" />,
    title: "Межі та повага",
    desc: "Побудова здорових кордонів, які зміцнюють стосунки і твій авторитет.",
  },
  {
    icon: <Zap className="w-10 h-10" />,
    title: "Ресурсність жінки",
    desc: "Як наповнювати себе і бути джерелом натхнення для партнера без виснаження.",
  },
  {
    icon: <Users className="w-10 h-10" />,
    title: "Гармонія в родині",
    desc: "Створення атмосфери підтримки, куди хочеться повертатися щодня.",
  },
];

export default function WhatToExpect() {
  return (
    <section className="section-padding bg-cream relative overflow-hidden" id="what-to-expect">
      {/* Background Accent Gradients */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[radial-gradient(circle_at_100%_0%,rgba(196,149,106,0.03),transparent_60%)] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/3 h-full bg-[radial-gradient(circle_at_0%_100%,rgba(232,196,184,0.03),transparent_60%)] pointer-events-none" />

      <div className="container-custom relative z-10">
        <header className="text-center mb-16 md:mb-24 flex flex-col items-center">
          <span className="inline-block text-[10px] md:text-sm tracking-[0.4em] uppercase mb-6 text-gold font-medium">
            Програма ефіру
          </span>
          <h2 className="heading-serif mb-8 text-charcoal" style={{ fontSize: "clamp(2rem, 8vw, 4.5rem)", lineHeight: 1.1 }}>
            ЩО БУДЕ НА ЕФІРІ
          </h2>
          <div className="w-24 h-px bg-gold/20 mb-8" />
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16">
          {topics.map((topic, i) => (
            <article 
              key={i} 
              className="group flex flex-col gap-10 hover:-translate-y-2 transition-transform duration-500"
            >
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 rounded-[2rem] bg-soft-white flex items-center justify-center text-gold shadow-lg shadow-gold/5 group-hover:scale-105 transition-transform duration-500 border border-gold/5">
                  {topic.icon}
                </div>
                <div className="flex-1 h-[1px] bg-gold/10 hidden md:block" />
              </div>
              
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <span className="text-xs font-serif opacity-30 tracking-[0.3em] uppercase">Крок 0{i+1}</span>
                  <div className="w-8 h-[1px] bg-gold/10" />
                </div>
                <h3 className="text-2xl md:text-3xl font-serif text-charcoal leading-tight">
                  {topic.title}
                </h3>
                <p className="text-lg md:text-xl font-light text-charcoal-light leading-relaxed opacity-80">
                  {topic.desc}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
