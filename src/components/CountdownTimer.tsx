"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface CountdownTimerProps {
  targetDate: Date;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

import { motion, AnimatePresence } from "framer-motion";

function SlotDigit({ value, label }: { value: number; label: string }) {
  const digits = String(value).padStart(2, "0");

  return (
    <div className="flex flex-col items-center flex-1 min-w-0">
      <div className="relative overflow-hidden bg-white/10 backdrop-blur-xl rounded-xl md:rounded-2xl px-1 py-3 md:px-6 md:py-6 shadow-[0_8px_32px_rgba(0,0,0,0.1)] border border-white/20 w-full flex justify-center group/slot">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover/slot:opacity-100 transition-opacity duration-700" />
        <div className="flex relative z-10 font-serif leading-none" style={{ fontSize: "clamp(1.5rem, 5vw, 3.5rem)" }}>
          {digits.split("").map((digit, i) => (
            <div key={i} className="relative w-[0.6em] h-[1.2em] flex items-center justify-center overflow-hidden">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={digit}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: "-100%", opacity: 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute"
                >
                  {digit}
                </motion.span>
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
      <span
        className="mt-3 text-[10px] md:text-sm tracking-[0.25em] uppercase pointer-events-none font-medium opacity-50 truncate"
        style={{ color: "var(--color-charcoal)" }}
      >
        {label}
      </span>
    </div>
  );
}


export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const calcTimeLeft = useCallback((): TimeLeft => {
    const diff = targetDate.getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / 1000 / 60) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  }, [targetDate]);

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setTimeLeft(calcTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calcTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [calcTimeLeft]);

  if (!isClient) {
    return (
      <div className="flex items-center gap-2 md:gap-5 w-full max-w-[500px] mx-auto opacity-0 translate-y-4">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="flex-1 h-24 bg-white/10 rounded-[1.5rem] animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between gap-1 md:gap-6 w-full max-w-[550px] mx-auto overflow-visible px-1 md:px-2">
      <SlotDigit value={timeLeft.days} label="Днів" />
      <span
        className="hidden md:block text-2xl md:text-4xl font-serif mb-auto mt-6 opacity-30 animate-pulse"
        style={{ color: "var(--color-gold-dark)" }}
      >
        ·
      </span>
      <SlotDigit value={timeLeft.hours} label="Годин" />
      <span
        className="hidden md:block text-2xl md:text-4xl font-serif mb-auto mt-6 opacity-30 animate-pulse"
        style={{ color: "var(--color-gold-dark)" }}
      >
        ·
      </span>
      <SlotDigit value={timeLeft.minutes} label="Хвилин" />
      <span
        className="hidden md:block text-2xl md:text-4xl font-serif mb-auto mt-6 opacity-30 animate-pulse"
        style={{ color: "var(--color-gold-dark)" }}
      >
        ·
      </span>
      <SlotDigit value={timeLeft.seconds} label="Секунд" />
    </div>
  );
}

