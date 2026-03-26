"use client";

import { useRef, useEffect, useCallback } from "react";
import gsap from "gsap";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  strength?: number;
  onClick?: () => void;
}

export default function MagneticButton({
  children,
  className = "",
  href,
  strength = 0.3,
  onClick,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLElement>(null);
  const xTo = useRef<gsap.QuickToFunc | null>(null);
  const yTo = useRef<gsap.QuickToFunc | null>(null);

  /*
  useEffect(() => {
    const el = buttonRef.current;
    if (!el) return;

    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    xTo.current = gsap.quickTo(el, "x", {
      duration: 0.6,
      ease: "elastic.out(1, 0.3)",
    });
    yTo.current = gsap.quickTo(el, "y", {
      duration: 0.6,
      ease: "elastic.out(1, 0.3)",
    });
  }, []);

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const el = buttonRef.current;
      if (!el || !xTo.current || !yTo.current) return;
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      xTo.current(relX * strength);
      yTo.current(relY * strength);
    },
    [strength]
  );

  const onMouseLeave = useCallback(() => {
    if (xTo.current) xTo.current(0);
    if (yTo.current) yTo.current(0);
  }, []);
  */

  const onMouseMove = undefined;
  const onMouseLeave = undefined;

  const Tag = href ? "a" : "button";

  return (
    <Tag
      ref={buttonRef as React.Ref<HTMLButtonElement & HTMLAnchorElement>}
      className={`inline-block will-change-transform ${className}`}
      href={href}
      target={href ? "_blank" : undefined}
      rel={href ? "noopener noreferrer" : undefined}
      onClick={onClick}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      data-cursor-hover
    >
      {children}
    </Tag>
  );
}
