"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import CountdownTimer from "@/components/CountdownTimer";
import MagneticButton from "@/components/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

const TARGET_DATE = new Date("2026-04-15T19:00:00+02:00");

const headlineWords = ["ХОЧЕШ", "ВІД", "ЧОЛОВІКА", "БІЛЬШЕ?"];
const subWords = [
  "Безкоштовний",
  "ефір",
  "про",
  "стосунки,",
  "які",
  "змінять",
  "твоє",
  "життя",
];

const wordVariants = {
  hidden: { y: "100%", opacity: 0 },
  visible: (i: number) => ({
    y: "0%",
    opacity: 1,
    transition: {
      type: "spring" as const,
      damping: 20,
      stiffness: 100,
      delay: 0.8 + i * 0.08,
    },
  }),
};

const subWordVariants = {
  hidden: { y: "100%", opacity: 0 },
  visible: (i: number) => ({
    y: "0%",
    opacity: 1,
    transition: {
      type: "spring" as const,
      damping: 22,
      stiffness: 80,
      delay: 1.4 + i * 0.05,
    },
  }),
};

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  /*
  useEffect(() => {
    if (!imageRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: heroRef.current,
      start: "top top",
      end: "bottom top",
      scrub: 1,
      onUpdate: (self) => {
        if (imageRef.current) {
          gsap.set(imageRef.current, {
            y: self.progress * 150,
          });
        }
      },
    });

    return () => trigger.kill();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const animate = () => {
      time += 0.01;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < 3; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = Math.random() * 1.5;
        const alpha = Math.random() * 0.03;
        ctx.fillStyle = `rgba(45, 41, 38, ${alpha})`;
        ctx.fillRect(x, y, size, size);
      }

      const grd = ctx.createRadialGradient(
        canvas.width / 2 + Math.sin(time) * 30,
        canvas.height / 2 + Math.cos(time * 0.7) * 20,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width * 0.6
      );
      grd.addColorStop(0, "rgba(196, 149, 106, 0.02)");
      grd.addColorStop(0.5, "rgba(232, 196, 184, 0.01)");
      grd.addColorStop(1, "transparent");
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);
  */

  return (
    <section
      ref={heroRef}
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden"
      id="hero"
    >
      <div
        ref={imageRef}
        className="absolute inset-0"
        style={{ top: "0" }}
      >
        <Image
          src="/hero.png"
          alt="Hero background"
          fill
          className="object-cover object-top brightness-[0.95]"
          quality={90}
          priority
          sizes="100vw"
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(45,41,38,0.2) 0%, rgba(255,248,240,0.4) 30%, rgba(255,248,240,0.95) 70%, var(--color-cream) 100%)",
          }}
        />
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none hidden"
          style={{ mixBlendMode: "overlay", opacity: 0.3 }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 w-full max-w-7xl mx-auto min-h-[100dvh] pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="w-full flex flex-col items-center justify-center">
          <div
            className="mb-8 md:mb-10 opacity-100"
          >
            <span
              className="inline-block text-[10px] md:text-sm tracking-[0.4em] uppercase px-4 py-2 rounded-full bg-gold/10 backdrop-blur-sm border border-gold/10"
              style={{ color: "var(--color-gold-dark)", fontWeight: 600 }}
            >
              Безкоштовний онлайн ефір
            </span>
          </div>

          <h1
            className="flex flex-wrap justify-center gap-x-3 md:gap-x-5 gap-y-2 md:gap-y-4 mb-8 md:mb-12 w-full max-w-5xl"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2.5rem, 8vw, 6rem)",
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: "-0.01em",
              color: "var(--color-charcoal)",
              textShadow: "0 10px 30px rgba(0,0,0,0.03)",
            }}
          >
            {headlineWords.map((word, i) => (
              <span key={i} className="py-2 opacity-100 translate-y-0">
                {word}
              </span>
            ))}
          </h1>

          <div className="flex flex-col items-center text-center gap-1 md:gap-2 mb-12 md:mb-16 max-w-3xl px-4">
            <p
              className="text-lg md:text-3xl opacity-100 translate-y-0"
              style={{
                color: "var(--color-charcoal)",
                fontWeight: 300,
                lineHeight: 1.4,
              }}
            >
              Безкоштовний ефір про стосунки, які змінять твоє життя
            </p>
          </div>

          <div className="w-full flex flex-col items-center gap-12 md:gap-24">
            <div
              className="w-full max-w-3xl opacity-100 scale-100"
            >
              <CountdownTimer targetDate={TARGET_DATE} />
            </div>

            <div
              className="w-full flex justify-center pb-12 opacity-100 translate-y-0"
            >
              <MagneticButton
                href="#"
                className="group relative w-fit"
              >
                <div
                  className="absolute -inset-8 bg-gold/25 rounded-full blur-3xl opacity-100 group-hover:opacity-100 transition-opacity duration-1000"
                />
                <span
                  className="relative inline-block px-10 py-5 md:px-20 md:py-8 rounded-full text-xs md:text-xl tracking-[0.2em] md:tracking-[0.25em] uppercase font-bold shadow-2xl"
                  style={{
                    background: "linear-gradient(135deg, var(--color-gold) 0%, var(--color-gold-dark) 100%)",
                    color: "#fff",
                    boxShadow: "0 20px 50px -15px rgba(196, 149, 106, 0.6)",
                  }}
                >
                  Забронювати місце
                </span>
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>



    </section>
  );
}
