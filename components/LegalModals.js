"use client";

import { useTranslation } from "@/lib/i18n";
import { useModals } from "@/lib/modals";
import { SITE } from "@/lib/site-config";

function CloseIcon() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6">
      <path strokeLinecap="round" d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function ImpressumModal() {
  const { t } = useTranslation();
  const { impressumOpen, closeImpressum } = useModals();
  if (!impressumOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-charcoal/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={(e) => e.target === e.currentTarget && closeImpressum()}>
      <div className="bg-paper rounded-xl max-w-xl w-full p-8 max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-display font-semibold text-2xl">{t("impressum.title")}</h3>
          <button aria-label="Schließen" className="p-1" onClick={closeImpressum}><CloseIcon /></button>
        </div>
        <p className="text-xs bg-stone-100 border border-stone-200 rounded-sm px-3 py-2 mb-6 text-stone-600">
          {t("impressum.placeholder.note")}
        </p>
        <div className="space-y-6 text-sm">
          <div>
            <p className="font-mono text-xs text-clay mb-1">{t("impressum.company")}</p>
            <p>{SITE.legalName}<br />{SITE.address.street}<br />{SITE.address.zipCity}</p>
          </div>
          <div>
            <p className="font-mono text-xs text-clay mb-1">{t("impressum.represented")}</p>
            <p>Max Mustermann, Geschäftsführer</p>
          </div>
          <div>
            <p className="font-mono text-xs text-clay mb-1">{t("impressum.contact")}</p>
            <p>Telefon: {SITE.phone}<br />E-Mail: {SITE.email}</p>
          </div>
          <div>
            <p className="font-mono text-xs text-clay mb-1">{t("impressum.register")}</p>
            <p>Eintragung im Handelsregister.<br />Registergericht: —<br />Registernummer: —</p>
          </div>
          <div>
            <p className="font-mono text-xs text-clay mb-1">{t("impressum.vat")}</p>
            <p>DE000000000</p>
          </div>
          <div>
            <p className="font-mono text-xs text-clay mb-1">{t("impressum.responsible")}</p>
            <p>Max Mustermann, {SITE.address.full}</p>
          </div>
          <div>
            <p className="font-mono text-xs text-clay mb-1">{t("impressum.dispute")}</p>
            <p className="text-stone-600">{t("impressum.dispute.text")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PrivacyModal() {
  const { t } = useTranslation();
  const { privacyOpen, closePrivacy } = useModals();
  if (!privacyOpen) return null;

  const leadingSections = ["s1", "s2", "s3", "s4", "s5"];
  const trailingSections = ["s7", "s8"];

  return (
    <div className="fixed inset-0 z-[60] bg-charcoal/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={(e) => e.target === e.currentTarget && closePrivacy()}>
      <div className="bg-paper rounded-xl max-w-xl w-full p-8 max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-display font-semibold text-2xl">{t("privacy.title")}</h3>
          <button aria-label="Schließen" className="p-1" onClick={closePrivacy}><CloseIcon /></button>
        </div>
        <div className="space-y-6 text-sm">
          {leadingSections.map((s) => (
            <div key={s}>
              <p className="font-mono text-xs text-clay mb-1">{t(`privacy.${s}.title`)}</p>
              <p className="text-stone-600">{t(`privacy.${s}.text`)}</p>
            </div>
          ))}
          <div>
            <p className="font-mono text-xs text-clay mb-1">{t("privacy.s6.title")}</p>
            <p className="font-medium mt-2">{t("privacy.s6.fonts.t")}</p>
            <p className="text-stone-600">{t("privacy.s6.fonts.d")}</p>
            <p className="font-medium mt-3">{t("privacy.s6.maps.t")}</p>
            <p className="text-stone-600">{t("privacy.s6.maps.d")}</p>
          </div>
          {trailingSections.map((s) => (
            <div key={s}>
              <p className="font-mono text-xs text-clay mb-1">{t(`privacy.${s}.title`)}</p>
              <p className="text-stone-600">{t(`privacy.${s}.text`)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
