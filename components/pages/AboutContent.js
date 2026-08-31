"use client";

import Link from "next/link";
import { useTranslation } from "@/lib/i18n";
import Reveal from "@/components/Reveal";

const VALUES = ["v1", "v2", "v3", "v4"];

export default function AboutContent() {
  const { t } = useTranslation();

  return (
    <>
      {/* ============ HERO ============ */}
      <section className="relative pt-40 pb-24 px-6 lg:px-10 overflow-hidden">
        <div className="absolute inset-0 bp-grid pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative">
          <Reveal as="p" className="site-tag mb-5">{t("about.hero.eyebrow")}</Reveal>
          <Reveal as="h1" className="font-display font-semibold text-5xl md:text-7xl leading-[0.98] tracking-tight">{t("about.hero.title")}</Reveal>
          <Reveal as="p" delay={1} className="text-stone-600 text-lg mt-7 max-w-xl mx-auto">{t("about.hero.sub")}</Reveal>
        </div>
      </section>

      {/* ============ WELCOME ============ */}
      <section className="py-20 px-6 lg:px-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
        <div>
          <Reveal as="p" className="site-tag mb-3">{t("about.welcome.eyebrow")}</Reveal>
          <Reveal as="h2" className="font-display text-3xl md:text-4xl font-semibold mb-6 draw-underline">{t("about.welcome.title")}</Reveal>
          <Reveal as="p" delay={1} className="text-stone-600 leading-relaxed">{t("about.welcome.p1")}</Reveal>
        </div>
        <Reveal delay={1} className="aspect-[4/5] rounded-xl bg-stone-100 border border-stone-200 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bp-grid-dense opacity-40" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/logo.png" alt="BauArt" className="w-40 h-40 object-contain relative opacity-90" />
        </Reveal>
      </section>

      {/* ============ MISSION & VISION ============ */}
      <section className="py-20 px-6 lg:px-10 max-w-7xl mx-auto grid md:grid-cols-2 gap-px bg-stone-200 border border-stone-200 rounded-xl overflow-hidden">
        <Reveal className="bg-paper p-8 md:p-10">
          <div className="icon-badge mb-6">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 2 3 7v6c0 5 4 8.5 9 9 5-.5 9-4 9-9V7l-9-5Z" /><path strokeLinecap="round" strokeLinejoin="round" d="m9 12 2 2 4-4" /></svg>
          </div>
          <h2 className="font-display font-semibold text-2xl mb-4">{t("about.mission.title")}</h2>
          <p className="text-stone-600 leading-relaxed">{t("about.mission.text")}</p>
        </Reveal>
        <Reveal delay={1} className="bg-paper p-8 md:p-10">
          <div className="icon-badge mb-6">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" strokeWidth="1.5" /></svg>
          </div>
          <h2 className="font-display font-semibold text-2xl mb-4">{t("about.vision.title")}</h2>
          <p className="text-stone-600 leading-relaxed">{t("about.vision.text")}</p>
        </Reveal>
      </section>

      {/* ============ VALUES ============ */}
      <section className="py-20 px-6 lg:px-10 max-w-7xl mx-auto">
        <div className="max-w-2xl mb-14">
          <Reveal as="p" className="site-tag mb-3">{t("about.values.eyebrow")}</Reveal>
          <Reveal as="h2" className="font-display text-4xl md:text-5xl font-semibold draw-underline">{t("about.values.title")}</Reveal>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-stone-200 border border-stone-200 rounded-xl overflow-hidden">
          {VALUES.map((v, i) => (
            <Reveal key={v} delay={i} className="bg-paper p-8">
              <div className="step-badge mb-4">{i + 1}</div>
              <h3 className="font-display font-semibold text-lg mb-2">{t(`about.${v}.title`)}</h3>
              <p className="text-sm text-stone-600">{t(`about.${v}.text`)}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ STATS ============ */}
      <section className="py-20 px-6 lg:px-10 bg-charcoal text-cream">
        <div className="max-w-7xl mx-auto">
          <Reveal as="p" className="site-tag mb-3 !text-clay-light">{t("about.stats.title")}</Reveal>
          <div className="dim-line mb-12 opacity-30" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            <Reveal>
              <p className="font-display text-5xl font-semibold text-clay-light">{t("home.hero.stat1n")}</p>
              <p className="text-sm text-mist mt-2">{t("home.hero.stat1l")}</p>
            </Reveal>
            <Reveal delay={1}>
              <p className="font-display text-5xl font-semibold text-clay-light">{t("home.hero.stat2n")}</p>
              <p className="text-sm text-mist mt-2">{t("home.hero.stat2l")}</p>
            </Reveal>
            <Reveal delay={2}>
              <p className="font-display text-5xl font-semibold text-clay-light">{t("home.hero.stat3n")}</p>
              <p className="text-sm text-mist mt-2">{t("home.hero.stat3l")}</p>
            </Reveal>
            <Reveal delay={3}>
              <p className="font-display text-5xl font-semibold text-clay-light">6</p>
              <p className="text-sm text-mist mt-2">Regionen</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="relative py-32 px-6 lg:px-10 bg-gradient-to-br from-clay via-clay to-clay-dark text-cream overflow-hidden">
        <div className="absolute inset-0 bp-grid opacity-[.1] pointer-events-none" />
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[640px] h-[640px] rounded-full bg-charcoal/20 blur-[120px] pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative">
          <Reveal as="h2" className="font-display text-4xl md:text-6xl font-semibold tracking-tight">{t("home.cta.title")}</Reveal>
          <Reveal delay={1} className="mt-10">
            <Link href="/contact" className="btn-clay inline-block bg-charcoal hover:bg-black transition-colors text-white px-9 py-4 rounded-sm font-medium">
              {t("home.cta.button")}
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
