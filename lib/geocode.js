/* Place/address search for the admin location picker.
   Uses the public Photon API (OSM-based, komoot) — no API key, CORS-friendly,
   built for search-as-you-type (unlike Nominatim, which discourages that use).
   Biased toward Pinneberg so "mcdonalds" finds the Pinneberg branch first. */
import { SITE } from "@/lib/site-config";

const ENDPOINT = "https://photon.komoot.io/api/";

function formatLabel(props) {
  const parts = [];
  const street = [props.street, props.housenumber].filter(Boolean).join(" ");
  const locality = [props.postcode, props.city || props.town || props.village].filter(Boolean).join(" ");

  if (props.name) parts.push(props.name);
  const addressLine = [street, locality].filter(Boolean).join(", ");
  if (addressLine && addressLine !== props.name) parts.push(addressLine);
  if (!parts.length && props.country) parts.push(props.country);

  return parts.join(" — ") || props.osm_value || "—";
}

export async function searchPlaces(query, { signal } = {}) {
  const q = query.trim();
  if (q.length < 3) return [];

  const url = new URL(ENDPOINT);
  url.searchParams.set("q", q);
  url.searchParams.set("limit", "6");
  url.searchParams.set("lang", "de");
  url.searchParams.set("lat", String(SITE.coords.lat));
  url.searchParams.set("lon", String(SITE.coords.lng));

  const res = await fetch(url.toString(), { signal });
  if (!res.ok) throw new Error("Suche fehlgeschlagen");
  const data = await res.json();

  return (data.features || [])
    .filter((f) => Array.isArray(f.geometry?.coordinates))
    .map((f, i) => ({
      id: f.properties.osm_id ? `${f.properties.osm_type}${f.properties.osm_id}` : String(i),
      label: formatLabel(f.properties),
      name: f.properties.name || "",
      lat: f.geometry.coordinates[1],
      lng: f.geometry.coordinates[0],
    }));
}
