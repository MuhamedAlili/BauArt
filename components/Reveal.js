"use client";

import { useEffect, useRef, useState } from "react";

/* Reveal-on-scroll wrapper — mirrors the original IntersectionObserver
   ".reveal" / ".reveal.in" behaviour from main.js, per-element. */
export default function Reveal({ as: Tag = "div", delay, className = "", children, ...props }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const delayClass = delay ? `reveal-delay-${delay}` : "";

  return (
    <Tag ref={ref} className={`reveal ${inView ? "in" : ""} ${delayClass} ${className}`.trim()} {...props}>
      {children}
    </Tag>
  );
}
