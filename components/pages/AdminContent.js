"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useTranslation } from "@/lib/i18n";
import { useProjects, projectText } from "@/lib/projects";
import { loadMessages, saveMessages } from "@/lib/messages";
import { readAndCompressImage, ACCEPTED_IMAGE_TYPES } from "@/lib/image";
import { searchPlaces } from "@/lib/geocode";
import { SITE } from "@/lib/site-config";
import ThemeToggle from "@/components/ThemeToggle";

const PickerMap = dynamic(() => import("@/components/MapCanvas"), { ssr: false });

const ADMIN_SESSION_KEY = "bauart_admin_session";
const ADMIN_USER = "admin";
const ADMIN_PASS = "bauart2026";

const CATEGORIES = ["stein", "garten", "rohbau", "pflaster"];

function escapeText(str) {
  return String(str ?? "");
}

function buildFormState(initial) {
  return {
    titleDe: initial?.title?.de || (typeof initial?.title === "string" ? initial.title : "") || "",
    titleEn: initial?.title?.en || "",
    category: initial?.category || "stein",
    year: initial?.year || "",
    lat: initial?.lat ?? "",
    lng: initial?.lng ?? "",
    image: initial?.image || "",
    descDe: initial?.desc?.de || (typeof initial?.desc === "string" ? initial.desc : "") || "",
    descEn: initial?.desc?.en || "",
  };
}

/* ---------- Login ---------- */
function LoginView({ onSuccess }) {
  const { t } = useTranslation();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.trim() === ADMIN_USER && pass === ADMIN_PASS) {
      window.sessionStorage.setItem(ADMIN_SESSION_KEY, "1");
      setError(false);
      onSuccess();
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute inset-0 bp-grid pointer-events-none" />
      <div className="absolute -top-32 -left-32 w-[420px] h-[420px] rounded-full bg-clay/5 blur-3xl pointer-events-none" />
      <div className="relative w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/logo.png" alt="BauArt" className="h-16 w-16 object-contain mb-4" />
          <h1 className="font-display font-semibold text-2xl">{t("admin.login.title")}</h1>
          <p className="text-sm text-stone-500 mt-1">{t("admin.login.sub")}</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-paper border border-stone-200 rounded-xl shadow-lg shadow-ink/5 p-7 space-y-4">
          <div>
            <label className="text-sm font-medium block mb-1.5" htmlFor="admin-user">{t("admin.login.user")}</label>
            <input id="admin-user" name="username" autoComplete="username" required value={user} onChange={(e) => setUser(e.target.value)} className="w-full border border-stone-300 bg-paper rounded-sm px-4 py-3 text-sm focus:border-clay outline-none" />
          </div>
          <div>
            <label className="text-sm font-medium block mb-1.5" htmlFor="admin-pass">{t("admin.login.pass")}</label>
            <input id="admin-pass" name="password" type="password" autoComplete="current-password" required value={pass} onChange={(e) => setPass(e.target.value)} className="w-full border border-stone-300 bg-paper rounded-sm px-4 py-3 text-sm focus:border-clay outline-none" />
          </div>
          {error && <p className="text-sm text-red-600">{t("admin.login.error")}</p>}
          <button type="submit" className="btn-clay w-full bg-charcoal text-white py-3 rounded-sm font-medium text-sm">{t("admin.login.button")}</button>
        </form>
        <p className="text-xs text-stone-500 font-mono mt-4 text-center">{t("admin.login.hint")}</p>
        <Link href="/" className="block text-center text-xs text-stone-500 hover:text-clay mt-6">{t("admin.back")}</Link>
      </div>
    </div>
  );
}

