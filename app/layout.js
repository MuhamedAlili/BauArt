import { Space_Grotesk, Inter, Space_Mono } from "next/font/google";
import "leaflet/dist/leaflet.css";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n";
import { ConsentProvider } from "@/lib/consent";
import { ThemeProvider, THEME_INIT_SCRIPT } from "@/lib/theme";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});
const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});
const mono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata = {
  title: "BauArt — Stein & Garten",
  description:
    "BauArt Stein & Garten — Hoch- und Tiefbau, Garten- und Landschaftsbau mit Handwerk und Gestaltungsanspruch.",
  icons: { icon: "/assets/logo.png" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="de" suppressHydrationWarning className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="font-body text-ink bg-paper">
        <ThemeProvider>
          <LanguageProvider>
            <ConsentProvider>{children}</ConsentProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
