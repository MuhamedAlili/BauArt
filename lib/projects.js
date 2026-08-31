"use client";

import { useCallback, useEffect, useState } from "react";

/* =========================================================
   BauArt — Project location data store
   Backed by localStorage so the admin panel and the public
   map stay in sync. title/desc are { de, en } pairs so every
   location an admin adds is translated when the site's
   language toggle is switched, just like the rest of the UI.
   Seeded with example sites around Pinneberg — replace freely
   via /admin.
   ========================================================= */

const STORE_KEY = "bauart_projects";

export const SEED_PROJECTS = [
  {
    id: "p1",
    title: { de: "Natursteinterrasse Pinneberg", en: "Natural stone terrace, Pinneberg" },
    category: "garten",
    lat: 53.6708,
    lng: 9.7947,
    year: "2024",
    desc: {
      de: "Hangterrasse mit Trockenmauern aus regionalem Naturstein und Sitzstufen.",
      en: "Sloped terrace with dry-stone walls in regional natural stone and seating steps.",
    },
    image: "",
  },
  {
    id: "p2",
    title: { de: "Stützmauer & Zufahrt, Elmshorn", en: "Retaining wall & driveway, Elmshorn" },
    category: "stein",
    lat: 53.7539,
    lng: 9.6531,
    year: "2023",
    desc: {
      de: "Gepflasterte Zufahrt mit Naturstein-Stützmauer.",
      en: "Paved driveway with a natural-stone retaining wall.",
    },
    image: "",
  },
  {
    id: "p3",
    title: { de: "Gartenanlage Uetersen", en: "Garden landscaping, Uetersen" },
    category: "garten",
    lat: 53.6822,
    lng: 9.6666,
    year: "2023",
    desc: {
      de: "Komplette Außenanlage mit Bewässerung und Sitzbereich.",
      en: "Full outdoor landscaping with irrigation and a seating area.",
    },
    image: "",
  },
  {
    id: "p4",
    title: { de: "Rohbau Einfamilienhaus, Tornesch", en: "Shell construction, single-family home, Tornesch" },
    category: "rohbau",
    lat: 53.7022,
    lng: 9.6989,
    year: "2022",
    desc: {
      de: "Fundament und tragendes Mauerwerk für ein Einfamilienhaus.",
      en: "Foundation and load-bearing masonry for a single-family home.",
    },
    image: "",
  },
  {
    id: "p5",
    title: { de: "Pflasterhof Quickborn", en: "Paved courtyard, Quickborn" },
    category: "pflaster",
    lat: 53.7314,
    lng: 9.9077,
    year: "2022",
    desc: {
      de: "Klinkerpflaster für Hof- und Terrassenflächen.",
      en: "Clinker paving for courtyard and terrace areas.",
    },
    image: "",
  },
  {
    id: "p6",
    title: { de: "Gartenmauer Wedel", en: "Garden wall, Wedel" },
    category: "stein",
    lat: 53.5844,
    lng: 9.696,
    year: "2021",
    desc: {
      de: "Freistehende Sichtsteinmauer als Grundstücksbegrenzung.",
      en: "Freestanding exposed-stone wall as a property boundary.",
    },
    image: "",
  },
];

/* Accepts either the { de, en } shape or a legacy plain string
   (in case older localStorage data predates bilingual fields)
   and always returns a project safe to render in either language. */
function normalizeProject(p) {
  const asBilingual = (val) => {
    if (val && typeof val === "object") return { de: val.de || "", en: val.en || val.de || "" };
    const str = val || "";
    return { de: str, en: str };
  };
  return { ...p, title: asBilingual(p.title), desc: asBilingual(p.desc) };
}

export function projectText(project, field, lang) {
  const val = project?.[field];
  if (val && typeof val === "object") return val[lang] || val.de || val.en || "";
  return val || "";
}

function readStore() {
  try {
    const raw = window.localStorage.getItem(STORE_KEY);
    if (!raw) {
      window.localStorage.setItem(STORE_KEY, JSON.stringify(SEED_PROJECTS));
      return [...SEED_PROJECTS];
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.map(normalizeProject) : [...SEED_PROJECTS];
  } catch (e) {
    return [...SEED_PROJECTS];
  }
}

function writeStore(list) {
  window.localStorage.setItem(STORE_KEY, JSON.stringify(list));
}

/* React hook: shared project list + CRUD, synced to localStorage.
   Used by both the public map/grid and the admin panel. */
export function useProjects() {
  const [projects, setProjects] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setProjects(readStore());
    setReady(true);
  }, []);

  const addProject = useCallback((project) => {
    setProjects((prev) => {
      const next = [...prev, { ...project, id: "p" + Date.now() }];
      writeStore(next);
      return next;
    });
  }, []);

  const updateProject = useCallback((id, updates) => {
    setProjects((prev) => {
      const next = prev.map((p) => (p.id === id ? { ...p, ...updates } : p));
      writeStore(next);
      return next;
    });
  }, []);

  const deleteProject = useCallback((id) => {
    setProjects((prev) => {
      const next = prev.filter((p) => p.id !== id);
      writeStore(next);
      return next;
    });
  }, []);

  const resetProjects = useCallback(() => {
    writeStore(SEED_PROJECTS);
    setProjects([...SEED_PROJECTS]);
  }, []);

  return { projects, ready, addProject, updateProject, deleteProject, resetProjects };
}
