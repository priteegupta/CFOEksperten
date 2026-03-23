"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useInView, animate, motion } from "framer-motion";
import { type Dictionary } from "@/get-dictionary";

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
  const inView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });
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
    }
  }, [inView, to, delay, suffix, prefix]);

  return (
    <motion.span
      ref={ref}
      animate={
        isDone
          ? {
              scale: [1, 1.1, 1],
              textShadow: "0px 0px 25px rgba(96, 165, 250, 0.4)",
              color: "#60A5FA",
            }
          : {}
      }
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="inline-block font-serif tracking-tighter text-brand-dark transition-colors duration-700"
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
  // ✅ ALL 22 IMAGES - ORIGINAL COLOR & PREVIOUS SIZES
  const partnerLogos = [
    { src: "/company1.jpeg" },
    { src: "/company2.jpeg" },
    { src: "/company3.jpeg" },
    { src: "/company4.jpeg" },
    { src: "/company5.jpeg" },
    { src: "/company6.png", size: "large" },
    { src: "/company7.jpeg" },
    { src: "/company8.jpeg" },
    { src: "/company9.jpeg" },
    { src: "/company10.jpeg" },
    { src: "/company11.jpeg" },
    { src: "/company12.png" },
    { src: "/company13.png" },
    { src: "/company14.png" },
    { src: "/company15.png" },
    { src: "/company16.png" },
    { src: "/company17.png" },
    { src: "/company18.png" },
    { src: "/company19.png" },
    { src: "/company20.png" },
    { src: "/company21.png" },
    { src: "/company22.png" },
  ];

  const stats = [
    { to: 120, suffix: "+", label: dictionary.stats.startups, delay: 100 },
    { to: 3, suffix: "", label: dictionary.stats.countries, delay: 300 },
    {
      to: 350,
      suffix: "M",
      prefix: "$",
      label: dictionary.stats.capital,
      delay: 500,
    },
  ];

  return (
    <section className="w-full bg-white py-20 border-b border-slate-50 overflow-hidden">
      {/* 1. SCROLLING MARQUEE - MATCHING YOUR SPEED CODE */}
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

        {/* Gradient edges for that "faded" look */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-20 pointer-events-none" />

        <div className="custom-marquee items-center py-4">
          {[...partnerLogos, ...partnerLogos].map((logo, index) => {
            const isLarge = logo.size === "large";
            return (
              <div
                key={index}
                className={`flex-shrink-0 mx-10 relative transition-all duration-500 hover:scale-110 cursor-pointer ${
                  isLarge ? "w-56 h-24" : "w-48 h-20"
                }`}
              >
                <Image
                  src={logo.src}
                  alt={`Partner ${index}`}
                  fill
                  className={`object-contain p-2 grayscale-0 opacity-100 ${isLarge ? "scale-125" : ""}`}
                  unoptimized
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. NUMERICAL STATS - REFINED DESKTOP SIZE & BLUE POP */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              {/* Reduced size for desktop elegance */}
              <div className="text-6xl md:text-7xl lg:text-8xl font-serif font-bold mb-2">
                <AnimatedCounter
                  to={stat.to}
                  suffix={stat.suffix}
                  prefix={stat.prefix}
                  delay={stat.delay}
                />
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: stat.delay / 1000 + 0.5 }}
                className="text-[11px] md:text-[12px] font-black text-slate-400 uppercase tracking-[0.3em] text-center"
              >
                {stat.label}
              </motion.div>

              {/* Light Blue Accent Line */}
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "32px" }}
                transition={{ duration: 0.8, delay: stat.delay / 1000 + 0.8 }}
                className="h-[2px] bg-brand-accent mt-6 rounded-full"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
