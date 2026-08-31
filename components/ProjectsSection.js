"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { useTranslation } from "@/lib/i18n";
import { useConsent } from "@/lib/consent";
import { useProjects, projectText } from "@/lib/projects";
import { escapeHtml } from "@/lib/format";
import Reveal from "@/components/Reveal";

const MapCanvas = dynamic(() => import("@/components/MapCanvas"), { ssr: false });

const FILTERS = ["alle", "stein", "garten", "pflaster"];

function ProjectCard({ project, lang, t }) {
  const title = projectText(project, "title", lang);
  const desc = projectText(project, "desc", lang);
  return (
    <div className="project-card reveal in bg-paper border border-stone-200 rounded-xl overflow-hidden group shadow-sm shadow-ink/[.04] hover:shadow-xl hover:shadow-ink/10 transition-shadow duration-500">
      <div className="h-44 overflow-hidden bg-stone-200 flex items-center justify-center relative">
        {project.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={project.image} alt={title} className="w-full h-full object-cover" />
        ) : (
          <svg className="w-10 h-10 text-stone-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6" />
          </svg>
        )}
        <span className="absolute top-3 left-3 bg-charcoal/80 backdrop-blur-sm text-cream text-[10px] font-mono px-2.5 py-1 rounded-full tracking-wide">
          {t(`filter.${project.category}`, project.category)}
        </span>
      </div>
      <div className="p-5">
        <p className="site-tag mb-1">
          {typeof project.lat === "number" ? project.lat.toFixed(2) : "—"}° / {typeof project.lng === "number" ? project.lng.toFixed(2) : "—"}° · {project.year || ""}
        </p>
        <h3 className="font-display font-semibold text-lg leading-snug mb-1">{title}</h3>
        <p className="text-sm text-stone-600">{desc}</p>
      </div>
    </div>
  );
}

export default function ProjectsSection({ limit, showFilters = true }) {
  const { t, lang } = useTranslation();
  const { consent, setConsent, ready } = useConsent();
  const { projects } = useProjects();
  const [activeFilter, setActiveFilter] = useState("alle");

  const effectiveFilter = showFilters ? activeFilter : "alle";

  const filtered = useMemo(
    () => (effectiveFilter === "alle" ? projects : projects.filter((p) => p.category === effectiveFilter)),
    [projects, effectiveFilter]
  );

  const visible = useMemo(() => (limit ? filtered.slice(0, limit) : filtered), [filtered, limit]);
  /* Always show the "more projects" link in teaser mode (limit set) — it's
     the way to reach the full /projects page, not just an overflow indicator. */
  const showMoreLink = !!limit;

  const markers = useMemo(
    () =>
      filtered.map((p) => ({
        lat: p.lat,
        lng: p.lng,
        popupHtml: `<strong>${escapeHtml(projectText(p, "title", lang))}</strong><br><span style="color:#8A7A63">${escapeHtml(
          t(`filter.${p.category}`, p.category)
        )} · ${escapeHtml(p.year || "")}</span>`,
      })),
    [filtered, lang, t]
  );

  const mapsAllowed = !!consent?.maps;

  return (
    <section id="projects" className="py-28 px-6 lg:px-10 max-w-7xl mx-auto scroll-mt-20">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
        <div className="max-w-xl">
          <Reveal as="p" className="site-tag mb-3">{t("home.map.eyebrow")}</Reveal>
          <Reveal as="h2" className="font-display text-4xl md:text-5xl font-semibold draw-underline">{t("home.map.title")}</Reveal>
          <Reveal as="p" delay={1} className="text-stone-600 mt-5 text-lg">{t("home.map.sub")}</Reveal>
        </div>
        {showFilters && (
          <Reveal delay={1} className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`text-xs font-mono px-4 py-2 rounded-full transition-colors ${
                  activeFilter === f ? "bg-charcoal text-white" : "border border-stone-300 hover:border-ink"
                }`}
              >
                {t(`filter.${f}`)}
              </button>
            ))}
          </Reveal>
        )}
      </div>

      <Reveal className="relative rounded-xl overflow-hidden border border-stone-200 mb-4 shadow-lg shadow-ink/[.06]">
        {ready && !mapsAllowed && (
          <div className="h-[380px] md:h-[440px] w-full bg-stone-100 flex flex-col items-center justify-center text-center px-6 gap-4">
            <svg className="w-9 h-9 text-stone-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 0 1 3 16.382V5.618a1 1 0 0 1 1.447-.894L9 7m0 13 6-3m-6 3V7m6 10 4.553 2.276A1 1 0 0 0 21 18.382V7.618a1 1 0 0 0-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            <p className="text-stone-600 text-sm max-w-sm">{t("cookie.modal.maps.d")}</p>
            <button
              onClick={() => setConsent({ necessary: true, analytics: consent?.analytics || false, maps: true })}
              className="btn-clay bg-charcoal text-white text-sm px-5 py-2.5 rounded-sm"
            >
              Karte laden
            </button>
          </div>
        )}
        <div className={`h-[380px] md:h-[440px] w-full ${ready && mapsAllowed ? "" : "hidden"}`}>
          {ready && mapsAllowed && <MapCanvas center={[53.65, 9.85]} zoom={10.2} markers={markers} />}
        </div>
      </Reveal>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {visible.length ? (
          visible.map((p) => <ProjectCard key={p.id} project={p} lang={lang} t={t} />)
        ) : (
          <p className="text-stone-600 col-span-full text-center py-10">—</p>
        )}
      </div>

      {showMoreLink && (
        <Reveal className="mt-12 flex justify-center">
          <Link href="/projects" className="btn-clay bg-charcoal text-white px-8 py-3.5 rounded-sm font-medium text-sm">
            {t("home.map.more")}
          </Link>
        </Reveal>
      )}
    </section>
  );
}
