import { ModalsProvider } from "@/lib/modals";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";
import { CookieBanner, CookieModal } from "@/components/CookieConsent";
import { ImpressumModal, PrivacyModal } from "@/components/LegalModals";

export default function SiteLayout({ children }) {
  return (
    <ModalsProvider>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-[999] focus:bg-ink focus:text-white focus:px-4 focus:py-2">
        Skip to content
      </a>

      <Loader />

      <Header />

      <main id="main">{children}</main>

      <Footer />

      <CookieBanner />
      <CookieModal />
      <ImpressumModal />
      <PrivacyModal />
    </ModalsProvider>
  );
}
