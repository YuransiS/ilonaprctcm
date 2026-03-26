"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const onMouseMove = useCallback((e: MouseEvent) => {
    posRef.current = { x: e.clientX, y: e.clientY };

    if (cursorRef.current) {
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: "power2.out",
        overwrite: true,
      });
    }
    if (followerRef.current) {
      gsap.to(followerRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.4,
        ease: "power2.out",
        overwrite: true,
      });
    }
  }, []);

  useEffect(() => {
    const checkTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(checkTouch);
    if (checkTouch) return;

    window.addEventListener("mousemove", onMouseMove);

    const handleOver = () => {
      if (followerRef.current) {
        gsap.to(followerRef.current, {
          scale: 2.5,
          opacity: 0.15,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    const handleOut = () => {
      if (followerRef.current) {
        gsap.to(followerRef.current, {
          scale: 1,
          opacity: 0.4,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    const interactiveElements = document.querySelectorAll(
      'a, button, [role="button"], input, textarea, [data-cursor-hover]'
    );
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleOver);
      el.addEventListener("mouseleave", handleOut);
    });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleOver);
        el.removeEventListener("mouseleave", handleOut);
      });
    };
  }, [onMouseMove]);

  if (isTouchDevice) return null;

  return (
    <>
      <div
        ref={cursorRef}
        className="custom-cursor fixed top-0 left-0 pointer-events-none z-[10000]"
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "var(--color-charcoal)",
          mixBlendMode: "difference",
          transform: "translate(-50%, -50%)",
        }}
      />
      <div
        ref={followerRef}
        className="custom-cursor fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          width: 32,
          height: 32,
          borderRadius: "50%",
          border: "1px solid var(--color-charcoal)",
          opacity: 0.4,
          mixBlendMode: "difference",
          transform: "translate(-50%, -50%)",
        }}
      />
    </>
  );
}
