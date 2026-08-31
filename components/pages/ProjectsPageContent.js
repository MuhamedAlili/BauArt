"use client";

import { useTranslation } from "@/lib/i18n";
import Reveal from "@/components/Reveal";
import ProjectsSection from "@/components/ProjectsSection";

export default function ProjectsPageContent() {
  const { t } = useTranslation();

  return (
    <>
      <section className="relative pt-40 pb-16 px-6 lg:px-10 overflow-hidden">
        <div className="absolute inset-0 bp-grid pointer-events-none" />
        <div className="absolute -right-24 -top-24 w-[520px] h-[520px] rounded-full bg-clay/5 blur-3xl pointer-events-none" />
        <div className="max-w-3xl mx-auto text-center relative">
          <Reveal as="p" className="site-tag mb-5">{t("projects.hero.eyebrow")}</Reveal>
          <Reveal as="h1" className="font-display font-semibold text-5xl md:text-6xl leading-[0.98] tracking-tight">{t("projects.hero.title")}</Reveal>
          <Reveal as="p" delay={1} className="text-stone-600 text-lg mt-6">{t("projects.hero.sub")}</Reveal>
        </div>
      </section>

      <ProjectsSection showFilters />
    </>
  );
}
