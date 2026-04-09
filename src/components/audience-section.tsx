"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { type Dictionary } from "@/get-dictionary";


type AudienceType = {
  title: string;
  subtitle: string;
  groups: {
    title: string;
    description: string;
  }[];
  bottom_text: string;
};

export default function AudienceSection({
  dictionary,
}: {
  dictionary: Dictionary;
}) {
 const audience = dictionary.audience as AudienceType;

 const { title, subtitle, groups, bottom_text } = audience;
  //  SVG Icon Set
  const getIcon = (index: number) => (
    <svg
      className="w-6 h-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      {index === 0 && <circle cx="12" cy="12" r="9" strokeDasharray="4 4" />}
      {index === 1 && <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />}
      {index === 2 && (
        <path d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745" />
      )}
      {index === 3 && <path d="M18 20V10M12 20V4M6 20v-6" />}
      {index === 4 && <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0z" />}
    </svg>
  );

  return (
    <section
      id="audience"
      className="w-full bg-white py-24 md:py-48 overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          {/*  FINANCIAL DASHBOARD IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative"
          >
            <div className="relative aspect-4/5 rounded-[48px] overflow-hidden shadow-[0_40px_100px_-20px_rgba(15,23,42,0.15)] border border-slate-100 bg-slate-50">
              <Image
                src="https://images.openai.com/static-rsc-4/cBvoRjqmyYjrU-eIvv_Xb9j5vIYOKDxXPPF8OrDGcN1B1e9Y2Z8Vcl366qKtb33GrkLq4Uh9lyCB5WNRkwxGV9G5WSjmyU4IEv2H-rppjkW6tyZVBRt1gOs6E94qQdiwLOVlIsZCTNdVA5yTovyRGnIVd3wNSkIT7W2ExsB7pqjzXbS3iz4zj7tOYDRKnztp?purpose=fullsize"
                alt="Financial Analysis Dashboard"
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-linear-to-tr from-brand-dark/20 to-transparent pointer-events-none" />
            </div>

            {/* FLOATING QUOTE CARD */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-10 -right-6 md:-right-10 bg-white/90 backdrop-blur-xl p-8 md:p-10 rounded-4xl shadow-2xl hidden sm:block border border-white/40 max-w-[320px]"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
                <span className="text-[10px] font-black text-brand-dark/40 uppercase tracking-[0.3em]">
                  Strategy First
                </span>
              </div>
              <p className="text-brand-dark font-serif  text-xl md:text-2xl leading-tight">
                {bottom_text}
              </p>
            </motion.div>
          </motion.div>

          {/* RIGHT: ADJUSTED FONT HIERARCHY */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-4 mb-8">
                <span className="w-12 h-0.5 bg-brand-accent"></span>
                <span className="text-brand-accent text-[13px] md:text-[14px] font-black uppercase tracking-[0.6em] leading-none">
                  {title}
                </span>
              </div>

              {/* INCREASED SIZE: Main Heading (For Whom) */}
              <h2 className="text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-brand-dark leading-[0.95] tracking-tighter mb-8">
                {subtitle}
              </h2>

              {/* DECREASED SIZE: Subtitle (Startups in all phases)
              <p className="text-lg md:text-xl text-slate-500 font-light leading-relaxed mb-16 max-w-lg ">
                {bottom_text}
              </p> */}

              {/* AUDIENCE GROUPS LIST */}
              <div className="grid grid-cols-1 gap-5">
                {groups.map((group, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 12 }}
                    className="group flex items-center gap-6 p-7 rounded-3xl border border-slate-50 bg-slate-50/40 hover:bg-white hover:border-brand-accent/20 hover:shadow-xl transition-all duration-500"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-brand-accent group-hover:bg-brand-accent group-hover:text-white transition-all duration-500 shrink-0">
                      {getIcon(index)}
                    </div>
                    <span className="text-xl font-bold text-brand-dark transition-colors duration-500">
                      {group.title}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