/* ---------- Place / address search (Photon, OSM) ---------- */
function PlaceSearch({ onSelect }) {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const boxRef = useRef(null);

  useEffect(() => {
    if (query.trim().length < 3) {
      setResults([]);
      setError("");
      setLoading(false);
      return;
    }
    const controller = new AbortController();
    setLoading(true);
    const timer = setTimeout(() => {
      searchPlaces(query, { signal: controller.signal })
        .then((r) => {
          setResults(r);
          setError("");
        })
        .catch((err) => {
          if (err.name !== "AbortError") setError(t("admin.form.searchError"));
        })
        .finally(() => setLoading(false));
    }, 350);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query, t]);

  useEffect(() => {
    const onDocClick = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const handleSelect = (place) => {
    onSelect(place);
    setQuery(place.label);
    setOpen(false);
  };

  const showDropdown = open && query.trim().length >= 3;

  return (
    <div className="relative z-[1200]" ref={boxRef}>
      <label className="text-sm font-medium block mb-1.5">{t("admin.form.search")}</label>
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder={t("admin.form.searchPlaceholder")}
          className="w-full border border-stone-300 bg-paper rounded-sm pl-4 pr-9 py-2.5 text-sm focus:border-clay outline-none"
        />
        <svg className="w-4 h-4 text-stone-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
          <circle cx="11" cy="11" r="7" /><path strokeLinecap="round" d="m21 21-3.5-3.5" />
        </svg>
      </div>
      {showDropdown && (
        <div className="absolute z-[1200] mt-1 w-full bg-paper border border-stone-300 rounded-sm shadow-lg shadow-ink/10 max-h-56 overflow-y-auto">
          {loading && <p className="px-4 py-3 text-xs text-stone-500">…</p>}
          {!loading && error && <p className="px-4 py-3 text-xs text-red-600">{error}</p>}
          {!loading && !error && results.length === 0 && <p className="px-4 py-3 text-xs text-stone-500">{t("admin.form.searchEmpty")}</p>}
          {!loading && results.map((r) => (
            <button
              type="button"
              key={r.id}
              onClick={() => handleSelect(r)}
              className="w-full text-left px-4 py-2.5 text-sm hover:bg-stone-100 border-b border-stone-100 last:border-0 transition-colors"
            >
              {r.label}
            </button>
          ))}
        </div>
      )}
      <p className="text-xs text-stone-500 mt-2">{t("admin.form.searchHint")}</p>
    </div>
  );
}

/* ---------- Location picker (search + map + lat/lng, all two-way synced) ---------- */
function LocationPicker({ lat, lng, onChange, onPlaceSelected }) {
  const { t } = useTranslation();
  const [flyTarget, setFlyTarget] = useState(null);
  const latNum = parseFloat(lat);
  const lngNum = parseFloat(lng);
  const hasCoords = Number.isFinite(latNum) && Number.isFinite(lngNum);
  const markerLat = hasCoords ? latNum : SITE.coords.lat;
  const markerLng = hasCoords ? lngNum : SITE.coords.lng;

  const setLatLng = (la, ln) => onChange(la.toFixed(6), ln.toFixed(6));

  const handlePlaceSelect = (place) => {
    setLatLng(place.lat, place.lng);
    setFlyTarget([place.lat, place.lng]);
    onPlaceSelected?.(place);
  };

  const markers = [
    {
      lat: markerLat,
      lng: markerLng,
      draggable: true,
      onDragEnd: setLatLng,
    },
  ];

  return (
    <div>
      <PlaceSearch onSelect={handlePlaceSelect} />
      <div className="rounded-sm overflow-hidden border border-stone-300 h-56 mt-3">
        <PickerMap
          center={[markerLat, markerLng]}
          zoom={hasCoords ? 13 : 10}
          markers={markers}
          onClick={setLatLng}
          flyTo={flyTarget}
          flyToZoom={17}
        />
      </div>
      <p className="text-xs text-stone-500 mt-2">{t("admin.form.mapHint")}</p>
      <div className="grid grid-cols-2 gap-4 mt-3">
        <div>
          <label className="text-sm font-medium block mb-1.5">{t("admin.form.lat")}</label>
          <input name="lat" type="number" step="any" required value={lat} onChange={(e) => onChange(e.target.value, lng)} className="w-full border border-stone-300 bg-paper rounded-sm px-4 py-2.5 text-sm focus:border-clay outline-none" />
        </div>
        <div>
          <label className="text-sm font-medium block mb-1.5">{t("admin.form.lng")}</label>
          <input name="lng" type="number" step="any" required value={lng} onChange={(e) => onChange(lat, e.target.value)} className="w-full border border-stone-300 bg-paper rounded-sm px-4 py-2.5 text-sm focus:border-clay outline-none" />
        </div>
      </div>
    </div>
  );
}

/* ---------- Image import (file -> compressed data URI, no server upload) ---------- */
function ImagePicker({ value, onChange }) {
  const { t } = useTranslation();
  const inputRef = useRef(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setError("");
    setBusy(true);
    try {
      const dataUrl = await readAndCompressImage(file);
      onChange(dataUrl);
    } catch (err) {
      setError(err.message || t("admin.form.imageError"));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_IMAGE_TYPES.join(",")}
        onChange={handleFile}
        className="hidden"
      />
      {value ? (
        <div className="relative rounded-sm overflow-hidden border border-stone-300 group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="" className="h-36 w-full object-cover" />
          <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/40 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
            <button type="button" onClick={() => inputRef.current?.click()} className="bg-paper text-ink text-xs px-3 py-1.5 rounded-sm font-medium">
              {t("admin.form.imageChange")}
            </button>
            <button type="button" onClick={() => onChange("")} className="bg-red-600 text-white text-xs px-3 py-1.5 rounded-sm font-medium">
              {t("admin.form.imageRemove")}
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={busy}
          className="w-full h-36 border-2 border-dashed border-stone-300 hover:border-clay rounded-sm flex flex-col items-center justify-center gap-2 text-stone-500 hover:text-clay transition-colors"
        >
          <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16.5V18a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-1.5M7 9l5-5 5 5M12 4v13" />
          </svg>
          <span className="text-sm font-medium">{busy ? "…" : t("admin.form.imageChoose")}</span>
        </button>
      )}
      <p className="text-xs text-stone-500 mt-2">{t("admin.form.imageHint")}</p>
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );
}

/* ---------- Project form ---------- */
function ProjectForm({ initial, onCancel, onSave }) {
  const { t, lang } = useTranslation();
  const [form, setForm] = useState(() => buildFormState(initial));

  const field = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      title: { de: form.titleDe.trim(), en: (form.titleEn || form.titleDe).trim() },
      category: form.category,
      year: form.year.trim(),
      lat: parseFloat(form.lat),
      lng: parseFloat(form.lng),
      image: form.image,
      desc: { de: form.descDe.trim(), en: (form.descEn || form.descDe).trim() },
    });
  };

  return (
    <div className="bg-paper rounded-xl max-w-lg w-full p-8 max-h-[90vh] overflow-y-auto">
      <h3 className="font-display font-semibold text-2xl mb-6">{initial ? projectText(initial, "title", lang) : t("admin.form.newTitle")}</h3>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium block mb-1.5">{t("admin.form.title.de")}</label>
            <input name="titleDe" required value={form.titleDe} onChange={field("titleDe")} className="w-full border border-stone-300 bg-paper rounded-sm px-4 py-2.5 text-sm focus:border-clay outline-none" />
          </div>
          <div>
            <label className="text-sm font-medium block mb-1.5">{t("admin.form.title.en")}</label>
            <input name="titleEn" value={form.titleEn} onChange={field("titleEn")} className="w-full border border-stone-300 bg-paper rounded-sm px-4 py-2.5 text-sm focus:border-clay outline-none" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium block mb-1.5">{t("admin.form.category")}</label>
            <select name="category" value={form.category} onChange={field("category")} className="w-full border border-stone-300 rounded-sm px-4 py-2.5 text-sm focus:border-clay outline-none bg-paper">
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{t(`filter.${cat}`)}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium block mb-1.5">{t("admin.form.year")}</label>
            <input name="year" value={form.year} onChange={field("year")} className="w-full border border-stone-300 bg-paper rounded-sm px-4 py-2.5 text-sm focus:border-clay outline-none" />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium block mb-1.5">{t("admin.form.location")}</label>
          <LocationPicker
            lat={form.lat}
            lng={form.lng}
            onChange={(lat, lng) => setForm((f) => ({ ...f, lat, lng }))}
            onPlaceSelected={(place) => setForm((f) => ({ ...f, titleDe: f.titleDe || place.name || "" }))}
          />
        </div>

        <div>
          <label className="text-sm font-medium block mb-1.5">{t("admin.form.image")}</label>
          <ImagePicker value={form.image} onChange={(image) => setForm((f) => ({ ...f, image }))} />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium block mb-1.5">{t("admin.form.desc.de")}</label>
            <textarea name="descDe" rows={3} value={form.descDe} onChange={field("descDe")} className="w-full border border-stone-300 bg-paper rounded-sm px-4 py-2.5 text-sm focus:border-clay outline-none resize-none" />
          </div>
          <div>
            <label className="text-sm font-medium block mb-1.5">{t("admin.form.desc.en")}</label>
            <textarea name="descEn" rows={3} value={form.descEn} onChange={field("descEn")} className="w-full border border-stone-300 bg-paper rounded-sm px-4 py-2.5 text-sm focus:border-clay outline-none resize-none" />
          </div>
        </div>
        <div className="flex gap-3 pt-2">
          <button type="button" onClick={onCancel} className="flex-1 border border-stone-300 py-2.5 rounded-sm text-sm">{t("admin.form.cancel")}</button>
          <button type="submit" className="btn-clay flex-1 bg-charcoal text-white py-2.5 rounded-sm text-sm">{t("admin.form.save")}</button>
        </div>
      </form>
    </div>
  );
}

