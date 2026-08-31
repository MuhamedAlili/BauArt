"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslation } from "@/lib/i18n";
import ThemeToggle from "@/components/ThemeToggle";

function NavLink({ href, active, children, onClick, className = "" }) {
  return (
    <Link href={href} onClick={onClick} className={`nav-link ${active ? "active" : ""} ${className}`.trim()}>
      {children}
    </Link>
  );
}

export default function Header() {
  const { t, lang, setLang } = useTranslation();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isHome = pathname === "/";
  const isAbout = pathname === "/about";
  const isContact = pathname === "/contact";
  const isProjects = pathname === "/projects";

  const navItems = [
    { href: "/", label: t("nav.home"), active: isHome },
    { href: "/about", label: t("nav.about"), active: isAbout },
    { href: "/projects", label: t("nav.projects"), active: isProjects },
    { href: "/contact", label: t("nav.contact"), active: isContact },
  ];

  return (
    <header
      id="site-header"
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        scrolled ? "bg-paper/80 backdrop-blur-md shadow-md shadow-ink/5 border-b border-stone-200/70" : "bg-paper/95"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/logo.png" alt="BauArt Logo" className="h-11 w-11 object-contain" />
          <span className="font-display font-semibold tracking-tight text-lg leading-none">
            BauArt
            <span className="block text-[10px] font-mono font-normal tracking-[.18em] text-clay">STEIN &amp; GARTEN</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-9 font-medium text-sm">
          {navItems.map((item) => (
            <NavLink key={item.href} href={item.href} active={item.active}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-5">
          <div className="flex items-center gap-1 font-mono text-xs">
            <button
              onClick={() => setLang("de")}
              className={`px-1.5 py-1 hover:text-clay transition-colors ${lang === "de" ? "text-clay font-semibold" : ""}`}
            >
              DE
            </button>
            <span className="text-stone-300">/</span>
            <button
              onClick={() => setLang("en")}
              className={`px-1.5 py-1 hover:text-clay transition-colors ${lang === "en" ? "text-clay font-semibold" : ""}`}
            >
              EN
            </button>
          </div>
          <ThemeToggle />
          <Link href="/contact" className="btn-clay bg-charcoal text-white text-sm font-medium px-5 py-2.5 rounded-sm">
            {t("nav.cta")}
          </Link>
        </div>

        <button
          aria-label="Menü"
          aria-expanded={menuOpen}
          className="lg:hidden p-2"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6">
            <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
      </div>

      <div className={`${menuOpen ? "" : "hidden"} lg:hidden bg-paper border-t border-stone-200 px-6 py-6 flex flex-col gap-5 text-sm font-medium`}>
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
            {item.label}
          </Link>
        ))}
        <div className="flex items-center justify-between gap-2 pt-1">
          <div className="flex items-center gap-2 font-mono text-xs">
            <button onClick={() => setLang("de")} className={lang === "de" ? "text-clay font-semibold" : ""}>DE</button>
            <span className="text-stone-300">/</span>
            <button onClick={() => setLang("en")} className={lang === "en" ? "text-clay font-semibold" : ""}>EN</button>
          </div>
          <ThemeToggle />
        </div>
        <Link href="/contact" onClick={() => setMenuOpen(false)} className="bg-charcoal text-white text-center px-5 py-2.5 rounded-sm">
          {t("nav.cta")}
        </Link>
      </div>
    </header>
  );
}
