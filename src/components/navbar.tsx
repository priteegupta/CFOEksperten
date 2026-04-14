"use client";

import { useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Locale } from "@/i18n-config";
import { useEffect, useState } from "react";
import Image from "next/image";
import { type Dictionary } from "@/get-dictionary";

type NavbarType = {
  logo: string;
  services: string;
  about_us: string;
  customers: string;
  our_packages: string;
  faq: string;
  book_a_meeting: string;
};

interface NavLink {
  id: string;
  label: string;
  isAnchor: boolean;
}

export function Navbar({
  lang,
  dictionary,
}: {
  lang: Locale;
  dictionary: Dictionary["navbar"] & NavbarType;
}) {
  const { services, about_us, customers, our_packages, faq, book_a_meeting } =
    dictionary;

  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const isHomePage = pathname === `/${lang}` || pathname === `/${lang}/`;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);

    if (isHomePage) {
      const handleActiveSection = () => {
        const sections = document.querySelectorAll("section[id]");
        let currentSection = "";

        sections.forEach((section) => {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            currentSection = section.id;
          }
        });

        setActiveSection(currentSection);
      };

      window.addEventListener("scroll", handleActiveSection);
      handleActiveSection();

      return () => {
        window.removeEventListener("scroll", handleScroll);
        window.removeEventListener("scroll", handleActiveSection);
      };
    } else {
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [isHomePage, lang, pathname]);

  const scrollToSection = (e: React.MouseEvent, id: string) => {
    if (isHomePage) {
      e.preventDefault();
      const element = document.getElementById(id);
      if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });

        window.history.pushState(null, "", `/${lang}`);
        setIsMobileMenuOpen(false);
        setActiveSection(id);
      }
    }
  };

  const navLinks: NavLink[] = [
    { id: "services", label: services, isAnchor: true },
    { id: "about", label: about_us, isAnchor: true },
    // { id: "customers", label: customers, isAnchor: true },
    { id: "packages", label: our_packages, isAnchor: true },
    { id: "faq", label: faq, isAnchor: true },
  ];

  const isLinkActive = (item: NavLink) => {
    if (item.isAnchor) {
      return isHomePage && activeSection === item.id;
    }
    return pathname === `/${lang}/${item.id}`;
  };

  const isOverHero = isHomePage && !isScrolled && !isMobileMenuOpen;

  if (!dictionary) return null;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled || isMobileMenuOpen
          ? "h-16 bg-white shadow-md"
          : "h-24 bg-transparent"
      }`}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        {/* LOGO */}
        <Link
          href={`/${lang}`}
          onClick={(e) => {
            if (isHomePage) {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
              window.history.pushState(null, "", `/${lang}`);
              setActiveSection("");
              setIsMobileMenuOpen(false);
            }
          }}
          className="flex shrink-0 items-center group"
        >
          <div className="relative transition-all duration-300 group-hover:scale-105 h-24 w-72 sm:h-22 sm:w-64 md:h-32 md:w-80 lg:h-40 lg:w-92 lg:max-w-45">
            <Image
              src="/logo_provided1.png"
              alt="CFO Logo"
              fill
              className={`object-contain object-left transition-all duration-500 ${
                isOverHero ? "brightness-0 invert" : "brightness-100"
              }`}
              priority
            />
          </div>
        </Link>

        {/* Desktop Links */}
        <div
          className={`hidden lg:flex items-center space-x-10 text-[13px] font-bold tracking-[0.15em] transition-colors duration-500 ${
            isOverHero ? "text-white drop-shadow-md" : "text-brand-dark/80"
          }`}
        >
          {navLinks.map((item) => (
            <Link
              key={item.id}
              href={`/${lang}#${item.id}`}
              onClick={(e) => scrollToSection(e, item.id)}
              className={`group relative py-2 transition-all duration-300 ${
                isLinkActive(item)
                  ? isOverHero
                    ? "text-white"
                    : "text-brand-accent"
                  : "hover:text-brand-accent"
              }`}
            >
              {item.label}
              <span
                className={`absolute bottom-0 left-0 w-full h-0.5 bg-brand-accent transform origin-left transition-transform duration-300 ${
                  isLinkActive(item)
                    ? "scale-x-100"
                    : "scale-x-0 group-hover:scale-x-100"
                }`}
              ></span>
            </Link>
          ))}
        </div>

        {/* CTA Button Only (Language Switcher Removed) */}
        <div className="flex items-center space-x-4">
          <button
            onClick={(e) => scrollToSection(e, "book-meeting")}
            className={`group/nav relative hidden sm:block px-6 py-2.5 rounded-md text-xs font-bold uppercase tracking-widest transition-all duration-700 cursor-pointer overflow-hidden shadow-lg ${
              isOverHero
                ? "bg-white/10 text-white border border-white/30 hover:bg-white hover:text-brand-dark"
                : "bg-brand-gradient text-white shadow-brand-accent/20"
            }`}
          >
            {!isOverHero && (
              <div className="absolute inset-0 bg-brand-accent opacity-0 group-hover/nav:opacity-100 transition-opacity duration-700 pointer-events-none" />
            )}

            <div className="relative z-10 flex items-center gap-2">
              {!isOverHero && (
                <div className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse group-hover/nav:bg-brand-dark transition-colors duration-700" />
              )}
              <span>{book_a_meeting}</span>
            </div>
          </button>

          {/* MOBILE HAMBURGER BUTTON */}
          <button
            className="lg:hidden flex flex-col items-center justify-center w-8 h-8 space-y-1.5 z-50 relative"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span
              className={`block w-6 h-0.5 transition-all duration-300 ${
                isMobileMenuOpen
                  ? "bg-brand-dark rotate-45 translate-y-2"
                  : isOverHero
                    ? "bg-white shadow-sm"
                    : "bg-brand-dark"
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 transition-all duration-300 ${
                isMobileMenuOpen
                  ? "opacity-0"
                  : isOverHero
                    ? "bg-white shadow-sm"
                    : "bg-brand-dark"
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 transition-all duration-300 ${
                isMobileMenuOpen
                  ? "bg-brand-dark -rotate-45 -translate-y-2"
                  : isOverHero
                    ? "bg-white shadow-sm"
                    : "bg-brand-dark"
              }`}
            ></span>
          </button>
        </div>
      </div>

      {/* MOBILE MENU OVERLAY (Language Switcher Removed) */}
      <div
        className={`lg:hidden fixed inset-0 bg-white z-40 transition-all duration-500 flex flex-col ${
          isMobileMenuOpen
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0"
        }`}
      >
        <div className="flex flex-col px-8 py-24 space-y-10">
          <div className="flex flex-col space-y-8">
            {navLinks.map((item) => (
              <Link
                key={item.id}
                href={`/${lang}#${item.id}`}
                onClick={(e) => scrollToSection(e, item.id)}
                className={`text-xl font-bold uppercase tracking-[0.2em] transition-colors ${
                  isLinkActive(item) ? "text-brand-accent" : "text-brand-dark"
                }`}
              >
                {item.label}
              </Link>
            ))}

            <button
              onClick={(e) => scrollToSection(e, "book-meeting")}
              className="mt-6 w-full bg-brand-dark text-white py-5 rounded-xl text-xs font-black tracking-[0.3em] uppercase transition-all shadow-2xl flex items-center justify-center gap-3"
            >
              <div className="w-2 h-2 rounded-full bg-brand-accent animate-pulse"></div>
              {book_a_meeting}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
