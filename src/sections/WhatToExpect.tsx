"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import ShineCard from "@/components/ShineCard";

import { Languages, ShieldAlert, Sparkles, Gem, ScrollText } from "lucide-react";

const topics = [
  {
    icon: <Languages size={32} strokeWidth={1.2} />,
    title: "Мова кохання",
    desc: "Як зрозуміти, чого насправді потребує твій чоловік і як говорити його мовою",
  },
  {
    icon: <ShieldAlert size={32} strokeWidth={1.2} />,
    title: "Кордони без конфліктів",
    desc: "Як встановити здорові межі, не руйнуючи стосунки та не відштовхуючи партнера",
  },
  {
    icon: <Sparkles size={32} strokeWidth={1.2} />,
    title: "Емоційна близькість",
    desc: "Практичні техніки для відновлення довіри та глибокого емоційного зв'язку",
  },
  {
    icon: <Gem size={32} strokeWidth={1.2} />,
    title: "Твоя цінність",
    desc: "Як перестати знецінювати себе і стати магнітом для любові та уваги",
  },
  {
    icon: <ScrollText size={32} strokeWidth={1.2} />,
    title: "Сценарії стосунків",
    desc: "Розбір типових помилок та конкретні скрипти для складних розмов з партнером",
  },
];

export default function WhatToExpect() {
  /*
  const headingRef = useScrollReveal<HTMLDivElement>({
    y: 30,
    duration: 0.8,
  });

  const itemsRef = useScrollReveal<HTMLDivElement>({
    y: 50,
    stagger: 0.1,
    duration: 0.8,
    children: true,
    start: "top 85%",
  });
  */

  return (
    <section
      className="section-padding bg-cream relative overflow-hidden"
      id="what-to-expect"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <span
            className="inline-block text-[10px] md:text-sm tracking-[0.4em] uppercase mb-4"
            style={{ color: "var(--color-gold)", fontWeight: 500 }}
          >
            Програма ефіру
          </span>
          <h2
            className="mb-8 font-serif"
            style={{
              fontSize: "clamp(2rem, 8vw, 4rem)",
              fontWeight: 400,
              lineHeight: 1.1,
              color: "var(--color-charcoal)",
            }}
          >
            ЩО БУДЕ НА ЕФІРІ
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {topics.map((topic, i) => (
            <ShineCard
              key={i}
              className="group rounded-3xl p-10 md:p-12 flex flex-col gap-8 transition-all duration-700 opacity-100 translate-y-0"
              style={{
                background: "rgba(255,255,255,0.9)",
                backdropFilter: "blur(30px)",
                border: "1px solid rgba(196,149,106,0.1)",
                boxShadow: "0 20px 60px -20px rgba(45,41,38,0.05)",
              }}
            >
              <div 
                className="flex-shrink-0 w-20 h-20 rounded-3xl flex items-center justify-center transition-all duration-700 shadow-lg"
                style={{ 
                  background: "linear-gradient(135deg, var(--color-powder) 0%, var(--color-blush) 100%)", 
                  color: "var(--color-gold-dark)",
                }}
              >
                <div className="relative z-10">{topic.icon}</div>
              </div>
              <div className="flex-1 w-full">
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-[10px] md:text-xs font-serif opacity-40 tracking-widest uppercase">Крок 0{i+1}</span>
                  <div className="h-px flex-1 bg-gold/10" />
                </div>
                <h3
                  className="text-2xl md:text-3xl mb-4 font-normal font-serif min-h-[1.5em]"
                  style={{ color: "var(--color-charcoal)", letterSpacing: "-0.01em", lineHeight: 1.2 }}
                >
                  {topic.title}
                </h3>
                <p
                  className="text-base md:text-lg leading-relaxed opacity-80"
                  style={{
                    color: "var(--color-charcoal-light)",
                    fontWeight: 300,
                  }}
                >
                  {topic.desc}
                </p>
              </div>
            </ShineCard>
          ))}
        </div>
      </div>
    </section>
  );
}

