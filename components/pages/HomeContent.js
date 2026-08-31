"use client";

import Link from "next/link";
import { useTranslation } from "@/lib/i18n";
import Reveal from "@/components/Reveal";
import ProjectsSection from "@/components/ProjectsSection";

const MARQUEE_KEYS = [1, 2, 3, 4, 5, 6, 7, 8].map((n) => `home.marquee.${n}`);

const SERVICES = [
  {
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M4 21V10l4-3 4 3v11M12 21V6l4-3 4 3v15M8 14h0M8 17h0" />
    ),
    title: "home.services.s1.title",
    text: "home.services.s1.text",
  },
  {
    icon: (
      <>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21c4-3 7-6.2 7-10.5A7 7 0 0 0 5 10.5C5 14.8 8 18 12 21Z" />
        <path strokeLinecap="round" d="M12 21V11" />
      </>
    ),
    title: "home.services.s2.title",
    text: "home.services.s2.text",
  },
  {
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M3 9.5 12 4l9 5.5M4 10v10h16V10M9 20v-6h6v6" />,
    title: "home.services.s3.title",
    text: "home.services.s3.text",
  },
  {
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M4 20V10l8-6 8 6v10M9 20v-5a3 3 0 0 1 6 0v5" />,
    title: "home.services.s4.title",
    text: "home.services.s4.text",
  },
];

const PROCESS = [
  {
    key: "p1",
    icon: <><circle cx="10" cy="10" r="6" /><path strokeLinecap="round" d="m21 21-4.3-4.3" /></>,
  },
  {
    key: "p2",
    icon: <><path strokeLinecap="round" strokeLinejoin="round" d="M12 20h9" /><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" /></>,
  },
  {
    key: "p3",
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.4-3.4a6 6 0 0 1-7.6 7.6l-6.5 6.5a2.1 2.1 0 0 1-3-3l6.5-6.5a6 6 0 0 1 7.6-7.6Z" />,
  },
  {
    key: "p4",
    icon: <><circle cx="12" cy="12" r="9" /><path strokeLinecap="round" strokeLinejoin="round" d="m8 12.5 2.5 2.5L16 9.5" /></>,
  },
];

