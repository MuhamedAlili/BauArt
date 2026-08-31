"use client";

import { useState } from "react";
import { useTranslation } from "@/lib/i18n";
import Reveal from "@/components/Reveal";
import OfficeMap from "@/components/OfficeMap";
import { addMessage } from "@/lib/messages";
import { SITE } from "@/lib/site-config";

export default function ContactContent() {
  const { t } = useTranslation();
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "", consent: false });

  const update = (field) => (e) => {
    const value = field === "consent" ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addMessage({
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      subject: form.subject.trim(),
      message: form.message.trim(),
    });
    setSent(true);
  };

  return (
    <>
      <section className="relative pt-40 pb-16 px-6 lg:px-10 overflow-hidden">
        <div className="absolute inset-0 bp-grid pointer-events-none" />
        <div className="max-w-3xl mx-auto text-center relative">
          <Reveal as="p" className="site-tag mb-5">{t("contact.hero.eyebrow")}</Reveal>
          <Reveal as="h1" className="font-display font-semibold text-5xl md:text-6xl leading-[0.98] tracking-tight">{t("contact.hero.title")}</Reveal>
          <Reveal as="p" delay={1} className="text-stone-600 text-lg mt-6">{t("contact.hero.sub")}</Reveal>
        </div>
      </section>

      <section className="pb-28 px-6 lg:px-10 max-w-7xl mx-auto grid lg:grid-cols-[1.2fr_1fr] gap-12">
        <Reveal className="bg-stone-50 border border-stone-200 rounded-xl p-8 md:p-10">
          {!sent ? (
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm font-medium block mb-1.5" htmlFor="c-name">{t("contact.form.name")}</label>
                  <input required id="c-name" name="name" type="text" value={form.name} onChange={update("name")} className="w-full border border-stone-300 bg-paper rounded-sm px-4 py-3 text-sm focus:border-clay outline-none transition-colors" />
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1.5" htmlFor="c-email">{t("contact.form.email")}</label>
                  <input required id="c-email" name="email" type="email" value={form.email} onChange={update("email")} className="w-full border border-stone-300 bg-paper rounded-sm px-4 py-3 text-sm focus:border-clay outline-none transition-colors" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm font-medium block mb-1.5" htmlFor="c-phone">{t("contact.form.phone")}</label>
                  <input id="c-phone" name="phone" type="tel" value={form.phone} onChange={update("phone")} className="w-full border border-stone-300 bg-paper rounded-sm px-4 py-3 text-sm focus:border-clay outline-none transition-colors" />
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1.5" htmlFor="c-subject">{t("contact.form.subject")}</label>
                  <input id="c-subject" name="subject" type="text" placeholder={t("contact.form.subject.ph")} value={form.subject} onChange={update("subject")} className="w-full border border-stone-300 bg-paper rounded-sm px-4 py-3 text-sm focus:border-clay outline-none transition-colors" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium block mb-1.5" htmlFor="c-message">{t("contact.form.message")}</label>
                <textarea required id="c-message" name="message" rows={5} value={form.message} onChange={update("message")} className="w-full border border-stone-300 bg-paper rounded-sm px-4 py-3 text-sm focus:border-clay outline-none transition-colors resize-none" />
              </div>
              <label className="flex items-start gap-3 text-xs text-stone-600">
                <input required id="c-consent" name="consent" type="checkbox" checked={form.consent} onChange={update("consent")} className="mt-0.5 w-4 h-4 accent-clay shrink-0" />
                <span>{t("contact.form.consent")}</span>
              </label>
              <button type="submit" className="btn-clay bg-charcoal text-white px-8 py-3.5 rounded-sm font-medium text-sm">{t("contact.form.submit")}</button>
            </form>
          ) : (
            <div className="text-center py-10">
              <svg className="w-12 h-12 text-clay mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.4">
                <path strokeLinecap="round" strokeLinejoin="round" d="m5 13 4 4L19 7" />
              </svg>
              <h3 className="font-display font-semibold text-xl mb-2">{t("contact.form.sent.title")}</h3>
              <p className="text-stone-600 text-sm">{t("contact.form.sent.text")}</p>
            </div>
          )}
        </Reveal>

        <Reveal delay={1} className="space-y-8">
          <div>
            <p className="site-tag mb-4">{t("contact.info.title")}</p>
            <ul className="space-y-5 text-sm">
              <li className="flex items-center gap-4">
                <span className="icon-badge-sm shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21s7-6.5 7-11.5A7 7 0 0 0 5 9.5C5 14.5 12 21 12 21Z" /><circle cx="12" cy="9.5" r="2.4" strokeWidth="1.6" /></svg>
                </span>
                <div><p className="font-mono text-[11px] text-stone-500 mb-0.5">{t("contact.info.address.l")}</p><span>{SITE.address.full}</span></div>
              </li>
              <li className="flex items-center gap-4">
                <span className="icon-badge-sm shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6"><path strokeLinecap="round" strokeLinejoin="round" d="M4 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L14 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 4 6a2 2 0 0 1 2-2Z" /></svg>
                </span>
                <div><p className="font-mono text-[11px] text-stone-500 mb-0.5">{t("contact.info.phone.l")}</p><a href={`tel:${SITE.phoneHref}`} className="hover:text-clay transition-colors">{SITE.phone}</a></div>
              </li>
              <li className="flex items-center gap-4">
                <span className="icon-badge-sm shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6"><path strokeLinecap="round" strokeLinejoin="round" d="m3 6 9 6 9-6M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" /></svg>
                </span>
                <div><p className="font-mono text-[11px] text-stone-500 mb-0.5">{t("contact.info.email.l")}</p><a href={`mailto:${SITE.email}`} className="hover:text-clay transition-colors">{SITE.email}</a></div>
              </li>
              <li className="flex items-center gap-4">
                <span className="icon-badge-sm shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="8.5" strokeWidth="1.6" /><path strokeLinecap="round" d="M12 7.5V12l3 2" /></svg>
                </span>
                <div><p className="font-mono text-[11px] text-stone-500 mb-0.5">{t("contact.info.hours.l")}</p><span>{t("contact.info.hours.v")}</span></div>
              </li>
            </ul>
          </div>
          <div className="dim-line" />
          <div>
            <p className="site-tag mb-4">{t("contact.map.title")}</p>
            <OfficeMap />
          </div>
        </Reveal>
      </section>
    </>
  );
}
