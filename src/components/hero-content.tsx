"use client";

import Image from "next/image";
import { type Dictionary } from "@/get-dictionary";
import { motion } from "framer-motion";

type HeroType = {
  badge: string;
  title_main: string;
  title_highlight: string;
  subtitle: string;
  subtitle_line1: string;
  subtitle_line2: string;
  cta: string;
  cta_secondary: string;
};

interface HeroSectionProps {
  dictionary: Dictionary;
  lang: string;
}

export function HeroContent({ dictionary, lang }: HeroSectionProps) {
  const hero = dictionary.hero as HeroType;
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: elementPosition - offset, behavior: "smooth" });
      window.history.pushState(null, "", `/${lang}`);
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center text-white overflow-hidden pt-24 pb-32">
      {/* BACKGROUND CONTAINER - REDUCED DARKNESS FOR VISIBILITY */}
      <div className="absolute inset-0 z-0 bg-brand-dark">
        <Image
          src="https://brightadvisers.com/wp-content/uploads/2025/06/mastering-cfo-family-office-jobs-essential-steps-for-success.png"
          alt="CFO Eksperten Strategic Team"
          fill
          className="object-cover opacity-80 transition-transform duration-1000 scale-105"
          priority
        />

        {/* LIGHTER GRADIENT: Shifted 'from' opacity to 70% and 'via' to 20% to let the image breathe */}
        <div className="absolute inset-0 bg-linear-to-r from-brand-dark/70 via-brand-dark/20 to-transparent z-10" />
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-brand-dark/40 z-10" />
      </div>

      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          {/* BADGE: Light Blue Accent */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 px-5 py-2 rounded-sm border-l-4 border-brand-accent bg-white/5 backdrop-blur-sm text-white text-[13px] md:text-[14px] font-extrabold tracking-[0.35em] uppercase mb-10"
          >
            <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
            {hero.badge}
          </motion.div>

          {/* REFINED HEADING: Decreased from 8xl to 6xl for Desktop elegance */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold leading-[1.1] mb-10 text-white tracking-tight"
          >
            {hero.title_main} <br className="hidden md:block" />
            <span className="opacity-85">{hero.title_highlight} </span>
            <span className="text-brand-accent  font-light inline whitespace-nowrap ml-2">
              {hero.title_highlight}
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-xl mb-16"
          >
            {/* MAIN STATEMENT */}
            <p className="text-lg md:text-xl text-white font-light leading-relaxed">
              {hero.subtitle_line1}
            </p>

            {/* Divider */}
            <div className="w-10 h-px bg-brand-accent my-6"></div>

            {/* SUPPORTING LINE */}
            <p className="text-sm md:text-base text-white/60 font-light leading-relaxed">
              {hero.subtitle_line2}
            </p>
          </motion.div>

          {/* CTA BUTTONS: Executive Light Blue */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-6"
          >
            <button
              onClick={() => scrollToSection("book-meeting")}
              className="w-full sm:w-auto bg-brand-accent text-white px-10 py-4 cursor-pointer rounded-sm font-black hover:bg-white hover:text-brand-dark transition-all duration-500 text-center uppercase text-[11px] tracking-[0.25em] shadow-xl shadow-brand-accent/20"
            >
              {hero.cta}
            </button>
            <button
              onClick={() => scrollToSection("packages")}
              className="w-full sm:w-auto border border-white/25 text-white px-10 py-4 cursor-pointer rounded-sm font-bold hover:bg-white/10 hover:border-white transition-all duration-500 text-center uppercase text-[11px] tracking-[0.25em] backdrop-blur-sm"
            >
              {hero.cta_secondary}
            </button>
          </motion.div>
        </div>
      </div>

      {/* SCROLL INDICATOR */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 hidden md:block"
      >
        <div className="w-px h-16 bg-linear-to-b from-white to-transparent" />
      </motion.div>
    </section>
  );
}
