"use client";

import { createContext, useContext, useState } from "react";

const ModalsContext = createContext(null);

export function ModalsProvider({ children }) {
  const [impressumOpen, setImpressumOpen] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [cookieModalOpen, setCookieModalOpen] = useState(false);

  const value = {
    impressumOpen,
    openImpressum: () => setImpressumOpen(true),
    closeImpressum: () => setImpressumOpen(false),
    privacyOpen,
    openPrivacy: () => setPrivacyOpen(true),
    closePrivacy: () => setPrivacyOpen(false),
    cookieModalOpen,
    openCookieModal: () => setCookieModalOpen(true),
    closeCookieModal: () => setCookieModalOpen(false),
  };

  return <ModalsContext.Provider value={value}>{children}</ModalsContext.Provider>;
}

export function useModals() {
  const ctx = useContext(ModalsContext);
  if (!ctx) throw new Error("useModals must be used within a ModalsProvider");
  return ctx;
}
