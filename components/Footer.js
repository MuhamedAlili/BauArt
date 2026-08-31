"use client";

import Link from "next/link";
import { useTranslation } from "@/lib/i18n";
import { useModals } from "@/lib/modals";
import { SITE } from "@/lib/site-config";

export default function Footer() {
  const { t } = useTranslation();
  const { openImpressum, openPrivacy, openCookieModal } = useModals();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-stone-50 border-t border-stone-200 pt-20 pb-8 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto grid md:grid-cols-[1.4fr_1fr_1fr_1fr] gap-12 pb-14">
        <div>
          <div className="flex items-center gap-3 mb-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/logo.png" alt="BauArt" className="h-10 w-10 object-contain" />
            <span className="font-display font-semibold text-lg">BauArt</span>
          </div>
          <p className="text-sm text-stone-600 max-w-xs">{t("footer.tagline")}</p>
        </div>
        <div>
          <p className="font-mono text-xs tracking-wide text-stone-500 mb-4">{t("footer.nav.title")}</p>
          <ul className="space-y-2.5 text-sm">
            <li><Link href="/" className="hover:text-clay transition-colors">{t("nav.home")}</Link></li>
            <li><Link href="/about" className="hover:text-clay transition-colors">{t("nav.about")}</Link></li>
            <li><Link href="/projects" className="hover:text-clay transition-colors">{t("nav.projects")}</Link></li>
            <li><Link href="/contact" className="hover:text-clay transition-colors">{t("nav.contact")}</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-mono text-xs tracking-wide text-stone-500 mb-4">{t("footer.legal.title")}</p>
          <ul className="space-y-2.5 text-sm">
            <li><button onClick={openImpressum} className="hover:text-clay transition-colors text-left">{t("footer.legal.impressum")}</button></li>
            <li><button onClick={openPrivacy} className="hover:text-clay transition-colors text-left">{t("footer.legal.privacy")}</button></li>
            <li><button onClick={openCookieModal} className="hover:text-clay transition-colors text-left">{t("footer.legal.cookies")}</button></li>
          </ul>
        </div>
        <div>
          <p className="font-mono text-xs tracking-wide text-stone-500 mb-4">{t("footer.contact.title")}</p>
          <ul className="space-y-2.5 text-sm text-stone-600">
            <li>{SITE.address.full}</li>
            <li>{SITE.phone}</li>
            <li>{SITE.email}</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto pt-8 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
        <p>© {year} BauArt Stein & Garten. {t("footer.rights")}</p>
        <Link href="/admin" className="font-mono hover:text-clay transition-colors">{t("footer.admin")}</Link>
      </div>
    </footer>
  );
}
