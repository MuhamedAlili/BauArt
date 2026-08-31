"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslation } from "@/lib/i18n";

/* Intro loader + "formwork panel" wipe reveal — ported from main.js. */
export default function Loader() {
  const { t } = useTranslation();
  const barRef = useRef(null);
  const pctRef = useRef(null);
  const [fading, setFading] = useState(false);
  const [panelsOut, setPanelsOut] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    let raf;
    const skip = window.sessionStorage.getItem("bauart_loaded");
    const duration = skip ? 250 : 1400;
    const start = performance.now();

    function tick(now) {
      const t2 = Math.min(1, (now - start) / duration);
      const p = Math.floor(t2 * 100);
      if (barRef.current) barRef.current.style.width = p + "%";
      if (pctRef.current) pctRef.current.textContent = String(p).padStart(3, "0") + "%";
      if (t2 < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        finish();
      }
    }
    raf = requestAnimationFrame(tick);

    function finish() {
      window.sessionStorage.setItem("bauart_loaded", "1");
      setTimeout(() => {
        setFading(true);
        setPanelsOut(true);
        setTimeout(() => {
          setRemoved(true);
          document.body.classList.remove("overflow-hidden");
        }, 850);
      }, 220);
    }

    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (removed) return null;

  return (
    <>
      <div
        className="formwork-panel"
        style={{ left: 0, transition: "transform .8s cubic-bezier(.65,0,.35,1)", transform: panelsOut ? "translateX(-100%)" : "translateX(0)" }}
      />
      <div
        className="formwork-panel"
        style={{ right: 0, transition: "transform .8s cubic-bezier(.65,0,.35,1)", transform: panelsOut ? "translateX(100%)" : "translateX(0)" }}
      />
      <div id="loader" style={{ transition: "opacity .5s ease", opacity: fading ? 0 : 1 }}>
        <div className="loader-inner">
          <svg className="loader-mark" viewBox="0 0 100 100" fill="none" aria-hidden="true">
            <circle className="loader-ring" cx="50" cy="50" r="34" stroke="currentColor" strokeWidth="1.4" />
            <path className="loader-tick" d="M50 6 L50 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path className="loader-tick" d="M50 82 L50 94" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path className="loader-tick" d="M6 50 L18 50" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path className="loader-tick" d="M82 50 L94 50" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <circle cx="50" cy="50" r="3" fill="currentColor" />
          </svg>
          <p className="loader-label">
            <span>{t("loader.label")}</span>
            <span className="dot">.</span>
            <span className="dot">.</span>
            <span className="dot">.</span>
          </p>
          <div className="level-bar">
            <span ref={barRef} />
          </div>
          <p className="loader-pct" ref={pctRef}>000%</p>
        </div>
      </div>
    </>
  );
}
