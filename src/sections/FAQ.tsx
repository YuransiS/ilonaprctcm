"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

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

function FAQItem({ item, isOpen, onToggle }: { item: typeof faqData[0], isOpen: boolean, onToggle: () => void }) {
  return (
    <div className="border-b transition-colors duration-300" style={{ borderColor: "rgba(196,149,106,0.15)" }}>
      <button 
        className="w-full flex items-center justify-between py-10 md:py-14 text-left group focus:outline-none"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className="text-xl md:text-3xl pr-10 transition-colors duration-300 font-serif leading-snug text-charcoal" style={{ color: isOpen ? 'var(--color-gold)' : 'var(--color-charcoal)' }}>
          {item.q}
        </span>
        <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center transition-transform duration-500 rounded-full bg-gold/5 group-hover:bg-gold/10" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', color: 'var(--color-gold)' }}>
          {isOpen ? <Minus size={24} /> : <Plus size={24} />}
        </span>
      </button>
      
      <div 
        className="overflow-hidden transition-all duration-500 ease-in-out" 
        style={{ maxHeight: isOpen ? '400px' : '0', opacity: isOpen ? 1 : 0 }}
      >
        <div className="pb-10 md:pb-14 max-w-3xl">
          <p className="text-lg md:text-xl font-light text-charcoal-light leading-relaxed">
            {item.a}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="section-padding bg-soft-white relative" id="faq">
      {/* Background Accent Gradients */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent pointer-events-none" />

      <div className="container-custom relative z-10 max-w-5xl">
        <header className="text-center mb-16 md:mb-24 flex flex-col items-center">
          <span className="inline-block text-[10px] md:text-sm tracking-[0.4em] uppercase mb-6 text-gold font-medium">
            FAQ
          </span>
          <h2 className="heading-serif mb-8 text-charcoal" style={{ fontSize: "clamp(2rem, 8vw, 4.5rem)", lineHeight: 1.1 }}>
            ЧАСТІ ЗАПИТАННЯ
          </h2>
          <div className="w-24 h-px bg-gold/20 mb-8" />
        </header>

        <div className="space-y-4">
          {faqData.map((item, i) => (
            <FAQItem 
              key={i} 
              item={item} 
              isOpen={openIndex === i} 
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
