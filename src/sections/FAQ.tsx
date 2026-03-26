"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const faqData = [
  {
    q: "Скільки коштує участь?",
    a: "Ефір абсолютно безкоштовний. Ми хочемо, щоб якомога більше жінок отримали ці знання та змогли покращити свої стосунки.",
  },
  {
    q: "Чи потрібна попередня підготовка?",
    a: "Ні, жодної підготовки не потрібно. Просто приходь з відкритим серцем і готовністю дізнатися щось нове про себе та свої стосунки.",
  },
  {
    q: "Чи буде запис ефіру?",
    a: "Запис буде доступний обмежений час після ефіру. Проте найбільшу користь ти отримаєш від живої участі, де зможеш задати питання в реальному часі.",
  },
  {
    q: "Для кого цей ефір?",
    a: "Для будь-якої жінки, яка хоче покращити свої стосунки — незалежно від того, чи ти у парі, чи шукаєш партнера. Інструменти працюють у будь-якій ситуації.",
  },
  {
    q: "Скільки триватиме ефір?",
    a: "Орієнтовна тривалість — 1.5-2 години, включаючи сесію запитань та відповідей наприкінці.",
  },
  {
    q: "Як підключитися до ефіру?",
    a: "Після реєстрації ти отримаєш посилання на ефір. За 30 хвилин до початку ми надішлемо нагадування з усіма деталями.",
  },
];

import { Plus, Minus } from "lucide-react";

function FAQItem({
  item,
  isOpen,
  onToggle,
  index,
}: {
  item: (typeof faqData)[0];
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [isOpen]);

  return (
    <div
      className="border-b transition-colors duration-300"
      style={{ borderColor: "rgba(196,149,106,0.1)" }}
    >
      <button
        className="w-full flex items-center justify-between py-6 md:py-10 text-left group focus:outline-none"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span
          className="text-lg md:text-xl pr-8 transition-colors duration-300"
          style={{
            color: isOpen
              ? "var(--color-charcoal)"
              : "var(--color-charcoal-light)",
            fontWeight: isOpen ? 500 : 400,
          }}
        >
          {item.q}
        </span>
        <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center transition-transform duration-500" style={{ color: "var(--color-gold)", transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
          {isOpen ? <Minus size={24} strokeWidth={1.5} /> : <Plus size={24} strokeWidth={1.5} />}
        </span>
      </button>

      <motion.div
        className="faq-content"
        initial={false}
        animate={{
          height: isOpen ? height : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{
          height: {
            duration: 0.4,
            ease: [0.76, 0, 0.24, 1],
          },
          opacity: {
            duration: 0.25,
            delay: isOpen ? 0.1 : 0,
          },
        }}
      >
        <div ref={contentRef} className="pb-6 md:pb-7">
          <p
            className="text-sm md:text-base leading-relaxed max-w-2xl"
            style={{
              color: "var(--color-warm-gray)",
              fontWeight: 300,
            }}
          >
            {item.a}
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  /*
  const headingRef = useScrollReveal<HTMLDivElement>({
    y: 30,
    duration: 0.6,
  });

  const listRef = useScrollReveal<HTMLDivElement>({
    y: 30,
    duration: 0.7,
    start: "top 80%",
  });
  */

  return (
    <section className="section-padding bg-white relative overflow-hidden" id="faq">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <span
            className="inline-block text-[10px] md:text-xs tracking-[0.4em] uppercase mb-4"
            style={{ color: "var(--color-gold)", fontWeight: 500 }}
          >
            FAQ
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
            ЧАСТІ ЗАПИТАННЯ
          </h2>
        </div>

        <div
          className="border-t"
          style={{ borderColor: "rgba(196,149,106,0.1)" }}
        >
          {faqData.map((item, i) => (
            <FAQItem
              key={i}
              item={item}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>

  );
}
