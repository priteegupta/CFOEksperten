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
      className="py-24 md:py-44 bg-[#F8FAFC] overflow-hidden scroll-mt-20"
    >
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="grid lg:grid-cols-12 gap-8 mb-24 items-end">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-8"
          >
            <div className="flex items-center gap-4 mb-8">
              <span className="w-12 h-0.5 bg-brand-accent"></span>
              <span className="text-brand-accent text-[11px] font-black uppercase tracking-[0.6em]">
                {dictionary.services.label}
              </span>
            </div>
            <h2 className="text-6xl md:text-8xl font-serif font-bold text-brand-dark leading-[0.9] tracking-tighter">
              {dictionary.services.title}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-4 lg:pb-4"
          >
            <p className="text-slate-400 text-sm font-medium uppercase tracking-widest text-right hidden lg:block italic">
              {dictionary.services.footer}
            </p>
          </motion.div>
        </div>

        {/* Intro Context Area */}
        <div className="grid lg:grid-cols-12 gap-16 mb-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7"
          >
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark mb-8 leading-tight">
              {dictionary.services.introTitle}
            </h3>
            <p className="text-slate-600 leading-relaxed text-lg font-light max-w-2xl">
              {dictionary.services.introDescription}
            </p>
            <motion.div
              whileHover={{ x: 10 }}
              className="mt-10 flex items-center gap-4 text-brand-dark font-bold cursor-default group"
            >
              <span className="w-8 h-px bg-brand-dark group-hover:w-12 transition-all"></span>
              {dictionary.services.closing}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-5 bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-50"
          >
            <div className="space-y-6">
              {dictionary.services.points.map((point: string, idx: number) => (
                <div key={idx} className="flex items-start gap-4 group">
                  <span className="mt-2 w-2 h-2 rounded-full bg-brand-accent group-hover:scale-150 transition-transform"></span>
                  <p className="text-slate-700 text-[15px] font-medium leading-snug">
                    {point}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-12 pt-10 border-t border-slate-100">
              <h4 className="text-[10px] font-black text-slate-400 mb-6 uppercase tracking-[0.4em]">
                {dictionary.services.virtualCfoTitle}
              </h4>
              <div className="grid grid-cols-1 gap-4">
                {dictionary.services.virtualCfoPoints.map(
                  (point: string, idx: number) => (
                    <div
                      key={idx}
                      className="flex items-center gap-4 text-slate-500 text-[13px] font-light"
                    >
                      <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                      <p>{point}</p>
                    </div>
                  ),
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Dynamic Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {serviceKeys.map((key, index) => {
            const service = dictionary.services[key];
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 1,
                  delay: index * 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group relative bg-white rounded-4xl overflow-hidden border border-slate-100 hover:border-brand-accent/30 transition-all duration-700 shadow-xl shadow-slate-200/40"
              >
                <div className="flex flex-col h-full">
                  {/* Service Image Container */}
                  <div className="relative w-full h-72 overflow-hidden">
                    <Image
                      src={serviceImages[key]}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110 group-hover:rotate-1"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-white via-transparent to-transparent opacity-80 lg:hidden"></div>
                  </div>

                  {/* Service Content */}
                  <div className="p-10 flex flex-col justify-between grow">
                    <div>
                      <div className="flex justify-between items-start mb-6">
                        <h3 className="text-2xl font-bold text-brand-dark tracking-tight">
                          {service.title}
                        </h3>
                        <span className="text-brand-accent opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0">
                          <svg
                            className="w-6 h-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                          </svg>
                        </span>
                      </div>

                      <p className="text-slate-500 text-[16px] leading-relaxed mb-10 font-light">
                        {service.description}
                      </p>

                      <div className="grid grid-cols-1 gap-4">
                        {service.points.map((point: string, idx: number) => (
                          <div
                            key={idx}
                            className="flex items-center gap-4 text-[13px] text-slate-700 font-bold tracking-tight"
                          >
                            <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-brand-accent group-hover:w-4 transition-all duration-500"></span>
                            {point}
                          </div>
                        ))}
                      </div>
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
