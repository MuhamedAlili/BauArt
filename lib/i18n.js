"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

/* =========================================================
   BauArt — i18n dictionary (Deutsch / English)
   Do not translate: "BauArt", "Stein & Garten", "Bauart Stein und Garten"
   ========================================================= */

export const DEFAULT_LANG = "de";
const LANG_STORAGE_KEY = "bauart_lang";

export const I18N = {
  de: {
    "nav.home": "Start",
    "nav.about": "Über uns",
    "nav.projects": "Projekte",
    "nav.contact": "Kontakt",
    "nav.cta": "Angebot anfragen",
    "loader.label": "Wird geladen",

    "home.hero.eyebrow": "Hoch- & Tiefbau · Garten- & Landschaftsbau",
    "home.hero.title1": "Wir bauen,",
    "home.hero.title2": "was bleibt.",
    "home.hero.sub":
      "BauArt Stein & Garten verbindet solides Handwerk mit gestalterischem Anspruch — von der Fundamentplatte bis zum letzten Pflasterstein.",
    "home.hero.cta1": "Projekt besprechen",
    "home.hero.cta2": "Unsere Arbeiten",
    "home.hero.stat1n": "18+",
    "home.hero.stat1l": "Jahre Erfahrung",
    "home.hero.stat2n": "240+",
    "home.hero.stat2l": "Realisierte Projekte",
    "home.hero.stat3n": "12",
    "home.hero.stat3l": "Handwerker im Team",

    "home.marquee.1": "Natursteinmauern",
    "home.marquee.2": "Gartenanlagen",
    "home.marquee.3": "Pflasterarbeiten",
    "home.marquee.4": "Terrassenbau",
    "home.marquee.5": "Stützmauern",
    "home.marquee.6": "Bewässerungssysteme",
    "home.marquee.7": "Rohbau",
    "home.marquee.8": "Außenanlagen",

    "home.services.eyebrow": "Leistungen",
    "home.services.title": "Zwei Gewerke, ein Handwerk",
    "home.services.sub":
      "Der Name ist Programm: Wir bauen mit Stein und wir gestalten mit Garten — und meistens beides zusammen.",
    "home.services.s1.title": "Stein & Rohbau",
    "home.services.s1.text":
      "Fundamente, Mauerwerk, Naturstein­verblendung und tragende Konstruktionen — präzise geplant und solide ausgeführt.",
    "home.services.s2.title": "Garten & Außenanlage",
    "home.services.s2.text":
      "Terrassen, Wege, Stützmauern und Bepflanzung, die ein Grundstück zu einem fertigen Ort machen.",
    "home.services.s3.title": "Pflaster & Wege",
    "home.services.s3.text":
      "Einfahrten, Terrassenbeläge und Gartenwege in Naturstein, Klinker oder Betonwerkstein.",
    "home.services.s4.title": "Sanierung & Umbau",
    "home.services.s4.text":
      "Bestehende Bau- und Gartensubstanz fachgerecht erneuern, erweitern und aufwerten.",

    "home.map.eyebrow": "Standorte",
    "home.map.title": "Wo wir gebaut haben",
    "home.map.sub": "Eine Auswahl unserer Projekte — verortet, dokumentiert, nachprüfbar.",
    "home.map.more": "Weitere Projekte",
    "projects.hero.eyebrow": "Alle Projekte",
    "projects.hero.title": "Jeder Standort, jedes Projekt",
    "projects.hero.sub": "Die vollständige Übersicht unserer Arbeiten — filterbar nach Gewerk, verortet auf der Karte.",
    "filter.alle": "Alle",
    "filter.stein": "Stein & Rohbau",
    "filter.garten": "Garten",
    "filter.pflaster": "Pflaster",

    "home.process.eyebrow": "Ablauf",
    "home.process.title": "Von der Idee zur Übergabe",
    "home.process.p1.title": "Beratung vor Ort",
    "home.process.p1.text": "Wir sehen uns das Grundstück an und besprechen Ziele, Budget und Zeitrahmen.",
    "home.process.p2.title": "Planung & Angebot",
    "home.process.p2.text": "Konkreter Entwurf, Materialwahl und ein transparentes Festpreisangebot.",
    "home.process.p3.title": "Ausführung",
    "home.process.p3.text": "Unser Team baut termintreu, sauber und mit kurzen Kommunikationswegen.",
    "home.process.p4.title": "Übergabe",
    "home.process.p4.text": "Abnahme gemeinsam vor Ort, inklusive Pflegehinweisen und Gewährleistung.",

    "home.cta.title": "Bereit für Ihr nächstes Projekt?",
    "home.cta.sub": "Ob neue Terrasse oder komplette Außenanlage — wir beraten unverbindlich und vor Ort.",
    "home.cta.button": "Jetzt Kontakt aufnehmen",

    "about.hero.eyebrow": "Über uns",
    "about.hero.title": "Handwerk mit Haltung",
    "about.hero.sub":
      "BauArt Stein & Garten wurde aus der Überzeugung gegründet, dass gute Außenanlagen genauso sorgfältig geplant werden müssen wie Gebäude.",

    "about.welcome.eyebrow": "Willkommen",
    "about.welcome.title": "Ihr Partner für Bau & Garten in Pinneberg",
    "about.welcome.p1":
      "Herzlich willkommen bei Bauart Stein und Garten, Ihrem persönlichen Ansprechpartner für Themen rund um den Bau- und die Gartengestaltung in Pinneberg und Umgebung. Bei Bauart Stein und Garten bieten wir Ihnen individuelle und hochwertige Lösungen für alle Bau- und Gartenprojekte. Egal, ob Sie einen Garten zum Wohlfühlen, eine moderne Terrasse oder eine komplette Neugestaltung Ihrer Außenanlage wünschen – wir sind Ihr zuverlässiger Partner.",

    "about.mission.title": "Unsere Mission",
    "about.mission.text":
      "Unser Team aus Fachleuten begleitet Sie von der ersten Beratung bis hin zur fertigen Umsetzung. Wir legen großen Wert auf eine persönliche und transparente Kommunikation, damit jedes Projekt genau nach Ihren Wünschen und Vorstellungen realisiert wird. Dabei bieten wir Ihnen nicht nur Lösungen im Garten- und Landschaftsbau, sondern auch im Bereich Tief- und Hochbau sowie Pflasterarbeiten, Zaunbau und vieles mehr.",

    "about.vision.title": "Unsere Vision",
    "about.vision.text":
      "Ein besonderes Highlight bei uns: Wir erstellen 3D-Darstellungen Ihrer Projekte, die es Ihnen ermöglichen, Ihre zukünftigen Außenanlagen oder Bauvorhaben schon im Voraus in einer realistischen und detailgetreuen Darstellung zu sehen. So können Sie Ihre Ideen visuell erleben und nach Belieben anpassen, bevor wir mit der Umsetzung beginnen.",

    "about.values.eyebrow": "Grundsätze",
    "about.values.title": "Worauf wir bestehen",
    "about.v1.title": "Solide Substanz",
    "about.v1.text": "Kein Ergebnis ist besser als sein Fundament — sichtbar und unsichtbar.",
    "about.v2.title": "Ehrliche Kalkulation",
    "about.v2.text": "Ein Festpreis, der hält, was er verspricht. Ohne versteckte Posten.",
    "about.v3.title": "Termintreue",
    "about.v3.text": "Wir bauen nach Zeitplan — und sagen frühzeitig Bescheid, wenn sich etwas ändert.",
    "about.v4.title": "Gestalterisches Auge",
    "about.v4.text": "Funktion und Form gehören für uns zusammen, nicht nacheinander.",
    "about.stats.title": "BauArt in Zahlen",

    "contact.hero.eyebrow": "Kontakt",
    "contact.hero.title": "Lassen Sie uns bauen",
    "contact.hero.sub": "Erzählen Sie uns von Ihrem Grundstück — wir melden uns innerhalb von zwei Werktagen.",
    "contact.form.name": "Name",
    "contact.form.email": "E-Mail",
    "contact.form.phone": "Telefon (optional)",
    "contact.form.subject": "Betreff",
    "contact.form.subject.ph": "z. B. Terrasse, Gartenmauer, Rohbau …",
    "contact.form.message": "Nachricht",
    "contact.form.consent":
      "Ich habe die Datenschutzhinweise gelesen und stimme der Verarbeitung meiner Angaben zur Bearbeitung meiner Anfrage zu.",
    "contact.form.submit": "Nachricht senden",
    "contact.form.sent.title": "Danke, angekommen!",
    "contact.form.sent.text": "Ihre Nachricht wurde erfasst. Wir melden uns in Kürze bei Ihnen.",
    "contact.info.title": "Direkt erreichbar",
    "contact.info.address.l": "Adresse",
    "contact.info.phone.l": "Telefon",
    "contact.info.email.l": "E-Mail",
    "contact.info.hours.l": "Bürozeiten",
    "contact.info.hours.v": "Mo – Fr",
    "contact.map.title": "Unser Standort",

    "footer.tagline": "Solides Handwerk. Gestaltete Außenräume.",
    "footer.nav.title": "Navigation",
    "footer.legal.title": "Rechtliches",
    "footer.legal.impressum": "Impressum",
    "footer.legal.privacy": "Datenschutz",
    "footer.legal.cookies": "Cookie-Einstellungen",
    "footer.contact.title": "Kontakt",
    "footer.rights": "Alle Rechte vorbehalten.",
    "footer.admin": "Admin",

    "cookie.title": "Diese Website verwendet Cookies",
    "cookie.text":
      "Wir nutzen notwendige Cookies für den Betrieb der Seite sowie optionale Cookies für Statistik und Kartendarstellung. Sie können Ihre Auswahl jederzeit im Footer unter „Cookie-Einstellungen“ ändern.",
    "cookie.accept": "Alle akzeptieren",
    "cookie.reject": "Nur notwendige",
    "cookie.customize": "Auswahl anpassen",
    "cookie.modal.title": "Cookie-Einstellungen",
    "cookie.modal.necessary.t": "Notwendig",
    "cookie.modal.necessary.d":
      "Erforderlich für grundlegende Funktionen wie Sprachwahl und Navigation. Kann nicht deaktiviert werden.",
    "cookie.modal.analytics.t": "Statistik",
    "cookie.modal.analytics.d": "Hilft uns zu verstehen, wie die Seite genutzt wird, um sie zu verbessern.",
    "cookie.modal.maps.t": "Karten",
    "cookie.modal.maps.d": "Lädt Kartenkacheln von OpenStreetMap, um Projektstandorte anzuzeigen.",
    "cookie.modal.save": "Auswahl speichern",

    "impressum.title": "Impressum",
    "impressum.company": "Angaben gemäß § 5 TMG",
    "impressum.represented": "Vertreten durch",
    "impressum.contact": "Kontakt",
    "impressum.register": "Registereintrag",
    "impressum.vat": "Umsatzsteuer-ID",
    "impressum.responsible": "Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV",
    "impressum.dispute": "EU-Streitschlichtung",
    "impressum.dispute.text":
      "Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit. Wir sind zur Teilnahme an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle nicht verpflichtet.",
    "impressum.placeholder.note":
      "Handelsregister- und USt-ID-Angaben sind Platzhalter — bitte im Admin-Bereich durch die tatsächlichen Firmenangaben ersetzen.",
    "impressum.close": "Schließen",

    "privacy.title": "Datenschutzerklärung",
    "privacy.s1.title": "1. Datenschutz auf einen Blick",
    "privacy.s1.text":
      "Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen.",
    "privacy.s2.title": "2. Verantwortliche Stelle",
    "privacy.s2.text": "Verantwortlich für die Datenverarbeitung auf dieser Website ist die im Impressum genannte Stelle.",
    "privacy.s3.title": "3. Datenerfassung auf dieser Website",
    "privacy.s3.text":
      "Beim Aufruf dieser Website erfasst der Hosting-Anbieter automatisch Server-Log-Dateien, die Ihr Browser übermittelt. Diese Daten sind nicht bestimmten Personen zuordenbar.",
    "privacy.s4.title": "4. Kontaktformular",
    "privacy.s4.text":
      "Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, speichern wir Ihre Angaben zur Bearbeitung der Anfrage. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.",
    "privacy.s5.title": "5. Cookies",
    "privacy.s5.text":
      "Diese Website verwendet Cookies. Optionale Cookies werden nur mit Ihrer Einwilligung gesetzt. Ihre Auswahl können Sie jederzeit im Footer unter „Cookie-Einstellungen“ ändern.",
    "privacy.s6.title": "6. Externe Dienste",
    "privacy.s6.fonts.t": "Google Fonts",
    "privacy.s6.fonts.d":
      "Diese Website nutzt „Google Fonts“ zur einheitlichen Darstellung von Schriftarten, ein Dienst der Google Ireland Limited.",
    "privacy.s6.maps.t": "OpenStreetMap / Leaflet",
    "privacy.s6.maps.d":
      "Kartenkacheln werden erst nach Ihrer Einwilligung (Cookie-Kategorie „Karten“) von Servern der OpenStreetMap Foundation geladen.",
    "privacy.s7.title": "7. Ihre Rechte",
    "privacy.s7.text":
      "Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten Daten sowie ein Recht auf Berichtigung, Löschung, Einschränkung der Verarbeitung und Widerspruch.",
    "privacy.s8.title": "8. SSL-/TLS-Verschlüsselung",
    "privacy.s8.text":
      "Diese Seite sollte aus Sicherheitsgründen eine SSL- bzw. TLS-Verschlüsselung nutzen, erkennbar am Schloss-Symbol in der Adresszeile.",

    "admin.login.title": "Admin-Anmeldung",
    "admin.login.sub": "Nur für internes Team.",
    "admin.login.user": "Benutzername",
    "admin.login.pass": "Passwort",
    "admin.login.button": "Anmelden",
    "admin.login.hint": "Demo-Zugang: admin / bauart2026",
    "admin.login.error": "Benutzername oder Passwort ist falsch.",
    "admin.panel.title": "Admin-Bereich",
    "admin.logout": "Abmelden",
    "admin.tab.projects": "Projektstandorte",
    "admin.tab.messages": "Nachrichten",
    "admin.tab.content": "Inhalte",
    "admin.projects.add": "Standort hinzufügen",
    "admin.projects.empty": "Noch keine Standorte angelegt.",
    "admin.projects.reset": "↺ Zurücksetzen",
    "admin.projects.resetConfirm": "Alle Standorte auf die Standardwerte zurücksetzen?",
    "admin.projects.deleteConfirm": "Diesen Standort löschen?",
    "admin.messages.empty": "Noch keine Nachrichten eingegangen.",
    "admin.messages.new": "NEU",
    "admin.messages.markRead": "Als gelesen markieren",
    "admin.messages.delete": "Löschen",
    "admin.messages.deleteConfirm": "Diese Nachricht löschen?",
    "admin.form.title": "Titel",
    "admin.form.title.de": "Titel (Deutsch)",
    "admin.form.title.en": "Titel (Englisch)",
    "admin.form.desc.de": "Beschreibung (Deutsch)",
    "admin.form.desc.en": "Beschreibung (Englisch)",
    "admin.form.category": "Kategorie",
    "admin.form.location": "Standort",
    "admin.form.search": "Ort oder Adresse suchen",
    "admin.form.searchPlaceholder": "z. B. McDonald's Pinneberg oder Elmshorner Straße 170",
    "admin.form.searchHint": "Suche nach Adressen oder Orten (z. B. Geschäftsnamen) über OpenStreetMap.",
    "admin.form.searchEmpty": "Keine Ergebnisse.",
    "admin.form.searchError": "Suche fehlgeschlagen. Bitte erneut versuchen.",
    "admin.form.mapHint": "Auf die Karte klicken oder den Marker ziehen, um den Standort zu setzen.",
    "admin.form.lat": "Breitengrad (lat)",
    "admin.form.lng": "Längengrad (lng)",
    "admin.form.desc": "Beschreibung",
    "admin.form.image": "Bild",
    "admin.form.imageChoose": "Bild auswählen",
    "admin.form.imageChange": "Bild ändern",
    "admin.form.imageRemove": "Entfernen",
    "admin.form.imageHint": "PNG, JPG, JPEG oder WEBP · wird automatisch komprimiert und im Projekt gespeichert.",
    "admin.form.imageError": "Bild konnte nicht verarbeitet werden.",
    "admin.form.year": "Jahr",
    "admin.form.save": "Speichern",
    "admin.form.cancel": "Abbrechen",
    "admin.form.newTitle": "Neuer Standort",
    "admin.actions.edit": "Bearbeiten",
    "admin.actions.delete": "Löschen",
    "admin.content.note":
      "Diese Demo speichert Änderungen lokal im Browser (localStorage). Für den produktiven Einsatz sollte der Admin-Bereich an ein echtes Backend mit Login-Schutz angebunden werden.",
    "admin.back": "← Zur Website",
  },

  en: {
    "nav.home": "Home",
    "nav.about": "About",
    "nav.projects": "Projects",
    "nav.contact": "Contact",
    "nav.cta": "Request a quote",
    "loader.label": "Loading",

    "home.hero.eyebrow": "Construction · Stone & Landscape",
    "home.hero.title1": "We build",
    "home.hero.title2": "what lasts.",
    "home.hero.sub":
      "BauArt Stein & Garten pairs solid craftsmanship with a designer's eye — from the foundation slab to the last paving stone.",
    "home.hero.cta1": "Discuss a project",
    "home.hero.cta2": "See our work",
    "home.hero.stat1n": "18+",
    "home.hero.stat1l": "Years of experience",
    "home.hero.stat2n": "240+",
    "home.hero.stat2l": "Projects completed",
    "home.hero.stat3n": "12",
    "home.hero.stat3l": "Craftspeople on site",

    "home.marquee.1": "Natural stone walls",
    "home.marquee.2": "Garden landscaping",
    "home.marquee.3": "Paving",
    "home.marquee.4": "Terraces",
    "home.marquee.5": "Retaining walls",
    "home.marquee.6": "Irrigation systems",
    "home.marquee.7": "Shell construction",
    "home.marquee.8": "Outdoor spaces",

    "home.services.eyebrow": "Services",
    "home.services.title": "Two trades, one craft",
    "home.services.sub":
      "The name says it all: we build with stone and shape with garden — usually both at once.",
    "home.services.s1.title": "Stone & Structure",
    "home.services.s1.text":
      "Foundations, masonry, natural stone facing and load-bearing structures — planned precisely, built solidly.",
    "home.services.s2.title": "Garden & Outdoor Space",
    "home.services.s2.text":
      "Terraces, paths, retaining walls and planting that turn a plot of land into a finished place.",
    "home.services.s3.title": "Paving & Pathways",
    "home.services.s3.text": "Driveways, terrace surfaces and garden paths in natural stone, clinker or cast stone.",
    "home.services.s4.title": "Renovation & Rebuild",
    "home.services.s4.text": "Upgrading and extending existing structures and gardens the right way.",

    "home.map.eyebrow": "Locations",
    "home.map.title": "Where we've built",
    "home.map.sub": "A selection of our projects — located, documented, verifiable.",
    "home.map.more": "More projects",
    "projects.hero.eyebrow": "All projects",
    "projects.hero.title": "Every location, every project",
    "projects.hero.sub": "The full picture of our work — filterable by trade, located on the map.",
    "filter.alle": "All",
    "filter.stein": "Stone & Structure",
    "filter.garten": "Garden",
    "filter.pflaster": "Paving",

    "home.process.eyebrow": "Process",
    "home.process.title": "From idea to handover",
    "home.process.p1.title": "On-site consultation",
    "home.process.p1.text": "We visit the plot and talk through goals, budget and timeline.",
    "home.process.p2.title": "Planning & quote",
    "home.process.p2.text": "A concrete design, material choices and a transparent fixed-price quote.",
    "home.process.p3.title": "Construction",
    "home.process.p3.text": "Our team builds on schedule, cleanly, with short communication lines.",
    "home.process.p4.title": "Handover",
    "home.process.p4.text": "On-site walkthrough together, including care notes and warranty.",

    "home.cta.title": "Ready for your next project?",
    "home.cta.sub": "Whether a new terrace or a full outdoor renovation — we advise on site, no obligation.",
    "home.cta.button": "Get in touch",

    "about.hero.eyebrow": "About us",
    "about.hero.title": "Craft with conviction",
    "about.hero.sub":
      "BauArt Stein & Garten was founded on the belief that good outdoor spaces deserve the same careful planning as buildings.",

    "about.welcome.eyebrow": "Welcome",
    "about.welcome.title": "Your partner for building & garden in Pinneberg",
    "about.welcome.p1":
      "Welcome to Bauart Stein und Garten, your personal partner for everything to do with construction and garden design in Pinneberg and the surrounding area. At Bauart Stein und Garten we offer individual, high-quality solutions for every building and garden project. Whether you're dreaming of a garden to relax in, a modern terrace, or a complete redesign of your outdoor space — we're your reliable partner.",

    "about.mission.title": "Our Mission",
    "about.mission.text":
      "Our team of specialists guides you from the very first consultation through to the finished result. We place great value on personal, transparent communication, so that every project is realised exactly to your wishes and ideas. Beyond garden and landscape construction, we also offer civil and structural engineering, paving work, fencing and much more.",

    "about.vision.title": "Our Vision",
    "about.vision.text":
      "A particular highlight of working with us: we create 3D renderings of your project, letting you see your future outdoor space or building project in advance in a realistic, true-to-detail visualisation. That way you can experience your ideas visually and adjust them as you like before we begin construction.",

    "about.values.eyebrow": "Principles",
    "about.values.title": "What we insist on",
    "about.v1.title": "Solid substance",
    "about.v1.text": "No result is better than its foundation — seen or unseen.",
    "about.v2.title": "Honest pricing",
    "about.v2.text": "A fixed price that holds. No hidden line items.",
    "about.v3.title": "Reliable timing",
    "about.v3.text": "We build to schedule — and speak up early if anything changes.",
    "about.v4.title": "A designer's eye",
    "about.v4.text": "Function and form belong together for us, not one after the other.",
    "about.stats.title": "BauArt by the numbers",

    "contact.hero.eyebrow": "Contact",
    "contact.hero.title": "Let's start building",
    "contact.hero.sub": "Tell us about your site — we'll get back to you within two business days.",
    "contact.form.name": "Name",
    "contact.form.email": "Email",
    "contact.form.phone": "Phone (optional)",
    "contact.form.subject": "Subject",
    "contact.form.subject.ph": "e.g. terrace, garden wall, shell construction …",
    "contact.form.message": "Message",
    "contact.form.consent": "I've read the privacy notice and agree that my details may be processed to handle my enquiry.",
    "contact.form.submit": "Send message",
    "contact.form.sent.title": "Thanks, received!",
    "contact.form.sent.text": "Your message has been logged. We'll be in touch shortly.",
    "contact.info.title": "Reach us directly",
    "contact.info.address.l": "Address",
    "contact.info.phone.l": "Phone",
    "contact.info.email.l": "Email",
    "contact.info.hours.l": "Office hours",
    "contact.info.hours.v": "Mon – Fri",
    "contact.map.title": "Our location",

    "footer.tagline": "Solid craftsmanship. Designed outdoor spaces.",
    "footer.nav.title": "Navigation",
    "footer.legal.title": "Legal",
    "footer.legal.impressum": "Impressum",
    "footer.legal.privacy": "Privacy",
    "footer.legal.cookies": "Cookie settings",
    "footer.contact.title": "Contact",
    "footer.rights": "All rights reserved.",
    "footer.admin": "Admin",

    "cookie.title": "This site uses cookies",
    "cookie.text":
      "We use necessary cookies to run the site, plus optional cookies for statistics and map display. You can change your choice any time in the footer under “Cookie settings”.",
    "cookie.accept": "Accept all",
    "cookie.reject": "Necessary only",
    "cookie.customize": "Customise",
    "cookie.modal.title": "Cookie settings",
    "cookie.modal.necessary.t": "Necessary",
    "cookie.modal.necessary.d":
      "Required for core functions like language choice and navigation. Cannot be turned off.",
    "cookie.modal.analytics.t": "Statistics",
    "cookie.modal.analytics.d": "Helps us understand how the site is used so we can improve it.",
    "cookie.modal.maps.t": "Maps",
    "cookie.modal.maps.d": "Loads map tiles from OpenStreetMap to display project locations.",
    "cookie.modal.save": "Save selection",

    "impressum.title": "Impressum",
    "impressum.company": "Information pursuant to § 5 TMG",
    "impressum.represented": "Represented by",
    "impressum.contact": "Contact",
    "impressum.register": "Register entry",
    "impressum.vat": "VAT ID",
    "impressum.responsible": "Responsible for content per § 55 (2) RStV",
    "impressum.dispute": "EU dispute resolution",
    "impressum.dispute.text":
      "The European Commission provides a platform for online dispute resolution (ODR). We are not obliged or willing to take part in dispute resolution proceedings before a consumer arbitration board.",
    "impressum.placeholder.note":
      "Register and VAT ID details are placeholders — please replace with the actual company details in the admin area.",
    "impressum.close": "Close",

    "privacy.title": "Privacy Policy",
    "privacy.s1.title": "1. Data protection at a glance",
    "privacy.s1.text":
      "The following notes provide a simple overview of what happens to your personal data when you visit this website. Personal data is any data that can be used to identify you personally.",
    "privacy.s2.title": "2. Data controller",
    "privacy.s2.text":
      "The party responsible for data processing on this website is the entity named in the Impressum. Contact details can be found there.",
    "privacy.s3.title": "3. Data collection on this website",
    "privacy.s3.text":
      "When you access this website, the hosting provider automatically collects so-called server log files transmitted by your browser (e.g. browser type, operating system, referrer URL, IP address, time of the server request). This data is not linked to specific individuals and is not combined with other data sources.",
    "privacy.s4.title": "4. Contact form",
    "privacy.s4.text":
      "If you send us enquiries via the contact form, the information you provide — including the contact details you give — is stored in order to process your enquiry. We do not share this data without your consent. Processing is based on Art. 6(1)(b) GDPR where your enquiry relates to fulfilling a contract or pre-contractual measures. In all other cases, processing is based on our legitimate interest in efficiently handling enquiries (Art. 6(1)(f) GDPR) or on your consent (Art. 6(1)(a) GDPR), where consent was obtained.",
    "privacy.s5.title": "5. Cookies",
    "privacy.s5.text":
      "This website uses cookies. Necessary cookies are required to run the site; optional cookies for statistics and map display are only set with your consent. You can change or withdraw your choice at any time in the footer under \"Cookie settings\".",
    "privacy.s6.title": "6. External services",
    "privacy.s6.fonts.t": "Google Fonts",
    "privacy.s6.fonts.d":
      "This website uses \"Google Fonts\", a service provided by Google Ireland Limited, to display fonts consistently. When a page is loaded, your browser fetches the required fonts, establishing a connection to Google's servers.",
    "privacy.s6.maps.t": "OpenStreetMap / Leaflet",
    "privacy.s6.maps.d":
      "To display project locations we embed map data from OpenStreetMap via the Leaflet library. Map tiles are only loaded from OpenStreetMap Foundation servers after your explicit consent (cookie category \"Maps\"); your IP address may be transmitted to those servers in the process.",
    "privacy.s7.title": "7. Your rights",
    "privacy.s7.text":
      "You have the right at any time to free information about your stored personal data, as well as the right to rectification, blocking, deletion, restriction of processing, data portability and objection. You also have the right to lodge a complaint with a data protection supervisory authority.",
    "privacy.s8.title": "8. SSL/TLS encryption",
    "privacy.s8.text":
      "For security reasons and to protect the transmission of confidential content, this site should use SSL or TLS encryption. You can recognise an encrypted connection by the lock icon in your browser's address bar.",

    "admin.login.title": "Admin sign-in",
    "admin.login.sub": "Internal team only.",
    "admin.login.user": "Username",
    "admin.login.pass": "Password",
    "admin.login.button": "Sign in",
    "admin.login.hint": "Demo access: admin / bauart2026",
    "admin.login.error": "Incorrect username or password.",
    "admin.panel.title": "Admin area",
    "admin.logout": "Sign out",
    "admin.tab.projects": "Project locations",
    "admin.tab.messages": "Messages",
    "admin.tab.content": "Content",
    "admin.projects.add": "Add location",
    "admin.projects.empty": "No locations added yet.",
    "admin.projects.reset": "↺ Reset",
    "admin.projects.resetConfirm": "Reset all locations to the default values?",
    "admin.projects.deleteConfirm": "Delete this location?",
    "admin.messages.empty": "No messages yet.",
    "admin.messages.new": "NEW",
    "admin.messages.markRead": "Mark as read",
    "admin.messages.delete": "Delete",
    "admin.messages.deleteConfirm": "Delete this message?",
    "admin.form.title": "Title",
    "admin.form.title.de": "Title (German)",
    "admin.form.title.en": "Title (English)",
    "admin.form.desc.de": "Description (German)",
    "admin.form.desc.en": "Description (English)",
    "admin.form.category": "Category",
    "admin.form.location": "Location",
    "admin.form.search": "Search for a place or address",
    "admin.form.searchPlaceholder": "e.g. McDonald's Pinneberg or Elmshorner Straße 170",
    "admin.form.searchHint": "Search addresses or places (e.g. business names) via OpenStreetMap.",
    "admin.form.searchEmpty": "No results.",
    "admin.form.searchError": "Search failed. Please try again.",
    "admin.form.mapHint": "Click the map or drag the pin to set the location.",
    "admin.form.lat": "Latitude",
    "admin.form.lng": "Longitude",
    "admin.form.desc": "Description",
    "admin.form.image": "Image",
    "admin.form.imageChoose": "Choose image",
    "admin.form.imageChange": "Change image",
    "admin.form.imageRemove": "Remove",
    "admin.form.imageHint": "PNG, JPG, JPEG or WEBP · compressed automatically and saved with the project.",
    "admin.form.imageError": "Couldn't process this image.",
    "admin.form.year": "Year",
    "admin.form.save": "Save",
    "admin.form.cancel": "Cancel",
    "admin.form.newTitle": "New location",
    "admin.actions.edit": "Edit",
    "admin.actions.delete": "Delete",
    "admin.content.note":
      "This demo saves changes locally in the browser (localStorage). For production, connect the admin area to a real backend with proper login protection.",
    "admin.back": "← Back to website",
  },
};

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(DEFAULT_LANG);

  useEffect(() => {
    const stored = window.localStorage.getItem(LANG_STORAGE_KEY);
    if (stored && I18N[stored]) setLangState(stored);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("lang", lang);
  }, [lang]);

  const setLang = (next) => {
    if (!I18N[next]) return;
    setLangState(next);
    try {
      window.localStorage.setItem(LANG_STORAGE_KEY, next);
    } catch (e) {}
  };

  /* The translation function: t("some.key") -> localized string */
  const t = useMemo(() => {
    return (key, fallback) => {
      const dict = I18N[lang] || I18N[DEFAULT_LANG];
      return dict[key] ?? fallback ?? key;
    };
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang, t }), [lang, t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

/* useTranslation() -> { t, lang, setLang } */
export function useTranslation() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useTranslation must be used within a LanguageProvider");
  return ctx;
}
