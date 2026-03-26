"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function PageLoader() {
  const loaderRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const loader = loaderRef.current;
    if (!loader) return;

    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        setDone(true);
        document.body.style.overflow = "";
      },
    });

    tl.to(loader, {
      clipPath: "inset(0 0 100% 0)",
      duration: 1.2,
      ease: "power4.inOut",
      delay: 0.5,
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
      className="page-loader will-change-clip"
      style={{ clipPath: "inset(0 0 0 0)" }}
    >
      <div className="flex flex-col items-center gap-3">
        <div
          className="w-8 h-8 rounded-full border-2 border-gold border-t-transparent"
          style={{ animation: "spin 0.8s linear infinite" }}
        />
        <span
          className="text-sm tracking-[0.3em] uppercase"
          style={{ color: "var(--color-warm-gray)", fontFamily: "var(--font-sans)" }}
        >
          Loading
        </span>
      </div>
    </div>
  );
}
