"use client";

export default function Footer() {
  return (
    <footer
      className="py-8 px-6 text-center"
      style={{ background: "var(--color-charcoal)" }}
    >
      <p
        className="text-xs tracking-[0.2em] uppercase"
        style={{ color: "var(--color-warm-gray)", opacity: 0.6 }}
      >
        © 2026 · B&W Prod.
      </p>
    </footer>
  );
}