export default function HomeContent() {
  const { t } = useTranslation();

  return (
    <>
      {/* ============ HERO ============ */}
      <section className="relative min-h-[100svh] flex items-end pb-20 pt-32 overflow-hidden">
        <div className="absolute inset-0 bp-grid pointer-events-none" />
        <div className="absolute -right-24 -top-24 w-[520px] h-[520px] rounded-full bg-clay/5 blur-3xl" />

        {/* Decorative "terraced garden" blueprint illustration */}
        <svg className="arm-accent absolute top-24 right-6 lg:right-14 w-56 h-56 lg:w-72 lg:h-72 text-clay/60 hidden lg:block" viewBox="0 0 300 300" fill="none">
          <path
            d="M30 50 H140 V110 H200 V170 H260 V230"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength="200"
          />
          <path d="M30 50 V38 M30 38 H42" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity=".7" pathLength="200" />
          <path d="M260 230 V270 M260 270 H272" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity=".7" pathLength="200" />
          <circle cx="85" cy="38" r="7" stroke="currentColor" strokeWidth="2.2" />
          <circle cx="170" cy="98" r="6" stroke="currentColor" strokeWidth="2.2" />
          <circle cx="230" cy="158" r="6.5" stroke="currentColor" strokeWidth="2.2" />
        </svg>

        <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full relative">
          <Reveal as="p" className="site-tag mb-5">
            N 53.67° / E 9.79° — <span>{t("home.hero.eyebrow")}</span>
          </Reveal>

          <h1 className="font-display font-semibold leading-[0.98] tracking-tight text-[13vw] sm:text-6xl md:text-7xl lg:text-8xl">
            <span className="mask-line"><span>{t("home.hero.title1")}</span></span><br />
            <span className="mask-line" style={{ animationDelay: ".12s" }}><span className="text-clay">{t("home.hero.title2")}</span></span>
          </h1>

          <div className="mt-10 grid lg:grid-cols-[1fr_auto] gap-8 items-end">
            <Reveal as="p" delay={1} className="max-w-md text-stone-600 text-lg">{t("home.hero.sub")}</Reveal>

            <Reveal delay={2} className="flex flex-wrap gap-4">
              <Link href="/contact" className="btn-clay bg-charcoal text-white px-7 py-3.5 rounded-sm font-medium text-sm">{t("home.hero.cta1")}</Link>
              <Link href="#projects" className="border border-ink/20 hover:border-ink px-7 py-3.5 rounded-sm font-medium text-sm transition-colors">{t("home.hero.cta2")}</Link>
            </Reveal>
          </div>

          <Reveal delay={2} className="dim-line mt-14 mb-8" />

          <Reveal delay={3} className="grid grid-cols-3 max-w-xl gap-6">
            <div>
              <p className="font-display text-3xl md:text-4xl font-semibold text-clay">{t("home.hero.stat1n")}</p>
              <p className="text-xs md:text-sm text-stone-600 mt-1">{t("home.hero.stat1l")}</p>
            </div>
            <div>
              <p className="font-display text-3xl md:text-4xl font-semibold text-clay">{t("home.hero.stat2n")}</p>
              <p className="text-xs md:text-sm text-stone-600 mt-1">{t("home.hero.stat2l")}</p>
            </div>
            <div>
              <p className="font-display text-3xl md:text-4xl font-semibold text-clay">{t("home.hero.stat3n")}</p>
              <p className="text-xs md:text-sm text-stone-600 mt-1">{t("home.hero.stat3l")}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ MARQUEE ============ */}
      <section className="bg-charcoal text-cream py-5 overflow-hidden border-y border-white/10">
        <div className="marquee-track font-mono text-sm tracking-wide">
          {[0, 1].map((copy) => (
            <span className="flex items-center gap-10 pr-10" key={copy}>
              {MARQUEE_KEYS.map((key) => (
                <span className="flex items-center gap-10" key={key}>
                  <span>{t(key)}</span>
                  <span className="text-clay-light">◆</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </section>

      {/* ============ SERVICES ============ */}
      <section className="bg-stone-50 border-y border-stone-200">
        <div className="py-28 px-6 lg:px-10 max-w-7xl mx-auto">
          <div className="max-w-2xl mb-16">
            <Reveal as="p" className="site-tag mb-3">{t("home.services.eyebrow")}</Reveal>
            <Reveal as="h2" className="font-display text-4xl md:text-5xl font-semibold draw-underline">{t("home.services.title")}</Reveal>
            <Reveal as="p" delay={1} className="text-stone-600 mt-5 text-lg">{t("home.services.sub")}</Reveal>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((s, i) => (
              <Reveal key={s.title} delay={i} className="service-card bg-paper border border-stone-200 rounded-xl p-7 shadow-sm shadow-ink/[.03]">
                <div className="icon-badge mb-6">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">{s.icon}</svg>
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">{t(s.title)}</h3>
                <p className="text-sm text-stone-600">{t(s.text)}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ MAP / PROJECTS ============ */}
      <ProjectsSection limit={6} showFilters={false} />

      {/* ============ PROCESS ============ */}
      <section className="relative py-28 px-6 lg:px-10 bg-stone-50 border-y border-stone-200 overflow-hidden">
        <div className="absolute inset-0 bp-grid-dense opacity-[.35] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative">
          <div className="max-w-2xl mb-16">
            <Reveal as="p" className="site-tag mb-3">{t("home.process.eyebrow")}</Reveal>
            <Reveal as="h2" className="font-display text-4xl md:text-5xl font-semibold draw-underline">{t("home.process.title")}</Reveal>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {PROCESS.map((p, i) => (
              <Reveal
                key={p.key}
                delay={i}
                className="relative service-card bg-paper border border-stone-200 rounded-xl p-7 shadow-sm shadow-ink/[.03]"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="icon-badge">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">{p.icon}</svg>
                  </div>
                  <span className="font-mono text-xs text-clay">0{i + 1}</span>
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">{t(`home.process.${p.key}.title`)}</h3>
                <p className="text-sm text-stone-600">{t(`home.process.${p.key}.text`)}</p>
                {i < PROCESS.length - 1 && (
                  <svg className="hidden md:block absolute top-1/2 -right-5 -translate-y-1/2 w-4 h-4 text-clay/50 z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m9 5 7 7-7 7" />
                  </svg>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="relative py-32 px-6 lg:px-10 bg-gradient-to-br from-charcoal via-charcoal to-clay-dark text-cream overflow-hidden">
        <div className="absolute inset-0 bp-grid opacity-[.08] pointer-events-none" />
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[640px] h-[640px] rounded-full bg-clay/20 blur-[120px] pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative">
          <Reveal as="h2" className="font-display text-4xl md:text-6xl font-semibold tracking-tight">{t("home.cta.title")}</Reveal>
          <Reveal as="p" delay={1} className="text-mist mt-5 text-lg max-w-xl mx-auto">{t("home.cta.sub")}</Reveal>
          <Reveal delay={2} className="mt-10">
            <Link href="/contact" className="btn-clay inline-block bg-clay hover:bg-clay-light transition-colors text-white px-9 py-4 rounded-sm font-medium">
              {t("home.cta.button")}
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
