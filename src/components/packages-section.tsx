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

  return (
    <section
      id="packages"
      className="pt-12 pb-24 md:pt-20 md:pb-40 bg-white overflow-hidden scroll-mt-20"
    >
      <div className="container mx-auto px-6 max-w-7xl">
        {/* HEADER AREA: Authoritative Executive Style */}
        <div className="flex flex-col lg:flex-row justify-between items-end gap-12 mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-8">
              <span className="w-10 h-[2px] bg-brand-accent rounded-full"></span>
              <span className="text-brand-accent text-[12px] font-black uppercase tracking-[0.5em] leading-none">
                {dictionary.packages.title_badge}
              </span>
            </div>
            <h2 className="text-5xl md:text-7xl font-serif font-bold text-brand-dark leading-[0.95] tracking-tighter mb-10">
              {dictionary.packages.title}
            </h2>
            <div className="space-y-6 max-w-xl">
              <p className="text-xl md:text-2xl text-slate-500 font-light leading-relaxed italic border-l-2 border-slate-100 pl-8">
                {dictionary.packages.subtitle}
              </p>
              <p className="text-slate-400 text-sm leading-relaxed tracking-wide">
                Our packages are designed to scale with your business. Whether
                you are a fast-growing startup seeking investment, or an
                established company needing rigorous financial oversight, we
                provide predictable, high-quality CFO services.
              </p>
            </div>
          </motion.div>

          {/* CURRENCY SWITCHER: Glassmorphism Style */}
          {lang === "en" && (
            <div className="flex bg-slate-50 p-1.5 rounded-full border border-slate-100 backdrop-blur-sm shadow-inner">
              {(["USD", "EUR", "GBP"] as Currency[]).map((c) => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  className={`px-8 py-2.5 rounded-full text-[10px] font-black tracking-[0.15em] transition-all duration-500 ${
                    currency === c
                      ? "bg-brand-dark text-white shadow-xl"
                      : "text-slate-400 hover:text-brand-dark"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* PRICING GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 mb-32 items-stretch">
          <PricingCard
            data={dictionary.packages.investor}
            price={formatPrice(15000, currency)}
            footerText={dictionary.packages.investor.footer}
            deliveryText={dictionary.packages.delivery_notice}
            delay={0.1}
          />
          <PricingCard
            data={dictionary.packages.support}
            price={formatPrice(8000, currency)}
            highlight
            delay={0}
          />
          <PricingCard
            data={dictionary.packages.scaling}
            price={formatPrice(25000, currency)}
            footerText={dictionary.packages.scaling.footer}
            delay={0.2}
          />
        </div>

        {/* PROCESS SECTION: High-End Nordic Dark Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-brand-dark rounded-[48px] p-12 md:p-20 text-white relative overflow-hidden shadow-2xl shadow-brand-dark/20"
        >
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-accent/5 blur-[120px] rounded-full -mr-48 -mt-48" />

          <div className="relative z-10 grid lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-5">
              <span className="text-brand-accent text-[11px] font-black uppercase tracking-[0.4em] block mb-6">
                {lang === "no" ? "Neste steg" : "Next Step"}
              </span>
              <h3 className="text-4xl md:text-5xl font-serif font-bold italic leading-tight mb-8">
                {dictionary.packages.post_click.title}
              </h3>
              <div className="w-16 h-[1.5px] bg-white/10"></div>
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
    </section>
  );
}

function PricingCard({
  data,
  price,
  highlight,
  footerText,
  deliveryText,
  delay,
}: any) {
  const handleClick = () => {
    window.open(
      "https://docs.google.com/forms/d/e/1FAIpQLSdviHbCMWRelhxvjSRKcICDO2fruDWXQ03R2ChPqvB1rjbu4Q/viewform",
      "_blank",
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -12 }}
      className={`p-10 lg:p-12 rounded-[40px] flex flex-col transition-all duration-700 ${
        highlight
          ? "bg-white border-[2.5px] border-brand-accent shadow-[0_40px_100px_-20px_rgba(59,130,246,0.15)] z-10 lg:-translate-y-6"
          : "bg-white border border-slate-100 hover:shadow-2xl hover:shadow-brand-dark/5"
      }`}
    >
      {/* Increased size to 15px and set color to #0F172A */}
      <h3 className="text-[15px] font-black uppercase tracking-[0.35em] text-slate-400 mb-10">
        {data.title}
      </h3>
      <div className="mb-12">
        <div className="text-5xl lg:text-6xl font-serif font-bold text-brand-dark tracking-tighter">
          {price}
        </div>
        <p className="text-[11px] font-black uppercase tracking-[0.2em] text-brand-accent mt-3">
          {data.price_label}
        </p>
      </div>

      <ul className="space-y-6 mb-16 flex-1">
        {data.features.map((f: string, i: number) => (
          <li
            key={i}
            className="flex items-start gap-5 text-[15px] font-medium text-brand-dark/70 leading-relaxed"
          >
            <span
              className={`w-2 h-2 rounded-full mt-2 shrink-0 ${highlight ? "bg-brand-accent" : "bg-slate-200"}`}
            />
            {f}
          </li>
        ))}
      </ul>

      {(footerText || deliveryText) && (
        <div className="mb-12 pt-8 border-t border-slate-50 space-y-5">
          {footerText && (
            <p className="text-[13px] text-slate-400 italic font-light leading-relaxed">
              {footerText}
            </p>
          )}
          {deliveryText && (
            <div className="inline-flex items-center gap-3 text-[11px] font-black text-brand-dark uppercase tracking-widest bg-slate-50 px-4 py-2 rounded-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
              {deliveryText}
            </div>
          )}
        </div>
      )}

      <button
        onClick={handleClick}
        className={`w-full py-6 rounded-2xl text-[11px] font-black uppercase tracking-[0.3em] transition-all duration-500 ${
          highlight
            ? "bg-brand-dark text-white hover:bg-brand-accent shadow-xl shadow-brand-dark/10"
            : "border-2 border-brand-dark text-brand-dark hover:bg-brand-dark hover:text-white"
        }`}
      >
        {data.cta}
      </button>
    </motion.div>
  );
}

function ProcessStep({ number, title, desc, primary }: any) {
  return (
    <div className="flex gap-10 group">
      <span
        className={`text-4xl font-serif font-bold italic leading-none ${primary ? "text-brand-accent" : "text-white/10"}`}
      >
        {number}
      </span>
      <div>
        <h4
          className={`text-xl font-bold mb-3 ${primary ? "text-brand-accent" : "text-white"}`}
        >
          {title}
        </h4>
        <p className="text-white/40 text-sm leading-relaxed max-w-sm italic font-light tracking-wide">
          {desc}
        </p>
      </div>
    </div>
  );
}
