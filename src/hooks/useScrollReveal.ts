"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealOptions {
  y?: number;
  x?: number;
  opacity?: number;
  skewY?: number;
  duration?: number;
  stagger?: number;
  delay?: number;
  ease?: string;
  start?: string;
  once?: boolean;
  children?: boolean;
}

export function useScrollReveal<T extends HTMLElement>(
  options: ScrollRevealOptions = {}
) {
  const ref = useRef<T>(null);
  const {
    y = 40,
    x = 0,
    opacity = 0,
    skewY = 0,
    duration = 0.8,
    stagger = 0.15,
    delay = 0,
    ease = "power3.out",
    start = "top 85%",
    once = true,
    children = false,
  } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = children ? el.children : el;

    gsap.set(targets, {
      y,
      x,
      opacity,
      skewY,
    });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start,
      once,
      onEnter: () => {
        gsap.to(targets, {
          y: 0,
          x: 0,
          opacity: 1,
          skewY: 0,
          duration,
          stagger: children ? stagger : 0,
          delay,
          ease,
          overwrite: true,
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, [y, x, opacity, skewY, duration, stagger, delay, ease, start, once, children]);

  return ref;
}
