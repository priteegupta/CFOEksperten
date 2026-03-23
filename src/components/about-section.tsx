"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { type Dictionary } from "@/get-dictionary";

export default function AboutSection({
  dictionary,
}: {
  dictionary: Dictionary;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const icons = [
    <svg
      key="1"
      className="w-8 h-8"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>,
    <svg
      key="2"
      className="w-8 h-8"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>,
    <svg
      key="3"
      className="w-8 h-8"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>,
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="pt-24 md:pt-48 pb-12 bg-white overflow-hidden"
    >
      <div className="container mx-auto px-6 max-w-7xl">
        {/* 1. SECTION HEADER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24 md:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7"
          >
            <div className="flex items-center gap-4 mb-8">
              <span className="w-12 h-[2px] bg-brand-accent"></span>
              <span className="text-brand-accent text-[13px] font-black uppercase tracking-[0.5em]">
                {dictionary.about.title}
              </span>
            </div>
            <h2 className="text-6xl md:text-8xl font-serif font-bold text-brand-dark leading-[0.9] tracking-tighter">
              {dictionary.about.title}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            className="lg:col-span-5 flex items-end"
          >
            <p className="text-xl md:text-2xl text-slate-500 font-light leading-relaxed italic border-l-2 border-slate-100 pl-8">
              {dictionary.about.subtitle}
            </p>
          </motion.div>
        </div>

        {/* 2. CORE PILLARS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {dictionary.about.team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group relative h-full"
            >
              <div className="h-full bg-slate-50 rounded-[40px] p-10 md:p-12 overflow-hidden transition-all duration-700 hover:bg-white hover:shadow-[0_40px_80px_-20px_rgba(15,23,42,0.1)] border border-transparent hover:border-brand-accent/20">
                {/* LARGE WATERMARK (Adiam's Seniority Highlight) */}
                <div className="absolute -top-6 -right-6 text-[160px] font-serif font-bold text-slate-200/20 pointer-events-none group-hover:text-brand-accent/5 transition-all duration-700">
                  {member.years}
                </div>

                {/* ICON & PILL TAG (NEW LIGHT BLUE THEME) */}
                <div className="flex justify-between items-start mb-12 relative z-10">
                  <div className="text-brand-accent group-hover:scale-110 transition-transform duration-500">
                    {icons[index % icons.length]}
                  </div>

                  {/* THE PILL: Blue text, soft blue background, rounded */}
                  <span className="text-[11px] font-black text-brand-accent uppercase tracking-widest bg-brand-accent/10 px-5 py-2.5 rounded-full border border-brand-accent/10 shadow-sm group-hover:bg-brand-accent group-hover:text-white transition-all duration-500">
                    {member.years}+ YRS
                  </span>
                </div>

                {/* MEMBER CONTENT */}
                <div className="relative z-10">
                  <h3 className="text-2xl md:text-3xl font-bold text-brand-dark mb-2">
                    {member.name}
                  </h3>
                  <p className="text-brand-accent text-[11px] font-black uppercase tracking-[0.3em] mb-8">
                    {member.role}
                  </p>

                  <div className="w-12 h-[2px] bg-slate-200 group-hover:w-24 group-hover:bg-brand-accent transition-all duration-500 mb-8" />

                  <p className="text-slate-500 text-lg leading-relaxed font-light italic opacity-80 group-hover:opacity-100 transition-opacity">
                    &quot;{member.bio}&quot;
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
