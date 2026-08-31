"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import { useTranslation } from "@/lib/i18n";
import { useConsent } from "@/lib/consent";
import { SITE } from "@/lib/site-config";

const MapCanvas = dynamic(() => import("@/components/MapCanvas"), { ssr: false });

export default function OfficeMap() {
  const { t } = useTranslation();
  const { consent, setConsent, ready } = useConsent();
  const mapsAllowed = !!consent?.maps;

  const markers = useMemo(
    () => [
      {
        lat: SITE.coords.lat,
        lng: SITE.coords.lng,
        popupHtml: `${SITE.name}<br>${SITE.address.full}`,
        openPopup: true,
      },
    ],
    []
  );

  return (
    <div className="relative rounded-xl overflow-hidden border border-stone-200">
      {ready && !mapsAllowed && (
        <div className="h-64 w-full bg-stone-100 flex flex-col items-center justify-center text-center px-6 gap-3">
          <p className="text-stone-600 text-xs">{t("cookie.modal.maps.d")}</p>
          <button
            onClick={() => setConsent({ necessary: true, analytics: consent?.analytics || false, maps: true })}
            className="btn-clay bg-charcoal text-white text-xs px-4 py-2 rounded-sm"
          >
            Karte laden
          </button>
        </div>
      )}
      <div className={`h-64 w-full ${ready && mapsAllowed ? "" : "hidden"}`}>
        {ready && mapsAllowed && <MapCanvas center={[SITE.coords.lat, SITE.coords.lng]} zoom={14} markers={markers} />}
      </div>
    </div>
  );
}
