"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";

/* Low-level Leaflet mount. Only ever loaded client-side via next/dynamic
   (ssr:false) since Leaflet touches `window` at import time.

   markers: [{ lat, lng, popupHtml, openPopup, draggable, onDragEnd(lat,lng) }]
   onClick: (lat, lng) => void — fired when the map itself is clicked
   (used by the admin location picker to drop/move a pin). */
export default function MapCanvas({ center, zoom = 7.4, scrollWheelZoom = false, markers = [], onClick, flyTo, flyToZoom }) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const onClickRef = useRef(onClick);

  useEffect(() => {
    onClickRef.current = onClick;
  }, [onClick]);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    const map = L.map(containerRef.current, { scrollWheelZoom, zoomControl: true }).setView(center, zoom);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(map);
    map.on("click", (e) => {
      onClickRef.current?.(e.latlng.lat, e.latlng.lng);
    });
    mapRef.current = map;
    return () => {
      map.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !flyTo) return;
    map.flyTo(flyTo, flyToZoom ?? map.getZoom(), { duration: 0.8 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flyTo && flyTo[0], flyTo && flyTo[1]]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    markersRef.current.forEach((m) => map.removeLayer(m));
    markersRef.current = [];
    markers.forEach(({ lat, lng, popupHtml, openPopup, draggable, onDragEnd }) => {
      if (typeof lat !== "number" || typeof lng !== "number") return;
      const icon = L.divIcon({
        className: "",
        html: '<div class="bauart-pin"></div>',
        iconSize: [26, 26],
        iconAnchor: [13, 26],
        popupAnchor: [0, -24],
      });
      const marker = L.marker([lat, lng], { icon, draggable: !!draggable }).addTo(map);
      if (popupHtml) marker.bindPopup(popupHtml);
      if (openPopup) marker.openPopup();
      if (draggable && onDragEnd) {
        marker.on("dragend", () => {
          const pos = marker.getLatLng();
          onDragEnd(pos.lat, pos.lng);
        });
      }
      markersRef.current.push(marker);
    });
  }, [markers]);

  return <div ref={containerRef} className="h-full w-full" />;
}
