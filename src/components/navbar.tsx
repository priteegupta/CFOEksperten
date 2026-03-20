"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Locale, i18n } from "@/i18n-config";
import { useEffect, useState } from "react";
import Image from "next/image";
import { type Dictionary } from "@/get-dictionary";

interface NavLink {
  id: string;
  label: string;
  isAnchor: boolean;
}

export function Navbar({ lang, dictionary }: { lang: Locale; dictionary: Dictionary["navbar"] }) {
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
          // If the top of the section is in the upper half of the viewport
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
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [isHomePage, lang, pathname, activeSection, dictionary]);

  // NEW: Professional Scroll Handler (Clean URL)
  const scrollToSection = (e: React.MouseEvent, id: string) => {
    if (isHomePage) {
      e.preventDefault();
      const element = document.getElementById(id);
      if (element) {
        const offset = 80; // Heights of your navbar
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });

        // This line keeps the URL clean while updating the browser history state
        window.history.pushState(null, "", `/${lang}`);
        setIsMobileMenuOpen(false);
        setActiveSection(id);
      }
    }
  };

  const redirectedPathName = (locale: Locale) => {
    if (!pathname) return "/";
    const segments = pathname.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  const isLinkActive = (item: NavLink) => {
    if (item.isAnchor) {
      return isHomePage && activeSection === item.id;
    }
    return pathname === `/${lang}/${item.id}`;
  };

  if (!dictionary) return null;

  const navLinks: NavLink[] = [
    { id: "services", label: dictionary.services, isAnchor: true },
    { id: "about", label: dictionary.about_us, isAnchor: true },
    { id: "customers", label: dictionary.customers, isAnchor: true },
    { id: "packages", label: dictionary.our_packages, isAnchor: true },
    { id: "faq", label: dictionary.faq, isAnchor: true },
  ];

  const isOverHero = isHomePage && !isScrolled && !isMobileMenuOpen;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled || isMobileMenuOpen ? "h-16 bg-white/95 backdrop-blur-md shadow-sm" : "h-24 bg-transparent"} ${isMobileMenuOpen ? "bg-white" : ""}`}
    >
      <div className="container mx-auto px-6 h-full flex items-center justify-between">
        {/* LOGO */}
        <Link
          href={`/${lang}`}
          onClick={(e) => {
            // If we are already on the homepage, just scroll to top smoothly
            if (isHomePage) {
              e.preventDefault();
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
              // Keeps the URL clean: localhost:3000/en
              window.history.pushState(null, "", `/${lang}`);
              setActiveSection(""); // Reset active highlights
              setIsMobileMenuOpen(false); // Close menu on mobile
            }
            // If on a different page, the default Link behavior will load the homepage
          }}
          className="flex flex-shrink-0 items-center group -ml-1 sm:-ml-4"
        >
          <div
            className={`relative h-24 w-64 sm:h-20 sm:w-56 md:h-32 md:w-72 transition-all duration-300 group-hover:scale-105 ${isOverHero ? "brightness-0 invert" : ""}`}
          >
            <Image
              src="/logo_.png"
              alt="CFO Logo"
              fill
              className="object-contain object-left"
              priority
              unoptimized
            />
          </div>
        </Link>

        {/* Desktop Links */}
        <div
          className={`hidden lg:flex items-center space-x-10 text-[13px] font-normal tracking-[0.15em] transition-colors duration-500 ${isOverHero ? "text-white/90" : "text-brand-dark/80"}`}
        >
          {navLinks.map((item) => (
            <Link
              key={item.id}
              href={`/${lang}#${item.id}`}
              onClick={(e) => scrollToSection(e, item.id)} // Updated click handler
              className={`group relative py-2 transition-all duration-300 ${isLinkActive(item)
                ? isOverHero
                  ? "text-white font-bold"
                  : "text-brand-dark font-bold"
                : isOverHero
                  ? "hover:text-brand-accent"
                  : "hover:text-brand-accent"
                }`}
            >
              {item.label}
              <span
                className={`absolute bottom-0 left-0 w-full h-[2px] bg-brand-accent transform origin-left transition-transform duration-300 ${isLinkActive(item) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
              ></span>
            </Link>
          ))}
        </div>

        {/* Language & CTA .. */}
        <div className="flex items-center space-x-4 sm:space-x-6">
          <div
            className={`hidden sm:flex items-center space-x-2 text-xs font-bold transition-all duration-500 px-2 py-1 rounded-full ${isOverHero ? "text-white/40 bg-white/10" : "text-brand-dark/40 bg-brand-dark/5"}`}
          >
            {i18n.locales.map((locale) => (
              <Link
                key={locale}
                href={redirectedPathName(locale)}
                className={`px-3 py-1.5 rounded-full transition-all duration-300 tracking-[0.1em] text-center min-w-[45px] ${lang === locale
                  ? isOverHero
                    ? "bg-white text-[#10367D] shadow-lg scale-100"
                    : "bg-white text-brand-accent shadow-sm"
                  : isOverHero
                    ? // FIXED: Lowered base to 60, hover to 100 with a slight scale-up
                    "text-white/60 hover:text-white hover:scale-105"
                    : "text-brand-dark/40 hover:text-brand-dark hover:bg-white/50"
                  }`}
              >
                {locale.toUpperCase()}
              </Link>
            ))}
          </div>
          {/* CTA Button - Updated to scroll */}
          <button
            onClick={(e) => scrollToSection(e, "book-meeting")}
            className={`hidden sm:block px-5 sm:px-6 py-2.5 rounded-md text-sm font-semibold transition-all duration-500 ${isOverHero
              ? "bg-white/10 text-white border border-white/20 hover:bg-brand-accent hover:text-brand-dark hover:border-brand-accent"
              : activeSection === "book-meeting"
                ? "bg-brand-accent text-brand-dark shadow-[0_0_20px_rgba(165,206,0,0.4)] scale-105"
                : "bg-brand-dark text-white hover:bg-brand-accent hover:text-brand-dark"
              }`}
          >
            {dictionary.book_a_meeting}
          </button>
          {/* Mobile Button */}
          <button
            className="lg:hidden flex flex-col items-center justify-center w-8 h-8 space-y-1.5 z-50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span
              className={`block w-6 h-0.5 transition-all ${isMobileMenuOpen ? "bg-brand-dark rotate-45 translate-y-2" : isOverHero ? "bg-white" : "bg-brand-dark"}`}
            ></span>
            <span
              className={`block w-6 h-0.5 transition-all ${isMobileMenuOpen ? "opacity-0" : isOverHero ? "bg-white" : "bg-brand-dark"}`}
            ></span>
            <span
              className={`block w-6 h-0.5 transition-all ${isMobileMenuOpen ? "bg-brand-dark -rotate-45 -translate-y-2" : isOverHero ? "bg-white" : "bg-brand-dark"}`}
            ></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-16 left-0 right-0 bg-white shadow-xl transition-all duration-400 overflow-hidden ${isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="flex flex-col px-6 py-8 space-y-8">
          {/* Priority Mobile Language Switcher */}
          <div className="flex items-center justify-center p-1 bg-slate-100 rounded-xl">
            {i18n.locales.map((locale) => (
              <Link
                key={locale}
                href={redirectedPathName(locale)}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex-1 text-center py-3 rounded-lg text-sm font-bold tracking-widest transition-all ${lang === locale ? "bg-white text-brand-accent shadow-md" : "text-slate-400"}`}
              >
                {locale === "en" ? "ENGLISH" : "NORSK"}
              </Link>
            ))}
          </div>

          <div className="flex flex-col space-y-6 pt-4">
            {navLinks.map((item) => (
              <Link
                key={item.id}
                href={`/${lang}#${item.id}`}
                onClick={(e) => scrollToSection(e, item.id)}
                className={`text-lg uppercase tracking-widest ${isLinkActive(item) ? "text-brand-accent font-bold" : "text-brand-dark"}`}
              >
                {item.label}
              </Link>
            ))}

            {/* Mobile primary CTA */}
            <button
              onClick={(e) => scrollToSection(e, "book-meeting")}
              className="mt-4 w-full bg-brand-dark text-white py-5 rounded-lg text-sm font-bold tracking-[0.2em] uppercase transition-all active:scale-95 shadow-lg flex items-center justify-center gap-3"
            >
              <div className="w-2 h-2 rounded-full bg-brand-accent animate-pulse"></div>
              {dictionary.book_a_meeting}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
