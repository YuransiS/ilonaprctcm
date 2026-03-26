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

  return (
    <section
      className="section-padding bg-cream relative overflow-hidden"
      id="what-to-expect"
    >
      <div className="max-w-4xl mx-auto px-6 md:px-8 relative z-10">
        <div ref={headingRef} className="text-center mb-16 md:mb-20">
          <span
            className="inline-block text-[10px] md:text-xs tracking-[0.4em] uppercase mb-4"
            style={{ color: "var(--color-gold)", fontWeight: 500 }}
          >
            Програма ефіру
          </span>
          <h2
            className="mb-6 font-serif"
            style={{
              fontSize: "clamp(1.8rem, 8vw, 3.5rem)",
              fontWeight: 400,
              lineHeight: 1.1,
              color: "var(--color-charcoal)",
            }}
          >
            ЩО БУДЕ НА ЕФІРІ
          </h2>
        </div>

        <div ref={itemsRef} className="space-y-8">
          {topics.map((topic, i) => (
            <ShineCard
              key={i}
              className="group rounded-[2rem] md:rounded-[2.5rem] p-6 pt-10 md:p-12 flex flex-col md:flex-row gap-6 md:gap-10 items-start md:items-center transition-all duration-700 hover:scale-[1.02] relative mt-8 md:mt-0"
              style={{
                background: "rgba(255,255,255,0.8)",
                backdropFilter: "blur(30px)",
                border: "1px solid rgba(196,149,106,0.1)",
                boxShadow: "0 20px 60px -20px rgba(45,41,38,0.05)",
              }}
            >
              <div 
                className="flex-shrink-0 w-16 h-16 md:w-24 md:h-24 rounded-2xl md:rounded-3xl flex items-center justify-center transition-all duration-700 group-hover:rotate-12 group-hover:scale-110 shadow-lg absolute md:relative -top-8 left-6 md:top-0 md:left-0"
                style={{ 
                  background: "linear-gradient(135deg, var(--color-powder) 0%, var(--color-blush) 100%)", 
                  color: "var(--color-gold-dark)",
                }}
              >
                <div className="absolute inset-0 bg-[rgba(255,255,255,0.4)] rounded-[inherit] blur-md group-hover:blur-xl transition-all" />
                <div className="relative z-10 scale-75 md:scale-100">{topic.icon}</div>
              </div>
              <div className="flex-1 w-full pt-4 md:pt-0">
                <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                  <span className="text-[10px] md:text-sm font-serif opacity-40 tracking-widest uppercase">Крок 0{i+1}</span>
                  <div className="h-px flex-1 bg-gold/10" />
                </div>
                <h3
                  className="text-xl md:text-3xl mb-2 md:mb-4 font-normal font-serif"
                  style={{ color: "var(--color-charcoal)", letterSpacing: "-0.01em" }}
                >
                  {topic.title}
                </h3>
                <p
                  className="text-sm md:text-xl leading-relaxed opacity-70"
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

