"use client";

import Image from "next/image";
import { type Dictionary } from "@/get-dictionary";

interface HeroSectionProps {
  dictionary: Dictionary;
  lang: string;
}

export function HeroContent({ dictionary, lang }: HeroSectionProps) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: elementPosition - offset, behavior: "smooth" });
      window.history.pushState(null, "", `/${lang}`);
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center text-white overflow-hidden pt-24 pb-32">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0 bg-[#0B1221]">
        <Image
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop"
          alt="Modern Oslo Office"
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1221] via-[#0B1221]/60 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1221]/40 via-transparent to-transparent z-10" />
      </div>

      <div className="container relative z-20 mx-auto px-6 lg:px-12">
        <div className="max-w-4xl">
          <div className="inline-block px-5 py-2 rounded-sm border-l-4 border-brand-accent bg-white/10 text-white text-[13px] md:text-[14px] font-extrabold tracking-[0.35em] uppercase mb-10">
            {dictionary.hero.badge}
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-serif font-bold leading-[1.1] mb-10 text-white">
            {dictionary.hero.title_main} <br className="hidden md:block" />
            <span className="opacity-90">
              {dictionary.hero.title_highlight}{" "}
            </span>
            <span className="text-brand-accent italic whitespace-nowrap">
              {dictionary.hero.title_sub_highlight}
            </span>
          </h1>

          <p className="text-lg lg:text-xl text-white/70 max-w-2xl leading-relaxed font-light mb-12">
            {dictionary.hero.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-5">
            <button
              onClick={() => scrollToSection("services")}
              className="w-full sm:w-auto bg-brand-accent text-brand-dark px-10 py-4 rounded-sm font-bold hover:bg-white transition-all duration-300 text-center uppercase text-[12px] sm:text-[10px] tracking-[0.2em]"
            >
              {dictionary.hero.cta}
            </button>
            <button
              onClick={() => scrollToSection("packages")}
              className="w-full sm:w-auto border border-white/40 text-white px-10 py-4 rounded-sm font-bold hover:bg-white/10 transition-all duration-300 text-center uppercase text-[10px] tracking-[0.2em]"
            >
              {dictionary.hero.cta_secondary}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
