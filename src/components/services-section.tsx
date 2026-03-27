"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { type Dictionary } from "@/get-dictionary";

export default function ServicesSection({
  dictionary,
}: {
  dictionary: Dictionary;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });

  const serviceKeys = [
    "budget",
    "liquidity",
    "forecast",
    "virtual_cfo",
  ] as const;

  const serviceImages: { [key: string]: string } = {
    budget:
      "https://images.unsplash.com/photo-1554224154-26032ffc0d07?q=80&w=600&auto=format&fit=crop",
    liquidity:
      "https://i.pinimg.com/736x/9f/1b/3c/9f1b3cc7a89f92825b2850ba1f57b33f.jpg",
    forecast:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop",
    virtual_cfo:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=600&auto=format&fit=crop",
  };

  return (
    <section
      ref={sectionRef}
      id="services"
      className="py-24 md:py-40 bg-brand-light overflow-hidden" // Updated to Nordic Light theme color
    >
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl mb-16 md:mb-24"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="w-10 h-0.5 bg-brand-accent"></span>
            <span className="text-brand-accent text-[12px] font-black uppercase tracking-[0.5em]">
              Expertise
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl font-serif font-bold text-brand-dark tracking-tighter leading-none">
            {dictionary.services.title}
          </h2>
        </motion.div>

        {/* Dynamic Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {serviceKeys.map((key, index) => {
            const service = dictionary.services[key];
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.8,
                  delay: index * 0.15,
                  ease: [0.21, 1, 0.36, 1],
                }}
                className="group relative bg-white overflow-hidden rounded-3xl shadow-[0_10px_40px_-15px_rgba(15,23,42,0.08)] hover:shadow-[0_20px_60px_-15px_rgba(96,165,250,0.15)] transition-all duration-500 border border-slate-100"
              >
                <div className="flex flex-col lg:flex-row h-full">
                  {/* Service Image Container */}
                  <div className="relative w-full lg:w-2/5 h-64 lg:h-auto overflow-hidden">
                    <Image
                      src={serviceImages[key]}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    {/* Subtle Gradient Overlay */}
                    <div className="absolute inset-0 bg-linear-to-tr from-brand-dark/20 to-transparent opacity-60"></div>
                  </div>

                  {/* Service Content */}
                  <div className="w-full lg:w-3/5 p-8 lg:p-10 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-brand-dark uppercase tracking-widest mb-4 group-hover:text-brand-accent transition-colors duration-300">
                        {service.title}
                      </h3>
                      <p className="text-slate-500 text-[15px] leading-relaxed mb-8 font-light">
                        {service.description}
                      </p>

                      {/* Feature Points */}
                      <ul className="space-y-3">
                        {service.points.map((point: string, idx: number) => (
                          <li
                            key={idx}
                            className="flex items-center gap-3 text-[13px] text-slate-600 font-medium"
                          >
                            <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-brand-accent"></span>
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
