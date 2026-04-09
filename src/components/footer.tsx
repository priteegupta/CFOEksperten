"use client";

// import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { type Dictionary } from "@/get-dictionary";

export default function Footer({
  dictionary,
  lang,
}: {
  dictionary: Dictionary;
  lang: string;
}) {
  // const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  
  // useEffect(() => {
  //   setCurrentYear(new Date().getFullYear());
  // }, []);
  const currentYear = new Date().getFullYear();
  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: elementPosition - offset, behavior: "smooth" });
      window.history.pushState(null, "", `/${lang}`);
    }
  };

  return (
    <footer className="bg-brand-gradient-dark text-white pt-16 pb-10 md:pt-24 md:pb-12 border-t border-white/5">
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-16 mb-12 md:mb-20">
          {/* Column 1 */}
          <div className="flex flex-col space-y-6 md:space-y-8">
            <div className="flex items-start justify-start">
              <Image
                src="/CFOFooter.png"
                alt="CFO Eksperten"
                width={400}
                height={90}
                className="h-22.5 w-auto object-contain object-left transition-transform duration-500 hover:scale-105 cursor-pointer"
                priority
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              />
            </div>
            <div className="w-12 h-0.5 bg-brand-accent"></div>
            <p className="text-slate-400 text-[14px] leading-relaxed max-w-xs font-light tracking-wide ">
              {dictionary.footer.description}
            </p>
          </div>

          {/* Column 2 */}
          <div>
            <h4 className="text-brand-accent uppercase tracking-[0.4em] lg:tracking-[0.5em] text-[11px] lg:text-[13px] font-black mb-6 md:mb-10 border-b border-white/5 pb-4">
              {dictionary.footer.quick_links}
            </h4>
            <ul className="space-y-3 md:space-y-5 text-[14px] lg:text-[16px] text-slate-300 font-medium">
              <li>
                <button
                  onClick={(e) => scrollToSection(e, "about")}
                  className="hover:text-brand-accent transition-all duration-300 text-left"
                >
                  {dictionary.footer.links.about}
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => scrollToSection(e, "customers")}
                  className="hover:text-brand-accent transition-all duration-300 text-left"
                >
                  {dictionary.footer.links.customers}
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => scrollToSection(e, "faq")}
                  className="hover:text-brand-accent transition-all duration-300 text-left"
                >
                  {dictionary.footer.links.faq}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3 (FIXED HERE) */}
          <div>
            <h4 className="text-brand-accent uppercase tracking-[0.4em] lg:tracking-[0.5em] text-[11px] lg:text-[13px] font-black mb-6 md:mb-10 border-b border-white/5 pb-4">
              {dictionary.footer.services}
            </h4>
            <ul className="space-y-3 md:space-y-5 text-[14px] lg:text-[16px] text-slate-300 font-medium">
              {["budget", "liquidity", "forecast", "virtual_cfo"].map((key) => {
                const service =
                  dictionary.services[key as keyof typeof dictionary.services];

                return (
                  <li key={key}>
                    <button
                      onClick={(e) => scrollToSection(e, "services")}
                      className="hover:text-brand-accent transition-all duration-300 text-left"
                    >
                      <span className="capitalize">
                        {(typeof service === "object" && service !== null
                          ? service.title
                          : service
                        ).toLowerCase()}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h4 className="text-brand-accent uppercase tracking-[0.4em] lg:tracking-[0.5em] text-[11px] lg:text-[13px] font-black mb-6 md:mb-10 border-b border-white/5 pb-4">
              {dictionary.footer.contact}
            </h4>
            <div className="text-[14px] lg:text-[16px] text-slate-300 space-y-4 md:space-y-6 font-light">
              <div className="space-y-1">
                <span className="text-white text-[11px] font-bold uppercase tracking-widest block mb-2 opacity-40">
                  Address
                </span>
                <p className="text-slate-400 leading-relaxed">
                  Toppåsveien 22c
                  <br />
                  1262 Oslo, {lang === "no" ? "Norge" : "Norway"}
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <a
                  href="tel:+4798164037"
                  className="flex items-center gap-3 hover:text-brand-accent transition-colors group"
                >
                  <span className="text-brand-accent group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                  Tlf: +47 98 16 40 37
                </a>
                <a
                  href="mailto:hei@cfoeksperten.no"
                  className="flex items-center gap-3 hover:text-brand-accent transition-colors group"
                >
                  <span className="text-brand-accent group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                  hei@cfoeksperten.no
                </a>
              </div>
              {/* LINKEDIN LINK */}
              <div className="pt-4">
                <a
                  href="https://www.linkedin.com/in/adiamnegassie/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-10 h-10 border border-white/10 hover:border-brand-accent hover:bg-brand-accent hover:text-brand-dark transition-all duration-500 rounded-sm"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* Bottom Copyright Section */}
        <div className="mt-16 md:mt-20 pt-10 border-t border-white/5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4">
            {/* Middle Links: Changed to slate-300 for better visibility */}
            <div className="order-1 md:order-2 flex-1 flex justify-center gap-6 sm:gap-10">
              <Link
                href="#"
                className="text-[10px] text-slate-300 uppercase tracking-[0.2em] hover:text-brand-accent transition-colors whitespace-nowrap"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-[10px] text-slate-300 uppercase tracking-[0.2em] hover:text-brand-accent transition-colors whitespace-nowrap"
              >
                Terms of Service
              </Link>
            </div>

            {/* Left Side: Copyright (Lighter and clearer) */}
            <div className="order-2 md:order-1 flex-1">
              <p className="text-[10px] text-slate-300 uppercase tracking-[0.2em] text-center md:text-left">
                © {currentYear}{" "}
                <span className="text-white font-bold">CFO EKSPERTEN</span>.{" "}
                {dictionary.footer.rights}
              </p>
            </div>

            {/* Right Side: Designed By (Visible but subtle) */}
            <div className="order-3 flex-1 flex flex-col sm:flex-row justify-center md:justify-end items-center gap-2 sm:gap-4">
              <span className="text-[9px] text-slate-300 uppercase tracking-[0.3em] font-medium whitespace-nowrap">
                Designed & Managed by
              </span>
              {/* NO LOGO CHANGES HERE - Original visibility kept */}
              <div className="relative h-10 w-24 md:h-12 md:w-28 group cursor-pointer">
                <Image
                  src="/cloud369logo.png"
                  alt="Cloud369"
                  fill
                  className="object-contain brightness-110 contrast-125 saturate-100"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
