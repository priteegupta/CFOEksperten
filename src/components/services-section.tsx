"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { type Dictionary } from "@/get-dictionary";
import { openCalendly } from "@/lib/calendly";

type ServiceDetail = {
  title: string;
  points: string[];
};

type ServiceType = {
  title: string;
  description: string;
  points: string[];
};

type ServicesDataType = {
  label: string;
  title: string;
  introTitle: string;
  closing: string;
  footer: string;
  sections: ServiceDetail[];
  budget: ServiceType;
  liquidity: ServiceType;
  forecast: ServiceType;
  virtual_cfo: ServiceType;
};

// --- ANIMATION VARIANTS WITH TYPE FIXES ---
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const, // Using 'as any' or 'as const' fixes the TS error
    },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export default function ServicesSection({
  dictionary,
}: {
  dictionary: Dictionary & { navbar: { book_a_meeting: string } };
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const services = dictionary.services as ServicesDataType;

  const serviceKeys = [
    "budget",
    "liquidity",
    "forecast",
    "virtual_cfo",
  ] as const;

  const serviceImages: { [key: string]: string } = {
    budget:
      "https://www.scripps.org/sparkle-assets/preview_thumbnails/news_items/8082/default-ff141f1761721df8384df2fbb1f33286.jpg",
    liquidity: "/liquidity.png",
    forecast:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000&auto=format&fit=crop",
    virtual_cfo: "/virtualcfo.png",
  };

  return (
    <section
      ref={sectionRef}
      id="services"
      className="py-24 md:py-32 bg-[#F8FAFC] overflow-hidden scroll-mt-20"
    >
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-12">
        {/* HEADER */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6"
        >
          <div className="space-y-3">
            <span className="text-blue-600 text-[11px] font-black uppercase tracking-[0.4em] block">
              {services.label}
            </span>
            <h2 className="text-6xl md:text-8xl font-serif font-medium text-[#1E293B] tracking-tight leading-[0.9]">
              {services.title}
            </h2>
          </div>
          <p className="text-slate-400 text-[14px] max-w-70 md:text-right  leading-relaxed">
            {services.footer}
          </p>
        </motion.div>

        {/* HERO CARD (Screenshot 1) */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          whileHover={{ y: -8 }}
          className="bg-white rounded-[3rem] p-10 md:p-20 mb-28 shadow-sm border border-slate-100 grid lg:grid-cols-2 gap-12 items-center transition-all duration-500 ease-out"
        >
          <div className="space-y-6">
            <h3 className="text-4xl md:text-6xl font-serif font-bold text-[#1E293B] leading-tight">
              {services.introTitle}
            </h3>
            <p className="text-slate-500 text-lg max-w-md font-light leading-relaxed">
              {services.budget.description}
            </p>
            <p className="text-blue-600 font-bold text-[15px] tracking-tight border-l-3 border-blue-600 pl-5">
              {services.closing}
            </p>
          </div>

          <div className="space-y-4">
            {services.liquidity.points.map((point, idx) => (
              <motion.div
                key={idx}
                whileHover={{
                  x: 10,
                  backgroundColor: "#ffffff",
                  boxShadow: "0 10px 20px rgba(0,0,0,0.02)",
                }}
                className="bg-[#F8FAFC] p-5 rounded-2xl flex items-center gap-5 group border border-transparent transition-all duration-300"
              >
                <span className="w-2 h-2 rounded-full bg-blue-500 group-hover:scale-125 transition-transform" />
                <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-700">
                  {point}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* NUMBERED LISTS (Screenshots 2 & 3) */}
        <div className="grid md:grid-cols-2 gap-x-24 gap-y-20 mb-32">
          {services.sections.map((section, idx) => (
            <motion.div
              key={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="space-y-8"
            >
              <h4 className="text-4xl font-serif font-bold text-[#1E293B]">
                {section.title}
              </h4>
              <div className="flex flex-col">
                {section.points.map((point, pIdx) => (
                  <motion.div
                    key={pIdx}
                    whileHover={{ x: 12 }}
                    className="py-6 flex gap-8 items-start border-t border-slate-200 group transition-all duration-300 ease-out"
                  >
                    <span className="text-blue-600 font-bold text-base pt-0.5 group-hover:scale-110 transition-transform">
                      0{pIdx + 1}
                    </span>
                    <p className="text-slate-500 text-[18px] leading-snug group-hover:text-[#1E293B] transition-colors">
                      {point}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* STRATEGIC CONVERSION ADDITION - DIRECT CALENDLY TRIGGER */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="bg-brand-gradient rounded-[2.5rem] p-8 md:p-14 mb-32 text-white shadow-2xl relative overflow-hidden group"
        >
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-3xl md:text-4xl font-serif font-bold mb-3 tracking-tight">
                Klar for å optimalisere din økonomi?
              </h3>
              <p className="text-blue-100/80 font-light text-lg max-w-xl italic">
                La oss ta en uforpliktende prat om hvordan vi kan styrke din
                lønnsomhet.
              </p>
            </div>

            <motion.button
              className="animate-float bg-white text-brand-dark px-12 py-5 rounded-xl cursor-pointer font-black uppercase tracking-[0.2em] text-[11px] transition-all duration-500 hover:bg-brand-accent hover:text-white shadow-xl whitespace-nowrap"
              onClick={() => openCalendly("Fra_Tjenester_Seksjon")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {dictionary.navbar.book_a_meeting}
            </motion.button>
          </div>
        </motion.div>

        {/* CARD GRID  */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {serviceKeys.map((key) => {
            const service = services[key];
            return (
              <motion.div
                key={key}
                variants={fadeInUp}
                whileHover={{
                  y: -12,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.06)",
                }}
                className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-slate-50 flex flex-col h-full group transition-all duration-500 ease-out"
              >
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={serviceImages[key]}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-1000"
                  />
                </div>
                <div className="p-8 flex flex-col grow">
                  <h5 className="text-[15px] font-black uppercase tracking-tight text-[#1E293B] mb-5">
                    {service.title}
                  </h5>
                  <p className="text-[13px] text-slate-500 leading-relaxed mb-8 font-light">
                    {service.description}
                  </p>
                  <ul className="space-y-4 mt-auto">
                    {service.points.map((point, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                        <span className="text-[12px] font-medium text-slate-700 leading-tight">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
