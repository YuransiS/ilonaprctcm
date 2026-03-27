"use client";

import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

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
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-[10px] md:text-sm tracking-[0.4em] uppercase mb-6 text-gold font-medium"
          >
            Знайоме?
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="heading-serif mb-8 text-charcoal" 
            style={{ fontSize: "clamp(2rem, 8vw, 4.5rem)", lineHeight: 1.1 }}
          >
            ВПІЗНАЄШ СЕБЕ?
          </motion.h2>
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="w-24 h-px bg-gold/30 mb-8" 
          />
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="max-w-2xl text-lg md:text-2xl font-light text-charcoal-light leading-relaxed"
          >
            Якщо хоча б один пункт — про тебе, цей ефір створений саме для тебе
          </motion.p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {painPoints.map((point, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="group bg-white rounded-[2.5rem] p-10 md:p-14 border border-gold/5 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 flex flex-col gap-10"
            >
              <div className="w-16 h-16 rounded-3xl bg-gold/10 flex items-center justify-center text-gold transition-all duration-500 group-hover:bg-gold group-hover:text-white group-hover:scale-110">
                {point.icon}
              </div>
              <p className="text-xl md:text-2xl font-light text-charcoal leading-relaxed">
                {point.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
