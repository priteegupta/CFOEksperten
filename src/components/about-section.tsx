"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { type Dictionary } from "@/get-dictionary";

export default function AboutSection({
  dictionary,
}: {
  dictionary: Dictionary;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });

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
        strokeWidth={2}
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
        strokeWidth={2}
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
        strokeWidth={2}
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
        strokeWidth={2}
        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>,
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="pt-32 pb-40 bg-white overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-12">
        {/* SECTION 1: WHO WE ARE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center mb-40">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            className="lg:col-span-7 space-y-8"
          >
            <div className="flex items-center gap-4">
              <span className="w-12 h-1 bg-brand-accent"></span>
              <span className="text-brand-accent text-xs font-black uppercase tracking-[0.4em]">
                {dictionary.about.who_we_are_label}
              </span>
            </div>
            <h2 className="text-6xl md:text-8xl font-serif font-bold text-brand-dark leading-[0.9] tracking-tighter">
              {dictionary.about.title}
            </h2>
            <p className="text-2xl text-brand-dark font-medium leading-tight max-w-xl">
              {dictionary.about.subtitle}
            </p>
          </motion.div>
          <div className="lg:col-span-5 relative h-137.5 rounded-[40px] overflow-hidden shadow-2xl">
            <Image
              src="https://images.openai.com/static-rsc-4/x55JXAaUgYOmSrS2D1uOJ2XrLHxAgt9Bsb9vqyeSWjm0cis3Mfh9UsTqHin4mx40GyNQJoeWuBxqQEtzbDeCgQmTeApjFZOkpAKr2lVpeEwfD4G2od-aJxsI-HlEBY1MRtOwYyseX-tyH_l_mgUXX2TIMfiOdFWDJZ3bY2yaieF7tyH0NkEY6uuqGUCUqXMi?purpose=fullsize"
              alt="Who We Are"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* SECTION 2: WHAT WE DO */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-40">
          <div className="lg:col-span-5 order-2 lg:order-1 relative h-112.5 rounded-[40px] overflow-hidden">
            <Image
              src="https://images.openai.com/static-rsc-4/PCNKruk3C8pK_5QFfsfwGqTOOLoUJqhIt_d7QkDka_SLGagaachI7FT_iwlu-NgXFeR3mcVtJkpCK2L20dCXhZGlTlN8FKehfuJeo9W4rTKp08uPnMX8r3G1LE2sTp9CFIt5P2uWW_zdAOWrMQGXYBQAPMxo8MnpvOc5iNIFujqPJJipaNHnWJWXQ9nJvKfp?purpose=fullsize"
              alt="What We Do"
              fill
              className="object-cover"
            />
          </div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            className="lg:col-span-7 order-1 lg:order-2 space-y-10"
          >
            <div className="flex items-center gap-4">
              <span className="w-12 h-1 bg-brand-accent"></span>
              <span className="text-brand-accent text-xs font-black uppercase tracking-[0.4em]">
                {dictionary.about.what_we_do_label}
              </span>
            </div>
            <p className="text-lg text-slate-500 font-light leading-relaxed border-l-4 border-slate-100 pl-8">
              {dictionary.about.description}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {dictionary.about.expertise_list.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-brand-accent transition-all"
                >
                  <div className="w-2 h-2 rounded-full bg-brand-accent" />
                  <span className="text-sm font-bold text-brand-dark uppercase tracking-wider">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* SECTION 3: OUR ROLE (TEAM) */}
        <div className="space-y-16">
          <div className="flex items-center gap-4 mb-12">
            <span className="w-12 h-1 bg-brand-accent"></span>
            <span className="text-brand-accent text-xs font-black uppercase tracking-[0.4em]">
              {dictionary.about.our_role_label}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dictionary.about.team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1 }}
                className="group p-8 rounded-4xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:border-brand-accent/20 transition-all duration-500 flex flex-col h-full"
              >
                <div className="flex justify-between items-center mb-10">
                  <div className="p-3 bg-brand-accent/5 rounded-xl text-brand-accent group-hover:bg-brand-accent group-hover:text-white transition-all duration-500">
                    {teamIcons[index % teamIcons.length]}
                  </div>
                  <span className="inline-flex items-center justify-center px-5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-[11px] font-semibold tracking-[0.18em] text-[#4C8DFF] whitespace-nowrap transition-all duration-300 ease-out hover:bg-[#4C8DFF] hover:text-white hover:border-transparent hover:shadow-[0_8px_20px_-6px_rgba(76,141,255,0.45)]">
                    {member.years}+ YEARS
                  </span>
                </div>
                <h3 className="text-xl font-bold text-brand-dark mb-1">
                  {member.name}
                </h3>
                <p className="text-brand-accent text-[9px] font-black uppercase tracking-[0.2em] mb-6">
                  {member.role}
                </p>
                <p className="text-slate-500 text-xs leading-relaxed font-light">
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