function ProjectFormModal({ open, initial, onCancel, onSave }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[60] bg-charcoal/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={(e) => e.target === e.currentTarget && onCancel()}>
      <ProjectForm key={initial?.id || "new"} initial={initial} onCancel={onCancel} onSave={onSave} />
    </div>
  );
}

/* ---------- Projects tab ---------- */
function ProjectsTab() {
  const { t, lang } = useTranslation();
  const { projects, ready, addProject, updateProject, deleteProject, resetProjects } = useProjects();
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const openNew = () => { setEditing(null); setFormOpen(true); };
  const openEdit = (project) => { setEditing(project); setFormOpen(true); };
  const closeForm = () => setFormOpen(false);

  const handleSave = (data) => {
    if (editing) updateProject(editing.id, data);
    else addProject(data);
    setFormOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm(t("admin.projects.deleteConfirm"))) deleteProject(id);
  };

  const handleReset = () => {
    if (window.confirm(t("admin.projects.resetConfirm"))) resetProjects();
  };

  return (
    <div className="bg-paper border border-stone-200 rounded-xl shadow-sm shadow-ink/5 p-6 md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <h2 className="font-display font-semibold text-xl">{t("admin.tab.projects")}</h2>
        <div className="flex gap-2">
          <button onClick={handleReset} className="text-xs text-stone-500 hover:text-clay border border-stone-300 px-4 py-2.5 rounded-sm transition-colors">{t("admin.projects.reset")}</button>
          <button onClick={openNew} className="btn-clay bg-charcoal text-white text-sm px-5 py-2.5 rounded-sm">{t("admin.projects.add")}</button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-stone-300 text-xs font-mono text-stone-500 uppercase tracking-wide">
              <th className="py-2 pr-4"></th>
              <th className="py-2 pr-4">{t("admin.form.title")}</th>
              <th className="py-2 pr-4">{t("admin.form.category")}</th>
              <th className="py-2 pr-4">{t("admin.form.year")}</th>
              <th className="py-2 pr-4">{t("admin.form.desc")}</th>
              <th className="py-2" />
            </tr>
          </thead>
          <tbody>
            {ready && projects.length === 0 && (
              <tr><td colSpan={6} className="py-6 text-center text-sm text-stone-500">{t("admin.projects.empty")}</td></tr>
            )}
            {projects.map((p) => (
              <tr key={p.id} className="border-b border-stone-200 text-sm">
                <td className="py-2 pr-4">
                  <div className="h-10 w-14 rounded-sm overflow-hidden bg-stone-100 border border-stone-200 flex items-center justify-center shrink-0">
                    {p.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.image} alt="" className="h-full w-full object-cover" />
                    ) : (
                      <svg className="w-4 h-4 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6" /></svg>
                    )}
                  </div>
                </td>
                <td className="py-3 pr-4 font-medium">{escapeText(projectText(p, "title", lang))}</td>
                <td className="py-3 pr-4 text-stone-600">{escapeText(p.category)}</td>
                <td className="py-3 pr-4 text-stone-600">{escapeText(p.year || "")}</td>
                <td className="py-3 pr-4 text-stone-600 max-w-xs truncate">{escapeText(projectText(p, "desc", lang))}</td>
                <td className="py-3 text-right whitespace-nowrap">
                  <button onClick={() => openEdit(p)} className="text-xs text-clay hover:underline mr-3">{t("admin.actions.edit")}</button>
                  <button onClick={() => handleDelete(p.id)} className="text-xs text-red-600 hover:underline">{t("admin.actions.delete")}</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ProjectFormModal open={formOpen} initial={editing} onCancel={closeForm} onSave={handleSave} />
    </div>
  );
}

