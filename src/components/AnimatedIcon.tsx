"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface AnimatedIconProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export default function AnimatedIcon({
  children,
  className = "",
  delay = 0,
}: AnimatedIconProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const paths = el.querySelectorAll("path, line, circle, polyline, polygon");

    paths.forEach((path) => {
      const svgPath = path as SVGGeometryElement;
      if (svgPath.getTotalLength) {
        const length = svgPath.getTotalLength();
        gsap.set(svgPath, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });
      }
    });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(paths, {
          strokeDashoffset: 0,
          duration: 1.2,
          stagger: 0.1,
          delay,
          ease: "power2.inOut",
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, [delay]);

  return (
    <div ref={ref} className={`svg-draw inline-flex ${className}`}>
      {children}
    </div>
  );
}
