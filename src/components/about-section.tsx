"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";
import { type Dictionary } from "@/get-dictionary";

type AboutType = {
  who_we_are_label: string;
  title: string;
  subtitle: string;
  what_we_do_label: string;
  description: string;
  expertise_list: string[];
  our_role_label: string;
  team: {
    name: string;
    role: string;
    bio: string;
    years: number;
  }[];
};

export default function AboutSection({
  dictionary,
}: {
  dictionary: Dictionary;
}) {
  const about = dictionary.about as AboutType;
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });
  const [isExpanded, setIsExpanded] = useState(false);

  // Strategic text splitting for high-end UX
  const splitPoint = "Det er her vi kommer inn.";
  const parts = about.description.split(splitPoint);
  const mainDesc = parts[0];
  const detailedDesc = splitPoint + (parts[1] || "");

  const teamIcons = [
    <svg
      key="1"
      className="w-5 h-5"
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
    </svg>,
    <svg
      key="2"
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
      />
    </svg>,
    <svg
      key="3"
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9 17v-2m3 2v-4m3 4v-6m2 10H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2z"
      />
    </svg>,
    <svg
      key="4"
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>,
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-24 md:py-36 bg-[#FCFDFE] overflow-hidden scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* SECTION 1: IDENTITY */}
        <div className="grid lg:grid-cols-12 gap-16 items-center mb-36">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-10"
          >
            <div className="flex items-center gap-4">
              <span className="w-14 h-0.5 bg-brand-accent rounded-full"></span>
              <span className="text-brand-accent text-[11px] font-black uppercase tracking-[0.5em]">
                {about.who_we_are_label}
              </span>
            </div>
            <h2 className="text-6xl md:text-8xl font-serif font-bold text-brand-dark leading-[0.85] tracking-tighter">
              {about.title}
            </h2>
            <p className="text-2xl md:text-3xl text-slate-500 font-light leading-snug max-w-xl">
              {about.subtitle}
            </p>
          </motion.div>

          <div className="lg:col-span-5 relative h-125 rounded-[3rem] overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)]">
            <Image
              src="/whoweare.png"
              alt="Identity"
              fill
              className="object-cover transition-transform duration-1000 hover:scale-105"
            />
          </div>
        </div>

        {/* SECTION 2: CAPABILITIES (Sticky Layout) */}
        <div className="grid lg:grid-cols-12 gap-16 mb-44 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-32 h-137.5 rounded-[3rem] overflow-hidden shadow-2xl">
            <Image
              src="https://images.openai.com/static-rsc-4/PCNKruk3C8pK_5QFfsfwGqTOOLoUJqhIt_d7QkDka_SLGagaachI7FT_iwlu-NgXFeR3mcVtJkpCK2L20dCXhZGlTlN8FKehfuJeo9W4rTKp08uPnMX8r3G1LE2sTp9CFIt5P2uWW_zdAOWrMQGXYBQAPMxo8MnpvOc5iNIFujqPJJipaNHnWJWXQ9nJvKfp?purpose=fullsize"
              alt="Expertise"
              fill
              className="object-cover "
            />
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 1 }}
            className="lg:col-span-7 space-y-12"
          >
            <div className="flex items-center gap-4">
              <span className="w-14 h-0.5 bg-brand-accent rounded-full"></span>
              <span className="text-brand-accent text-[11px] font-black uppercase tracking-[0.5em]">
                {about.what_we_do_label}
              </span>
            </div>

            <div className="relative">
              <div className="text-xl text-brand-dark font-medium leading-relaxed border-l-4 border-slate-100 pl-8 space-y-6">
                <p>{mainDesc}</p>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="text-slate-500 text-lg font-light leading-relaxed pt-2"
                    >
                      {detailedDesc}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="ml-9 mt-8 flex items-center gap-4 text-brand-dark font-black text-[10px] tracking-[0.3em] uppercase group cursor-pointer"
              >
                <span className="w-8 h-px bg-brand-dark group-hover:w-12 transition-all" />
                {isExpanded ? "VIS MINDRE" : "LES MER OM VÅR KOMPETANSE"}
              </button>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 pt-4">
              {about.expertise_list.map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ x: 8 }}
                  className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-slate-50 shadow-sm hover:border-brand-accent/30 hover:shadow-md transition-all group"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-accent group-hover:scale-150 transition-transform" />
                  <span className="text-[12px] font-bold text-slate-700 uppercase tracking-wider">
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* SECTION 3: THE TEAM */}
        <div className="space-y-16">
          <div className="flex items-center gap-4">
            <span className="w-14 h-0.5 bg-brand-accent rounded-full"></span>
            <span className="text-brand-accent text-[11px] font-black uppercase tracking-[0.5em]">
              {about.our_role_label}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {about.team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="group p-10 rounded-[2.5rem] bg-white border border-slate-50 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col h-full"
              >
                <div className="flex justify-between items-start mb-10">
                  <div className="p-4 bg-brand-accent/5 rounded-2xl text-brand-accent group-hover:bg-brand-accent group-hover:text-white transition-all duration-500">
                    {teamIcons[index % teamIcons.length]}
                  </div>
                  <span className="px-4 py-1.5 rounded-full bg-slate-50 text-[10px] font-black tracking-widest text-slate-400 group-hover:bg-brand-accent group-hover:text-white transition-colors">
                    {member.years}+ YEARS
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-brand-dark mb-1 tracking-tight">
                  {member.name}
                </h3>
                <p className="text-brand-accent text-[10px] font-black uppercase tracking-[0.2em] mb-8">
                  {member.role}
                </p>
                <p className="text-slate-500 text-[13px] leading-relaxed font-light">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
