"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import ShineCard from "@/components/ShineCard";

import { HeartOff, MessageSquareText, Zap, Moon, UserX, Repeat } from "lucide-react";

const painPoints = [
  {
    icon: <HeartOff size={28} strokeWidth={1.5} />,
    text: "Відчуваєш, що віддаєш більше, ніж отримуєш у стосунках",
  },
  {
    icon: <MessageSquareText size={28} strokeWidth={1.5} />,
    text: "Постійно аналізуєте його повідомлення та поведінку",
  },
  {
    icon: <Zap size={28} strokeWidth={1.5} />,
    text: "Злишся, коли він не розуміє, чого ти хочеш",
  },
  {
    icon: <Moon size={28} strokeWidth={1.5} />,
    text: "Боїшся висловити свої справжні потреби та бажання",
  },
  {
    icon: <UserX size={28} strokeWidth={1.5} />,
    text: "Відчуваєш себе самотньою, навіть коли ви разом",
  },
  {
    icon: <Repeat size={28} strokeWidth={1.5} />,
    text: "Знову і знову потрапляєте в один і той самий сценарій",
  },
];

export default function PainPoints() {
  const sectionRef = useScrollReveal<HTMLDivElement>({
    y: 30,
    duration: 0.8,
  });

  const cardsRef = useScrollReveal<HTMLDivElement>({
    y: 40,
    stagger: 0.1,
    duration: 0.8,
    children: true,
    start: "top 85%",
  });

  return (
    <section className="section-padding bg-soft-white/60 relative overflow-hidden" id="pain-points">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(196,149,106,0.05),transparent_50%)]" />
      <div className="max-w-5xl mx-auto relative z-10 px-6 md:px-8">
        <div ref={sectionRef} className="text-center mb-12 md:mb-20">
          <span
            className="inline-block text-[10px] md:text-xs tracking-[0.4em] uppercase mb-2 md:mb-4"
            style={{ color: "var(--color-gold)", fontWeight: 500 }}
          >
            Знайоме?
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
            ВПІЗНАЄШ СЕБЕ?
          </h2>
          <p
            className="max-w-md mx-auto text-sm md:text-lg opacity-70"
            style={{
              color: "var(--color-warm-gray)",
              fontWeight: 300,
              lineHeight: 1.6,
            }}
          >
            Якщо хоча б один пункт — про тебе, цей ефір створений для тебе
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 lg:gap-10">
          {painPoints.map((point, i) => (
            <ShineCard
              key={i}
              className="group rounded-[2rem] p-8 md:p-10 transition-all duration-500 hover:-translate-y-2"
              style={{
                background: "rgba(255,255,255,0.7)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(196,149,106,0.1)",
                boxShadow: "0 10px 40px -15px rgba(45,41,38,0.05)",
              }}
            >
              <div 
                className="mb-6 p-3 rounded-2xl inline-block transition-colors duration-500 group-hover:bg-gold/10"
                style={{ color: "var(--color-gold)" }}
              >
                {point.icon}
              </div>
              <p
                className="text-base md:text-lg leading-relaxed"
                style={{
                  color: "var(--color-charcoal-light)",
                  fontWeight: 400,
                }}
              >
                {point.text}
              </p>
            </ShineCard>
          ))}
        </div>
      </div>
    </section>

  );
}

