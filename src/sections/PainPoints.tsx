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
  /*
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
  */

  return (
    <section className="section-padding bg-soft-white/60 relative overflow-hidden" id="pain-points">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(196,149,106,0.05),transparent_50%)] pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10 px-6 md:px-8">
        <div className="text-center mb-16 md:mb-24">
          <span
            className="inline-block text-[10px] md:text-sm tracking-[0.4em] uppercase mb-4"
            style={{ color: "var(--color-gold)", fontWeight: 500 }}
          >
            Знайоме?
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
            ВПІЗНАЄШ СЕБЕ?
          </h2>
          <p
            className="max-w-2xl mx-auto text-base md:text-xl opacity-80"
            style={{
              color: "var(--color-charcoal-light)",
              fontWeight: 300,
              lineHeight: 1.6,
            }}
          >
            Якщо хоча б один пункт — про тебе, цей ефір створений для тебе
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {painPoints.map((point, i) => (
            <ShineCard
              key={i}
              className="group rounded-3xl p-10 md:p-12 transition-all duration-500 opacity-100 translate-y-0"
              style={{
                background: "rgba(255,255,255,0.85)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(196,149,106,0.1)",
                boxShadow: "0 10px 40px -15px rgba(45,41,38,0.05)",
              }}
            >
              <div 
                className="mb-8 p-4 rounded-2xl inline-block bg-gold/5 transition-colors duration-500"
                style={{ color: "var(--color-gold)" }}
              >
                {point.icon}
              </div>
              <p
                className="text-base md:text-xl leading-relaxed"
                style={{
                  color: "var(--color-charcoal)",
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

