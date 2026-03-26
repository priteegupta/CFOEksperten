"use client";

import { motion } from "framer-motion";
import { type Dictionary } from "@/get-dictionary";

export default function ChallengeSection({
  dictionary,
}: {
  dictionary: Dictionary;
}) {
  // Data mapping from your structure
  const leftColPoints = [
    dictionary.challenge.points[0],
    `${dictionary.challenge.stat_number} ${dictionary.challenge.stat_text}`,
    dictionary.challenge.points[3],
    dictionary.challenge.points[5],
  ];

  const rightColPoints = [
    dictionary.challenge.points[1],
    dictionary.challenge.points[2],
    dictionary.challenge.points[4],
  ];

  // Updated RenderBox with New Theme Colors
  const renderBox = (text: string, index: number, delay: number) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-100px" }}
      transition={{
        duration: 0.7,
        delay: delay,
        ease: [0.21, 1, 0.36, 1],
      }}
      whileHover={{
        y: -8,
        transition: { duration: 0.3, ease: "easeOut" },
      }}
      className="group bg-white rounded-2xl p-6 md:p-8 shadow-[0_10px_30px_-10px_rgba(15,23,42,0.05)] border border-slate-100 hover:border-brand-accent/40 transition-all duration-500 flex items-start gap-5"
    >
      <div className="flex-shrink-0 mt-1 relative">
        {/*  Blue pulse background instead of green */}
        <div className="absolute inset-0 bg-brand-accent/10 rounded-full scale-0 group-hover:scale-150 transition-transform duration-700 opacity-0 group-hover:opacity-100"></div>

        <svg
          className="w-6 h-6 text-brand-accent relative z-10 transition-colors duration-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      </div>
      <p className="text-brand-dark/70 text-sm md:text-base font-medium leading-relaxed group-hover:text-brand-dark transition-colors duration-300">
        {text}
      </p>
    </motion.div>
  );

  return (
    <section
      id="challenge"
      className="w-full bg-brand-light py-24 md:py-40 overflow-hidden relative"
    >
      {/* Subtle Nordic Design Detail in Slate */}
      <div className="absolute top-0 right-0 w-1/4 h-full bg-slate-200/10 skew-x-12 translate-x-20 pointer-events-none" />

      <div className="container relative z-10 mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          {/* Left Column: Context Header */}
          <div className="lg:col-span-5 flex flex-col lg:sticky lg:top-32">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="flex items-center gap-3 mb-6">
                {/* Light Blue accent line */}
                <span className="w-8 h-[2px] bg-brand-accent rounded-full"></span>
                <span className="text-brand-accent text-[13px] font-black uppercase tracking-[0.6em] leading-none">
                  {dictionary.challenge.title}
                </span>
              </div>

              <h2 className="text-5xl md:text-7xl font-serif font-bold text-brand-dark leading-[1.1] mb-8 tracking-tighter">
                {dictionary.challenge.description}
              </h2>

              <p className="text-lg md:text-xl text-slate-500 font-light leading-relaxed max-w-md">
                {dictionary.challenge.context}
              </p>
            </motion.div>
          </div>

          {/* Right Column: Masonry Grid */}
          <div className="lg:col-span-7 flex flex-col sm:grid sm:grid-cols-2 gap-6 lg:gap-8 items-start">
            <div className="flex flex-col gap-6 lg:gap-8 w-full">
              {leftColPoints.map((text, idx) =>
                renderBox(text, idx, idx * 0.15),
              )}
            </div>

            <div className="flex flex-col gap-6 lg:gap-8 w-full sm:mt-20">
              {rightColPoints.map((text, idx) =>
                renderBox(text, idx + 4, (idx + 4) * 0.15),
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
