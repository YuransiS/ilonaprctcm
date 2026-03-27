"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function PageLoader() {
  const loaderRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const loader = loaderRef.current;
    if (!loader) return;

    // Prevent scrolling during load
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      delay: 0.5,
      onComplete: () => {
        setDone(true);
        document.body.style.overflow = "";
      },
    });

    tl.to(loader, {
      yPercent: -100,
      duration: 1.2,
      ease: "power4.inOut",
    });

    return () => {
      tl.kill();
      document.body.style.overflow = "";
    };
  }, []);

  if (done) return null;

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[9999] bg-cream flex items-center justify-center"
    >
      <div className="flex flex-col items-center gap-6">
        <div className="w-16 h-px bg-gold/30 animate-pulse" />
        <span className="text-[10px] tracking-[0.4em] uppercase text-gold font-bold">
          Ilona Broadcast
        </span>
        <div className="w-16 h-px bg-gold/30 animate-pulse" />
      </div>
    </div>
  );
}
