"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { type Dictionary } from "@/get-dictionary";

type Currency = "NOK" | "USD" | "EUR" | "GBP";

const rates = { NOK: 1, USD: 0.094, EUR: 0.087, GBP: 0.074 };

export default function PackagesSection({
  dictionary,
  lang,
}: {
  dictionary: Dictionary;
  lang: string;
}) {
  const [currency, setCurrency] = useState<Currency>(
    lang === "no" ? "NOK" : "EUR",
  );

  const formatPrice = (baseNok: number, curr: Currency) => {
    const symbols = { NOK: "kr", USD: "$", EUR: "€", GBP: "£" };
    const converted = Math.round(baseNok * rates[curr]);
    return curr === "NOK"
      ? `${baseNok.toLocaleString("no-NO")} kr`
      : `${symbols[curr]}${converted.toLocaleString("en-US")}`;
  };

  const scrollToBooking = () => {
    const element = document.getElementById("book-meeting");
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  const currencies: Currency[] = ["USD", "EUR", "GBP"];

  return (
    <section
      id="packages"
      className="py-32 md:py-48 bg-slate-50/30 overflow-hidden scroll-mt-20 selection:bg-brand-accent/30"
    >
      <div className="container mx-auto px-6 max-w-7xl">
        {/* HEADER: Massive Nordic Typography */}
        <div className="flex flex-col lg:flex-row justify-between items-end mb-24 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-4 mb-8">
              <span className="w-12 h-[2px] bg-brand-accent"></span>
              <span
                className="text-brand-dark text-[11px] font-black uppercase tracking-[0.5em] notranslate"
                translate="no"
              >
                {dictionary.packages.title_badge}
              </span>
            </div>
            <h2 className="text-6xl md:text-8xl font-serif font-bold text-brand-dark leading-[0.9] tracking-tighter">
              {dictionary.packages.title}
            </h2>
            <p className="text-slate-500 mt-10 text-xl md:text-2xl font-light max-w-xl italic leading-relaxed">
              {dictionary.packages.subtitle}
            </p>
          </motion.div>

          {/* SOPHISTICATED CURRENCY TOGGLE (EN ONLY) */}
          {lang === "en" && (
            <div className="relative group notranslate" translate="no">
              <div className="flex bg-white p-1.5 rounded-2xl border border-slate-200 shadow-[0_10px_30px_-5px_rgba(16,54,125,0.05)] relative overflow-hidden">
                {/* Sliding Background */}
                <motion.div
                  className="absolute top-1.5 bottom-1.5 rounded-xl bg-brand-dark shadow-lg shadow-brand-dark/20"
                  initial={false}
                  animate={{
                    left: `${(currencies.indexOf(currency) * 100) / 3}%`,
                    width: "33.33%",
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
                
                {currencies.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCurrency(c)}
                    className={`relative z-10 px-8 py-3.5 rounded-xl text-[10px] font-black tracking-widest transition-colors duration-500 w-28 ${
                      currency === c ? "text-white" : "text-slate-400 hover:text-brand-dark"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
              <div className="absolute -top-6 right-2">
                <span className="text-[9px] font-black text-brand-accent uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                  Select Billing Currency
                </span>
              </div>
            </div>
          )}
        </div>

        {/* PRICING GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-32 items-stretch">
          <PricingCard
            data={dictionary.packages.investor}
            price={formatPrice(15000, currency)}
            onSelect={scrollToBooking}
            footerText={dictionary.packages.investor.footer}
            deliveryText={dictionary.packages.delivery_notice}
            delay={0.1}
          />

          <PricingCard
            data={dictionary.packages.support}
            price={formatPrice(8000, currency)}
            highlight
            onSelect={scrollToBooking}
            delay={0}
          />

          <PricingCard
            data={dictionary.packages.scaling}
            price={formatPrice(25000, currency)}
            onSelect={scrollToBooking}
            footerText={dictionary.packages.scaling.footer}
            delay={0.2}
          />
        </div>

        {/* THE TRUST BRIDGE: Process Timeline */}
        <div id="booking-process" className="pt-24 border-t border-slate-200/50">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="bg-brand-dark rounded-[60px] p-12 md:p-24 text-white relative overflow-hidden shadow-[0_60px_120px_-30px_rgba(16,54,125,0.4)]"
          >
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
                <rect width="100" height="100" fill="url(#grid)" />
              </svg>
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              <div className="lg:col-span-5 text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-4 mb-8">
                  <span className="w-8 h-[2px] bg-brand-accent"></span>
                  <span className="text-brand-accent text-[11px] font-black uppercase tracking-[0.4em]">
                    {lang === "no" ? "Neste steg" : "Next Step"}
                  </span>
                </div>
                <h3 className="text-5xl md:text-7xl font-serif font-bold mb-10 italic leading-[1.1] tracking-tight">
                  {dictionary.packages.post_click.title}
                </h3>
                <div className="inline-block px-4 py-2 bg-white/5 rounded-full border border-white/10 backdrop-blur-sm">
                  <p className="text-white/60 text-[10px] font-black uppercase tracking-[0.2em]">
                    {dictionary.packages.trust_badge}
                  </p>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-12">
                <ProcessStep
                  number="01"
                  title={dictionary.packages.post_click.step1_title}
                  desc={dictionary.packages.post_click.step1_desc}
                />
                <ProcessStep
                  number="02"
                  title={dictionary.packages.post_click.step2_title}
                  desc={dictionary.packages.post_click.step2_desc}
                />
                <ProcessStep
                  number="03"
                  title={dictionary.packages.post_click.step3_title}
                  desc={dictionary.packages.post_click.step3_desc}
                  primary
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function PricingCard({
  data,
  price,
  highlight,
  onSelect,
  footerText,
  deliveryText,
  delay
}: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -16, transition: { duration: 0.4 } }}
      className={`relative p-10 md:p-14 rounded-[48px] flex flex-col transition-all duration-700 ${
        highlight 
          ? "bg-white border-[3px] border-brand-accent shadow-[0_60px_100px_-20px_rgba(165,206,0,0.25)] z-10 lg:-translate-y-10" 
          : "bg-white/40 border border-slate-200/60 backdrop-blur-sm hover:bg-white hover:border-brand-accent/30 hover:shadow-[0_40px_80px_-20px_rgba(16,54,125,0.08)]"
      }`}
    >
      {highlight && (
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-brand-dark px-6 py-2 rounded-full shadow-lg border border-white/10">
           <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">
            Recommended
          </span>
        </div>
      )}

      {data.badge && !highlight && (
        <div className="inline-block px-4 py-1.5 bg-brand-accent/10 text-brand-accent rounded-full text-[9px] font-black uppercase tracking-widest mb-8 self-start">
          {data.badge}
        </div>
      )}

      <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-brand-dark/40 mb-10">
        {data.title}
      </h3>

      <div className="mb-12">
        <div className="text-6xl md:text-7xl font-serif font-bold text-brand-dark tracking-tighter mb-4">
          {price}
        </div>
        <div className="flex items-center gap-3">
          <span className="h-[1px] w-6 bg-slate-100"></span>
          <div className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
            {data.price_label}
          </div>
        </div>
      </div>

      <ul className="space-y-6 mb-16 flex-1">
        {data.features.map((f: string, i: number) => (
          <li
            key={i}
            className="flex items-start gap-5 text-base font-semibold text-brand-dark/80 leading-snug group/item"
          >
            <div className={`w-5 h-5 rounded-full mt-0.5 shrink-0 flex items-center justify-center transition-colors ${highlight ? "bg-brand-accent" : "bg-slate-100 group-hover/item:bg-brand-accent"}`}>
              <svg className={`w-3 h-3 ${highlight ? "text-brand-dark" : "text-slate-400 group-hover/item:text-brand-dark"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="group-hover/item:translate-x-1 transition-transform">{f}</span>
          </li>
        ))}
      </ul>

      {/* suitability - footer text */}
      {(footerText || deliveryText) && (
        <div className="mb-12 pt-10 border-t border-slate-100/80 space-y-5">
          {footerText && (
            <div className="flex gap-3">
               <svg className="w-5 h-5 text-slate-300 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
               </svg>
               <p className="text-[12px] text-slate-500 font-medium italic leading-relaxed">
                {footerText}
              </p>
            </div>
          )}
          {deliveryText && (
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-brand-accent/5 rounded-xl border border-brand-accent/10">
              <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse shadow-[0_0_8px_rgba(165,206,0,0.8)]" />
              <span className="text-[10px] font-black text-brand-dark uppercase tracking-widest">
                {deliveryText}
              </span>
            </div>
          )}
        </div>
      )}

      <button
        onClick={onSelect}
        className={`group relative overflow-hidden w-full py-6 rounded-2xl font-black text-[11px] uppercase tracking-[0.25em] transition-all duration-500 ${
          highlight 
            ? "bg-brand-dark text-white shadow-xl shadow-brand-dark/20" 
            : "border-2 border-brand-dark text-brand-dark hover:border-brand-accent"
        }`}
      >
        <div className="absolute inset-0 bg-brand-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
        <span className="relative z-10 group-hover:text-brand-dark">{data.cta}</span>
      </button>
    </motion.div>
  );
}

function ProcessStep({ number, title, desc, primary }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="flex gap-8 group"
    >
      <div className="relative">
        <span
          className={`text-5xl md:text-6xl font-serif font-bold italic transition-colors duration-500 ${
            primary ? "text-brand-accent" : "text-white/10 group-hover:text-white/30"
          }`}
        >
          {number}
        </span>
        {primary && (
          <div className="absolute -inset-2 bg-brand-accent/20 blur-xl rounded-full animate-pulse"></div>
        )}
      </div>
      <div>
        <h4
          className={`text-2xl font-bold mb-3 transition-colors duration-500 ${
            primary ? "text-brand-accent" : "text-white"
          }`}
        >
          {title}
        </h4>
        <p className="text-white/40 text-base md:text-lg font-medium leading-relaxed max-w-lg italic">
          {desc}
        </p>
      </div>
    </motion.div>
  );
}
