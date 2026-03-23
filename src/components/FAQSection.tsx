"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { type Dictionary } from "@/get-dictionary";

export default function FAQSection({
  dictionary,
  lang,
}: {
  dictionary: Dictionary;
  lang: string;
}) {
  const [activeId, setActiveId] = useState<number | null>(null);

  const faqData = dictionary?.faq || {};

  const faqs = [
    {
      id: 1,
      question: faqData.q1?.question || "",
      answer: faqData.q1?.answer || "",
    },
    {
      id: 2,
      question: faqData.q2?.question || "",
      answer: faqData.q2?.answer || "",
    },
    {
      id: 3,
      question: faqData.q3?.question || "",
      answer: faqData.q3?.answer || "",
    },
    {
      id: 4,
      question: faqData.q4?.question || "",
      answer: faqData.q4?.answer || "",
    },
    {
      id: 5,
      question: faqData.q5?.question || "",
      answer: faqData.q5?.answer || "",
    },
  ].filter((faq) => faq.question !== "");

  return (
    <section
      id="faq"
      className="py-24 md:py-40 bg-white overflow-hidden scroll-mt-20"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="container mx-auto px-6 max-w-7xl"
      >
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          {/* Left Side: Editorial Header */}
          <div className="lg:w-1/3">
            <div className="sticky top-32">
              <div className="flex items-center gap-3 mb-8">
                {/* ADIAM: Light Blue Accent Line */}
                <span className="w-12 h-[2px] bg-brand-accent rounded-full"></span>
                <span className="text-brand-dark/60 text-[10px] font-black uppercase tracking-[0.6em]">
                  {faqData.notice || "FAQ"}
                </span>
              </div>

              <h2 className="text-5xl md:text-7xl font-serif font-bold text-brand-dark leading-[1.1] mb-10 tracking-tighter">
                {faqData.title ||
                  (lang === "no"
                    ? "Ofte stilte spørsmål"
                    : "Frequently Asked Questions")}
              </h2>

              <p className="text-slate-500 font-light text-lg leading-relaxed mb-12 max-w-sm">
                {faqData.subtitle || ""}
              </p>

              {/* Senior Design: Strategic Pillar & Badge (Updated to Blue Theme) */}
              <div className="hidden lg:flex flex-col items-start pt-12 border-t border-slate-100">
                <div className="flex items-start gap-8">
                  {/* Growth Pillar Metaphor in Blue */}
                  <div className="flex gap-2 h-16 items-end">
                    <div className="w-2 h-6 bg-slate-100 rounded-full"></div>
                    <div className="w-2 h-10 bg-slate-100 rounded-full"></div>
                    <div className="w-2.5 h-16 bg-gradient-to-t from-brand-accent to-[#93C5FD] rounded-full shadow-[0_10px_20px_-5px_rgba(96,165,250,0.3)]"></div>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-brand-dark uppercase tracking-[0.4em] mb-2">
                      {lang === "no"
                        ? "Strategisk Analyse"
                        : "Strategic Analysis"}
                    </span>
                    <p className="text-[11px] text-slate-400 font-medium leading-relaxed max-w-[200px] italic">
                      {lang === "no"
                        ? "Sikrer din økonomiske fremtid gjennom presisjon og innsikt."
                        : "Securing your financial future through precision and insight."}
                    </p>
                  </div>
                </div>

                <div className="mt-10">
                  <div className="inline-block px-4 py-2 border border-slate-100 rounded-full bg-slate-50/50 backdrop-blur-sm">
                    <span className="text-[9px] font-bold text-brand-dark/40 uppercase tracking-[0.2em]">
                      CFO Eksperten Quality Standard
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: High-End Accordion */}
          <div className="lg:w-2/3 space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className={`group transition-all duration-700 ease-in-out border-b border-slate-100 ${
                  activeId === faq.id
                    ? "bg-brand-light/50 p-8 md:p-10 rounded-[32px] border-transparent shadow-[0_30px_60px_-12px_rgba(15,23,42,0.05)]"
                    : "py-8 hover:bg-slate-50/50"
                }`}
              >
                <button
                  onClick={() =>
                    setActiveId(activeId === faq.id ? null : faq.id)
                  }
                  className="w-full flex items-start justify-between text-left gap-8"
                >
                  <span
                    className={`text-xl md:text-2xl font-bold transition-all duration-500 tracking-tight ${
                      activeId === faq.id
                        ? "text-brand-dark"
                        : "text-slate-600 group-hover:text-brand-dark"
                    }`}
                  >
                    {faq.question}
                  </span>

                  <div
                    className={`mt-2 relative w-6 h-6 flex-shrink-0 transition-transform duration-500 ${activeId === faq.id ? "rotate-180" : ""}`}
                  >
                    {/* ADIAM: Toggle bars now Blue */}
                    <span className="absolute inset-0 m-auto h-[2px] w-5 bg-brand-accent rounded-full"></span>
                    <span
                      className={`absolute inset-0 m-auto h-5 w-[2px] bg-brand-accent rounded-full transition-all duration-500 ${activeId === faq.id ? "rotate-90 opacity-0" : ""}`}
                    ></span>
                  </div>
                </button>

                <AnimatePresence>
                  {activeId === faq.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="pt-8">
                        <p className="text-slate-500 text-lg md:text-xl font-light leading-relaxed max-w-2xl italic">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
