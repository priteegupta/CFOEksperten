"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { type Dictionary } from "@/get-dictionary";

export default function PartnerStats({ dictionary }: { dictionary: Dictionary }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // ✅ Updated scalable structure
  const partnerLogos = [
    { src: "/company1.jpeg" },
    { src: "/company2.jpeg" },
    { src: "/company3.jpeg" },
    { src: "/company4.jpeg" },
    { src: "/company5.jpeg" },
    { src: "/company6.png", size: "large" }, // 👈 special logo
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
    { src: "/company23.png" },
    { src: "/company24.png" },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    const currentRef = sectionRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white py-12 border-b border-slate-100 overflow-hidden"
    >
      {/* 1. Scrolling Marquee Section */}
      <div className="relative w-full mb-16 overflow-hidden">
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

        {/* Gradient edges */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-20 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-20 pointer-events-none"></div>

        <div className="custom-marquee items-center py-4">
          {[...partnerLogos, ...partnerLogos, ...partnerLogos].map(
            (logo, index) => {
              const isLarge = logo.size === "large";

              return (
                <div
                  key={index}
                  className={`flex-shrink-0 mx-10 relative transition-all duration-500 hover:scale-110 cursor-pointer 
                  ${isLarge ? "w-56 h-24" : "w-48 h-20"}`}
                >
                  <Image
                    src={logo.src}
                    alt={`Partner ${index}`}
                    fill
                    className={`object-contain p-2 ${
                      logo.size === "large" ? "scale-150" : ""
                    }`}
                    unoptimized
                  />
                </div>
              );
            },
          )}
        </div>
      </div>

      {/* 2. Compact Statistics Grid */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { val: "120+", label: dictionary.stats.startups, delay: "100ms" },
            { val: "3", label: dictionary.stats.countries, delay: "250ms" },
            { val: "$350M", label: dictionary.stats.capital, delay: "400ms" },
          ].map((stat, i) => (
            <div
              key={i}
              className={`group text-center p-4 md:p-6 rounded-xl transition-all duration-1000 hover:bg-slate-50 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: stat.delay }}
            >
              <div className="text-4xl md:text-5xl font-serif text-[#10367D] mb-1 md:mb-2 group-hover:text-brand-accent transition-colors duration-300">
                {stat.val}
              </div>
              <div className="text-[9px] md:text-[10px] font-bold tracking-[0.2em] md:tracking-[0.25em] text-slate-400 uppercase group-hover:text-[#10367D] transition-colors duration-300">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