/* ---------- Messages tab ---------- */
function MessagesTab() {
  const { t } = useTranslation();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages(loadMessages());
  }, []);

  const markRead = (id) => {
    const next = messages.map((m) => (m.id === id ? { ...m, read: true } : m));
    setMessages(next);
    saveMessages(next);
  };

  const remove = (id) => {
    if (!window.confirm(t("admin.messages.deleteConfirm"))) return;
    const next = messages.filter((m) => m.id !== id);
    setMessages(next);
    saveMessages(next);
  };

  return (
    <div className="bg-paper border border-stone-200 rounded-xl shadow-sm shadow-ink/5 p-6 md:p-8">
      <h2 className="font-display font-semibold text-xl mb-6">{t("admin.tab.messages")}</h2>
      {messages.length === 0 ? (
        <p className="text-sm text-stone-500 text-center py-10">{t("admin.messages.empty")}</p>
      ) : (
        messages.map((m) => (
          <div key={m.id} className={`border border-stone-200 rounded-sm p-5 mb-3 ${m.read ? "" : "bg-stone-50"}`}>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <p className="font-medium text-sm">
                {escapeText(m.name)} {!m.read && <span className="text-clay text-xs font-mono ml-2">{t("admin.messages.new")}</span>}
              </p>
              <p className="text-xs text-stone-500 font-mono">{new Date(m.date).toLocaleString("de-DE")}</p>
            </div>
            <p className="text-xs text-stone-500 mb-2">
              {escapeText(m.email)}
              {m.phone ? " · " + escapeText(m.phone) : ""}
              {m.subject ? " · " + escapeText(m.subject) : ""}
            </p>
            <p className="text-sm text-stone-700 whitespace-pre-wrap">{escapeText(m.message)}</p>
            <div className="mt-3 flex gap-3">
              {!m.read && <button onClick={() => markRead(m.id)} className="text-xs text-clay hover:underline">{t("admin.messages.markRead")}</button>}
              <button onClick={() => remove(m.id)} className="text-xs text-red-600 hover:underline">{t("admin.messages.delete")}</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

/* ---------- Content tab ---------- */
function ContentTab() {
  const { t } = useTranslation();
  return (
    <div className="bg-paper border border-stone-200 rounded-xl shadow-sm shadow-ink/5 p-6 md:p-8">
      <h2 className="font-display font-semibold text-xl mb-4">{t("admin.tab.content")}</h2>
      <p className="text-sm text-stone-600 bg-stone-100 border border-stone-200 rounded-sm p-4">{t("admin.content.note")}</p>
      <div className="mt-6 text-sm text-stone-600 space-y-2">
        <p>• Texte: <code className="text-xs bg-stone-100 px-1.5 py-0.5 rounded">lib/i18n.js</code></p>
        <p>• Projektstandorte: <code className="text-xs bg-stone-100 px-1.5 py-0.5 rounded">lib/projects.js</code> (Standardwerte) + localStorage (Live-Änderungen)</p>
        <p>• Bilder: werden beim Hochladen komprimiert und direkt im Projekteintrag gespeichert (kein Server-Upload nötig)</p>
        <p>• Firmenangaben: <code className="text-xs bg-stone-100 px-1.5 py-0.5 rounded">lib/site-config.js</code></p>
      </div>
    </div>
  );
}

/* ---------- Panel ---------- */
function PanelView({ onLogout }) {
  const { t, lang, setLang } = useTranslation();
  const [tab, setTab] = useState("projects");

  const tabs = [
    { key: "projects", label: t("admin.tab.projects") },
    { key: "messages", label: t("admin.tab.messages") },
    { key: "content", label: t("admin.tab.content") },
  ];

  return (
    <div className="min-h-screen">
      <header className="bg-paper border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/logo.png" alt="BauArt" className="h-9 w-9 object-contain" />
            <span className="font-display font-semibold">{t("admin.panel.title")}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 font-mono text-xs">
              <button onClick={() => setLang("de")} className={`px-1.5 py-1 hover:text-clay ${lang === "de" ? "text-clay" : ""}`}>DE</button>
              <span className="text-stone-300">/</span>
              <button onClick={() => setLang("en")} className={`px-1.5 py-1 hover:text-clay ${lang === "en" ? "text-clay" : ""}`}>EN</button>
            </div>
            <ThemeToggle />
            <Link href="/" className="text-xs text-stone-500 hover:text-clay hidden sm:inline">{t("admin.back")}</Link>
            <button onClick={onLogout} className="border border-stone-300 hover:border-ink text-sm px-4 py-2 rounded-sm transition-colors">{t("admin.logout")}</button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((tb) => (
            <button
              key={tb.key}
              onClick={() => setTab(tb.key)}
              className={`text-sm px-5 py-2.5 rounded-sm transition-colors ${
                tab === tb.key ? "bg-charcoal text-white" : "text-stone-600 border border-stone-300 hover:border-ink"
              }`}
            >
              {tb.label}
            </button>
          ))}
        </div>

        {tab === "projects" && <ProjectsTab />}
        {tab === "messages" && <MessagesTab />}
        {tab === "content" && <ContentTab />}
      </div>
    </div>
  );
}

export default function AdminContent() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setLoggedIn(window.sessionStorage.getItem(ADMIN_SESSION_KEY) === "1");
    setChecked(true);
  }, []);

  const logout = () => {
    window.sessionStorage.removeItem(ADMIN_SESSION_KEY);
    setLoggedIn(false);
  };

  if (!checked) return null;

  return loggedIn ? <PanelView onLogout={logout} /> : <LoginView onSuccess={() => setLoggedIn(true)} />;
}
