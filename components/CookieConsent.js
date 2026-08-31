"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "@/lib/i18n";
import { useConsent } from "@/lib/consent";
import { useModals } from "@/lib/modals";

export function CookieBanner() {
  const { t } = useTranslation();
  const { consent, setConsent, ready } = useConsent();
  const { openCookieModal } = useModals();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!ready) return;
    if (!consent) {
      const timer = setTimeout(() => setShow(true), 900);
      return () => clearTimeout(timer);
    }
  }, [ready, consent]);

  const accept = () => {
    setConsent({ necessary: true, analytics: true, maps: true });
    setShow(false);
  };
  const rejectAll = () => {
    setConsent({ necessary: true, analytics: false, maps: false });
    setShow(false);
  };

  return (
    <div id="cookie-banner" className={`fixed bottom-0 inset-x-0 z-50 p-4 sm:p-6 ${show ? "show" : ""}`}>
      <div className="max-w-4xl mx-auto bg-charcoal text-cream rounded-xl p-6 shadow-2xl flex flex-col md:flex-row md:items-center gap-5">
        <div className="flex-1">
          <p className="font-display font-semibold mb-1.5">{t("cookie.title")}</p>
          <p className="text-sm text-mist">{t("cookie.text")}</p>
        </div>
        <div className="flex flex-wrap gap-2.5 shrink-0">
          <button onClick={openCookieModal} className="border border-white/25 hover:border-white text-sm px-4 py-2.5 rounded-sm transition-colors">
            {t("cookie.customize")}
          </button>
          <button onClick={rejectAll} className="border border-white/25 hover:border-white text-sm px-4 py-2.5 rounded-sm transition-colors">
            {t("cookie.reject")}
          </button>
          <button onClick={accept} className="bg-clay hover:bg-clay-light transition-colors text-sm px-4 py-2.5 rounded-sm font-medium">
            {t("cookie.accept")}
          </button>
        </div>
      </div>
    </div>
  );
}

export function CookieModal() {
  const { t } = useTranslation();
  const { consent, setConsent } = useConsent();
  const { cookieModalOpen, closeCookieModal } = useModals();
  const [analytics, setAnalytics] = useState(false);
  const [maps, setMaps] = useState(true);

  useEffect(() => {
    if (cookieModalOpen) {
      setAnalytics(!!consent?.analytics);
      setMaps(consent?.maps !== false);
    }
  }, [cookieModalOpen, consent]);

  if (!cookieModalOpen) return null;

  const save = () => {
    setConsent({ necessary: true, analytics, maps });
    closeCookieModal();
  };

  return (
    <div className="fixed inset-0 z-[60] bg-charcoal/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={(e) => e.target === e.currentTarget && closeCookieModal()}>
      <div className="bg-paper rounded-xl max-w-lg w-full p-8">
        <h3 className="font-display font-semibold text-2xl mb-6">{t("cookie.modal.title")}</h3>
        <div className="space-y-5">
          <div className="flex items-start justify-between gap-4 border-b border-stone-200 pb-4">
            <div>
              <p className="font-medium text-sm">{t("cookie.modal.necessary.t")}</p>
              <p className="text-xs text-stone-600 mt-1">{t("cookie.modal.necessary.d")}</p>
            </div>
            <input type="checkbox" checked disabled className="mt-1 w-4 h-4 accent-clay" />
          </div>
          <div className="flex items-start justify-between gap-4 border-b border-stone-200 pb-4">
            <div>
              <p className="font-medium text-sm">{t("cookie.modal.analytics.t")}</p>
              <p className="text-xs text-stone-600 mt-1">{t("cookie.modal.analytics.d")}</p>
            </div>
            <input type="checkbox" checked={analytics} onChange={(e) => setAnalytics(e.target.checked)} className="mt-1 w-4 h-4 accent-clay" />
          </div>
          <div className="flex items-start justify-between gap-4 pb-2">
            <div>
              <p className="font-medium text-sm">{t("cookie.modal.maps.t")}</p>
              <p className="text-xs text-stone-600 mt-1">{t("cookie.modal.maps.d")}</p>
            </div>
            <input type="checkbox" checked={maps} onChange={(e) => setMaps(e.target.checked)} className="mt-1 w-4 h-4 accent-clay" />
          </div>
        </div>
        <div className="flex gap-3 mt-8">
          <button onClick={closeCookieModal} className="flex-1 border border-stone-300 py-2.5 rounded-sm text-sm">{t("impressum.close")}</button>
          <button onClick={save} className="flex-1 bg-charcoal text-white py-2.5 rounded-sm text-sm">{t("cookie.modal.save")}</button>
        </div>
      </div>
    </div>
  );
}
