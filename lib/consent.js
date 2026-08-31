"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CONSENT_KEY = "bauart_consent";

export function getStoredConsent() {
  try {
    const raw = window.localStorage.getItem(CONSENT_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

function storeConsent(obj) {
  window.localStorage.setItem(CONSENT_KEY, JSON.stringify(obj));
}

const ConsentContext = createContext(null);

export function ConsentProvider({ children }) {
  const [consent, setConsentState] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setConsentState(getStoredConsent());
    setReady(true);
  }, []);

  const setConsent = (obj) => {
    setConsentState(obj);
    storeConsent(obj);
  };

  const value = useMemo(() => ({ consent, setConsent, ready }), [consent, ready]);

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>;
}

export function useConsent() {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error("useConsent must be used within a ConsentProvider");
  return ctx;
}
