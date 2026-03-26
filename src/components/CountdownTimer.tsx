"use client";

import { useState, useEffect, useCallback } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownTimer({ targetDate }: { targetDate: Date }) {
  const calculateTimeLeft = useCallback(() => {
    const difference = +targetDate - +new Date();
    let timeLeft: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  }, [targetDate]);

  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  if (!isMounted || !timeLeft) {
    return (
      <div className="flex justify-center items-center gap-4 md:gap-10 opacity-20 animate-pulse">
        {["Днів", "Годин", "Хвилин", "Секунд"].map((label) => (
          <div key={label} className="flex flex-col items-center gap-4">
            <div className="w-20 md:w-32 h-20 md:h-32 bg-gold/10 rounded-3xl" />
            <div className="w-12 h-4 bg-gold/10 rounded-full" />
          </div>
        ))}
      </div>
    );
  }

  const items = [
    { label: "Днів", value: timeLeft.days },
    { label: "Годин", value: timeLeft.hours },
    { label: "Хвилин", value: timeLeft.minutes },
    { label: "Секунд", value: timeLeft.seconds },
  ];

  return (
    <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 w-full py-8">
      {items.map((item, idx) => (
        <div key={idx} className="flex flex-col items-center justify-center gap-6">
          <div 
            className="flex items-center justify-center font-serif text-charcoal leading-none p-4 md:p-8 min-w-[100px] md:min-w-[150px] bg-white rounded-[2rem] border border-gold/10 shadow-lg shadow-gold/5" 
            style={{ fontSize: "clamp(2rem, 6vw, 4.5rem)" }}
          >
            {item.value.toString().padStart(2, "0")}
          </div>
          <span className="text-xs md:text-sm tracking-[0.4em] uppercase font-bold text-gold opacity-80">
            {item.label}
          </span>
         
        </div>
      ))}
    </div>
  );
}
