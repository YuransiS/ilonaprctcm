"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import MagneticButton from "@/components/MagneticButton";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as any,
      },
    },
  };

  return (
    <section ref={containerRef} className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden" id="hero">
      {/* Background Image Container */}
      <div ref={imageRef} className="absolute inset-0 z-0 scale-110">
        <Image
          src="/host.png"
          alt="Hero background"
          fill
          className="object-cover object-top brightness-[0.95]"
          priority
          sizes="100vw"
        />
        {/* Gradient Overlay for Readability */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, rgba(45,41,38,0.1) 0%, rgba(232,196,184,0.1) 40%, rgba(255,248,240,0.3) 70%, var(--color-cream) 100%)",
          }}
        />
      </div>

      {/* Top Badge */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute top-10 md:top-14 left-1/2 -translate-x-1/2 z-20 w-full flex justify-center px-4"
      >
        <span className="inline-block text-[10px] md:text-sm tracking-[0.4em] uppercase px-5 py-2 rounded-full bg-white/60 backdrop-blur-md border border-gold/20 text-gold-dark font-bold shadow-sm whitespace-nowrap">
          Безкоштовний онлайн ефір
        </span>
      </motion.div>

      {/* Content */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container-custom relative z-10 flex flex-col items-center justify-end text-center pt-20 pb-4 md:pb-20 min-h-[100dvh]"
      >
        
        {/* White glow behind text area for readability */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-x-0 bottom-0 top-[35%] pointer-events-none z-0 bg-[radial-gradient(circle_at_50%_90%,rgba(255,248,240,0.95)_0%,rgba(255,248,240,0.6)_40%,transparent_100%)]" 
        />

        <div className="w-full max-w-5xl flex flex-col items-center relative z-10">
          <div className="flex flex-col items-center mb-4 md:mb-12 px-4 py-8 rounded-[2.5rem]">
            
            {/* Badge removed from here */}

            <motion.h1 
              variants={itemVariants} 
              className="heading-serif mb-6 md:mb-12 text-charcoal uppercase" 
              style={{ fontSize: "clamp(1.3rem, 6.5vw, 4rem)", lineHeight: 1.2, letterSpacing: "-0.01em" }}
            >
              ХОЧЕШ ВІД ЧОЛОВІКА ПОДАРУНКИ І УВАГУ, АЛЕ ВІН НІЧОГО НЕ РОБИТЬ - ЯК ПРАВИЛЬНО З НИМ КОМУНІКУВАТИ, ЩОБ ОТРИМУВАТИ БАЖАНЕ
            </motion.h1>

            <motion.div variants={itemVariants} className="mb-6 md:mb-12 max-w-4xl">
              <motion.h2 className="text-xl md:text-3xl font-light text-charcoal-light leading-relaxed">
                Приєднуйся до безкоштовного ефіру про стосунки <br className="hidden md:block" /> які змінять твоє життя назавжди
              </motion.h2>
            </motion.div>

            <motion.div variants={itemVariants} className="w-full flex flex-col items-center gap-6 md:gap-16">
              <div className="flex flex-col items-center">
                <span className="text-xl md:text-3xl font-serif text-charcoal-light tracking-wide italic">
                  29 березня о 14:00
                </span>
                <div className="w-12 h-px bg-gold/30 mt-4" />
              </div>

              <div className="flex justify-center w-full px-2">
                <MagneticButton href="#" className="btn-primary w-full md:w-fit shadow-[0_20px_60px_-15px_rgba(196,149,106,0.6)]">
                  Забронювати місце
                </MagneticButton>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
