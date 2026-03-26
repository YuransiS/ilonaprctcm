"use client";

import { useRef, useCallback } from "react";

interface ShineCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export default function ShineCard({ children, className = "", style }: ShineCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--shine-x", `${x}px`);
    card.style.setProperty("--shine-y", `${y}px`);
  }, []);

  return (
    <div
      ref={cardRef}
      className={`shine-card group relative ${className}`}
      onMouseMove={onMouseMove}
      style={
        {
          "--shine-x": "0px",
          "--shine-y": "0px",
          ...style,
        } as React.CSSProperties
      }
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[inherit] z-10"
        style={{
          background:
            "radial-gradient(400px circle at var(--shine-x) var(--shine-y), rgba(255,255,255,0.15), transparent 60%)",
        }}
      />
      {children}
    </div>
  );
}
