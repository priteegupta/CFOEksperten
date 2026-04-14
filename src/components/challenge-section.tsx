"use client";

import { motion } from "framer-motion";
import { type Dictionary } from "@/get-dictionary";

type ChallengeType = {
  title: string;
  description: string;
  context: string;
  points: string[];
};

export default function ChallengeSection({
  dictionary,
}: {
  dictionary: Dictionary;
}) {
  const challenge = dictionary.challenge as ChallengeType;

  // Strategic 2-column distribution for the 4 points provided
  const leftColPoints = [challenge.points[0], challenge.points[2]];
  const rightColPoints = [challenge.points[1], challenge.points[3]];

  const renderBox = (text: string, index: number, delay: number) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{
        duration: 0.8,
        delay: delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{
        y: -10,
        scale: 1.02,
        transition: { duration: 0.4, ease: "easeOut" },
      }}
      className="group relative bg-white rounded-[2.5rem] p-8 md:p-10 shadow-[0_20px_50px_-15px_rgba(15,23,42,0.06)] border border-slate-100 hover:border-brand-accent/40 hover:shadow-2xl transition-all duration-700 flex flex-col gap-6"
    >
      <div className="shrink-0 relative w-12 h-12 flex items-center justify-center">
        {/* Radar Pulse Background */}
        <div className="absolute inset-0 bg-brand-accent/10 rounded-2xl group-hover:bg-brand-accent group-hover:scale-110 transition-all duration-500"></div>

        {/* THE ROBUST WARNING SVG */}
        <svg
          className="w-7 h-7 text-brand-accent group-hover:text-white relative z-10 transition-colors duration-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
          />
        </svg>
      </div>

      <p className="text-slate-800 text-[18px] md:text-[19px] font-bold leading-tight tracking-tight group-hover:text-brand-dark transition-colors duration-300">
        {text}
      </p>
    </motion.div>
  );

  return (
    <section
      id="challenge"
      className="w-full bg-[#FCFDFE] py-24 md:py-32 overflow-hidden relative scroll-mt-20"
    >
      {/* Nordic Design Detail */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-100/40 skew-x-[-15deg] translate-x-1/3 pointer-events-none" />

      <div className="container relative z-10 mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-start">
          {/* Left: Sticky Header and Context */}
          <div className="lg:col-span-5 flex flex-col lg:sticky lg:top-40">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-4 mb-8">
                <span className="w-12 h-[2.5px] bg-brand-accent rounded-full"></span>
                <span className="text-brand-accent text-[11px] font-black uppercase tracking-[0.5em] leading-none">
                  {challenge.title}
                </span>
              </div>

              <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-brand-dark leading-[0.95] mb-10 tracking-tighter">
                {challenge.description}
              </h2>

              <p className="text-lg md:text-xl text-slate-500 font-light leading-relaxed max-w-md border-l-4 border-slate-200 pl-8 ">
                {challenge.context}
              </p>
            </motion.div>
          </div>

          {/* Right: Masonry Cards Grid */}
          <div className="lg:col-span-7 flex flex-col sm:grid sm:grid-cols-2 gap-8 lg:gap-10 items-start">
            <div className="flex flex-col gap-8 lg:gap-10 w-full">
              {leftColPoints.map((text, idx) =>
                renderBox(text, idx, idx * 0.2),
              )}
            </div>

            <div className="flex flex-col gap-8 lg:gap-10 w-full sm:mt-24">
              {rightColPoints.map((text, idx) =>
                renderBox(text, idx + 2, (idx + 2) * 0.2),
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
