"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useInView, animate, motion } from "framer-motion";
import { type Dictionary } from "@/get-dictionary";

type StatsType = {
  startups: string;
  countries: string;
  capital: string;
};

function AnimatedCounter({
  to,
  suffix,
  prefix = "",
  delay,
}: {
  to: number;
  suffix: string;
  prefix?: string;
  delay: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: false, margin: "0px 0px -100px 0px" });
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (inView) {
      const controls = animate(0, to, {
        duration: 2.5,
        delay: delay / 1000,
        ease: [0.16, 1, 0.3, 1],
        onUpdate(value) {
          if (ref.current) {
            ref.current.textContent =
              prefix + Math.floor(value).toLocaleString() + suffix;
          }
        },
        onComplete: () => setIsDone(true),
      });
      return controls.stop;
    } else {
      // Defer state update to avoid cascading renders warning
      const timeoutId = setTimeout(() => setIsDone(false), 0);
      return () => clearTimeout(timeoutId);
    }
  }, [inView, to, delay, suffix, prefix]);

  return (
    <motion.span
      ref={ref}
      //  "Pop" logic 
      animate={
        isDone
          ? {
            scale: [1, 1.15, 1], // The physical pop
            textShadow: "0px 0px 30px rgba(96, 165, 250, 0.5)", // The glow
          }
          : {}
      }
      transition={{
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1], // Snappier "Senior Dev" easing
      }}
      className={`inline-block font-serif tracking-tighter transition-colors duration-1000 ${isDone ? "text-brand-gradient" : "text-brand-dark"
        }`}
    >
      0{suffix}
    </motion.span>
  );
}

export default function PartnerStats({
  dictionary,
}: {
  dictionary: Dictionary;
}) {
  const partnerLogos = [
    { src: "/company1.jpeg" },
    { src: "/company2.jpeg", size: "large" },
    { src: "/company3.jpeg", size: "large" },
    { src: "/company4.png", size: "xl" },
    { src: "/company5.jpeg" },
    { src: "/company6.png", size: "xl" },
    { src: "/company7.png", size: "xl" },
    { src: "/company8.png", size: "xl" },
    { src: "/company9.jpeg", size: "xl" },
    { src: "/company10.jpeg" },
    { src: "/company11.jpeg" },
    { src: "/company12.png", size: "large" },
    { src: "/company13.png", size: "xl" },
    { src: "/company14.png", size: "xl" },
    { src: "/company15.jpeg", size: "large" },
    { src: "/company16.png", size: "xl" },
    { src: "/company17.png" },
    { src: "/company18.png", size: "large" },
    { src: "/company19.png" },
    { src: "/company20.png" },
    { src: "/company21.png" },
    { src: "/company22.png" },
  ];
  const statsData = dictionary.stats as StatsType;

  const stats = [
    { to: 120, suffix: "+", label: statsData.startups, delay: 100 },
    { to: 3, suffix: "", label: statsData.countries, delay: 300 },
    {
      to: 350,
      suffix: "M",
      prefix: "$",
      label: statsData.capital,
      delay: 500,
    },
  ];

  return (
    <section className="w-full bg-white py-20 border-b border-slate-50 overflow-hidden">
      <div className="relative w-full mb-24 overflow-hidden">
        <style jsx>{`
          @keyframes marquee {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          .custom-marquee {
            display: flex;
            width: max-content;
            animation: marquee 40s linear infinite;
          }
          .custom-marquee:hover {
            animation-play-state: paused;
          }
        `}</style>

        <div className="absolute inset-y-0 left-0 w-32 bg-linear-to-r from-white to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-linear-to-l from-white to-transparent z-20 pointer-events-none" />

        <div className="custom-marquee flex items-center gap-12 py-4">
          {[...partnerLogos, ...partnerLogos].map((logo, index) => {
            const isLarge = logo.size === "large";
            const isXL = logo.size === "xl";

            return (
              <div
                key={index}
                className={`shrink-0 relative flex items-center justify-center transition-all duration-500 hover:scale-105 cursor-pointer 
        ${isXL ? "w-96 h-44" : isLarge ? "w-64 h-28" : "w-56 h-24"}`}
              >
                <Image
                  src={logo.src}
                  alt={`Partner ${index}`}
                  fill
                  className={`object-contain object-center ${isXL ? "p-1" : isLarge ? "p-2" : "p-4"
                    }`}
                  sizes={isXL ? "384px" : isLarge ? "256px" : "224px"}
                  // Performance tip: only prioritize the first few visible logos
                  priority={index < 4}
                  loading={index < 4 ? undefined : "lazy"}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="text-6xl md:text-7xl lg:text-8xl font-serif font-bold mb-2">
                <AnimatedCounter
                  to={stat.to}
                  suffix={stat.suffix}
                  prefix={stat.prefix || ""}
                  delay={stat.delay}
                />
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: false }}
                transition={{ delay: stat.delay / 1000 + 0.5 }}
                className="text-[11px] md:text-[12px] font-black text-slate-400 uppercase tracking-[0.3em] text-center"
              >
                {stat.label}
              </motion.div>

              {/*  'bg-brand-gradient' and made it slightly taller */}
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "40px" }}
                viewport={{ once: false }}
                transition={{ duration: 0.8, delay: stat.delay / 1000 + 0.8 }}
                className="h-0.75 bg-brand-gradient mt-6 rounded-full"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
