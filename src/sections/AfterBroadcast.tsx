"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import AnimatedIcon from "@/components/AnimatedIcon";

import { ShieldCheck, MessageCircleHeart, Users, CheckCircle2, HeartHandshake, Lightbulb } from "lucide-react";

const results = [
  {
    text: "Зрозумієш, як будувати стосунки без маніпуляцій",
    icon: <ShieldCheck size={32} strokeWidth={1.2} />,
  },
  {
    text: "Навчишся говорити про свої потреби так, щоб тебе чули",
    icon: <MessageCircleHeart size={32} strokeWidth={1.2} />,
  },
  {
    text: "Перестанеш сумніватися у своїй цінності",
    icon: <Users size={32} strokeWidth={1.2} />,
  },
  {
    text: "Отримаєш конкретні інструменти для щоденного спілкування",
    icon: <CheckCircle2 size={32} strokeWidth={1.2} />,
  },
  {
    text: "Відчуєш, що заслуговуєш на кохання та повагу",
    icon: <HeartHandshake size={32} strokeWidth={1.2} />,
  },
  {
    text: "Зрозумієш першопричини ваших конфліктів та як їх вирішити",
    icon: <Lightbulb size={32} strokeWidth={1.2} />,
  },
];


export default function AfterBroadcast() {
  const headingRef = useScrollReveal<HTMLDivElement>({
    y: 30,
    duration: 0.6,
  });

  const itemsRef = useScrollReveal<HTMLDivElement>({
    y: 40,
    stagger: 0.12,
    duration: 0.7,
    children: true,
    start: "top 80%",
  });

  return (
    <section
      className="section-padding bg-soft-white/30 relative overflow-hidden"
      id="after-broadcast"
    >
      <div className="max-w-4xl mx-auto px-6 md:px-8 relative z-10">
        <div ref={headingRef} className="text-center mb-16 md:mb-20">
          <span
            className="inline-block text-[10px] md:text-xs tracking-[0.4em] uppercase mb-4"
            style={{ color: "var(--color-gold)", fontWeight: 500 }}
          >
            Результат
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
            ПІСЛЯ ЕФІРУ ТИ
          </h2>
        </div>

        <div ref={itemsRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          {results.map((result, i) => (
            <div
              key={i}
              className="group flex flex-col items-center text-center md:items-start md:text-left gap-6 p-8 md:p-10 rounded-[2rem] transition-all duration-500 hover:-translate-y-2 overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.4)",
                border: "1px solid rgba(196,149,106,0.1)",
                backdropFilter: "blur(10px)",
              }}
            >
              <div 
                className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:bg-gold/10"
                style={{ color: "var(--color-gold-dark)", background: "rgba(196,149,106,0.05)" }}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gold/5 blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                  <AnimatedIcon delay={i * 0.1} className="relative z-10">
                    {result.icon}
                  </AnimatedIcon>
                </div>
              </div>
              <p
                className="text-base md:text-xl leading-relaxed opacity-80"
                style={{
                  color: "var(--color-charcoal-light)",
                  fontWeight: 400,
                }}
              >
                {result.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>

  );
}
