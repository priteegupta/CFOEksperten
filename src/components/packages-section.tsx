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
      className="py-24 md:py-32 bg-white overflow-hidden scroll-mt-20"
    >
      <div className="container mx-auto px-6 max-w-6xl">
        {/* HEADER AREA: Balanced Typography */}
        <div className="flex flex-col lg:flex-row justify-between items-end gap-10 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-[1.5px] bg-[#3B82F6]"></span>
              <span
                className="text-[11px] font-black uppercase tracking-[0.4em] text-[#0F172A]/60 notranslate"
                translate="no"
              >
                {dictionary.packages.title_badge}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#0F172A] leading-tight tracking-tight">
              {dictionary.packages.title}
            </h2>
            <div className="mt-5 space-y-4 max-w-lg">
              <p className="text-slate-500 text-lg font-light leading-relaxed italic">
                {dictionary.packages.subtitle}
              </p>
              <p className="text-slate-600 text-sm leading-relaxed">
                Our packages are designed to scale with your business. Whether you are a fast-growing startup seeking investment, or an established company needing rigorous financial oversight, we provide predictable, high-quality CFO services without the overhead of a full-time hire.
              </p>
            </div>
          </motion.div>

          {/* CURRENCY SWITCHER: Minimalist */}
          {lang === "en" && (
            <div
              className="flex bg-slate-50 p-1 rounded-full border border-slate-100 notranslate"
              translate="no"
            >
              {(["USD", "EUR", "GBP"] as Currency[]).map((c) => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  className={`px-6 py-2 rounded-full text-[10px] font-bold transition-all duration-300 ${
                    currency === c
                      ? "bg-[#0F172A] text-white shadow-sm"
                      : "text-slate-400 hover:text-[#0F172A]"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* PRICING GRID: Clean & Balanced */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24 items-stretch">
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

        {/* PROCESS SECTION: Integrated Look */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#0F172A] rounded-[32px] p-10 md:p-16 text-white relative overflow-hidden"
        >
          <div className="relative z-10 grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <span className="text-[#3B82F6] text-[10px] font-black uppercase tracking-[0.3em] block mb-4">
                {lang === "no" ? "Neste steg" : "Next Step"}
              </span>
              <h3 className="text-3xl md:text-4xl font-serif font-bold italic leading-tight mb-6">
                {dictionary.packages.post_click.title}
              </h3>
              <div className="w-12 h-[1px] bg-white/20"></div>
            </div>

            <div className="lg:col-span-7 space-y-10">
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
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      whileHover={{ y: -8 }}
      className={`p-10 rounded-[24px] flex flex-col transition-all duration-500 ${
        highlight
          ? "bg-white border-2 border-[#3B82F6] shadow-[0_30px_60px_-15px_rgba(165,206,0,0.2)] z-10 lg:-translate-y-4"
          : "bg-white border border-slate-100 hover:shadow-xl"
      }`}
    >
      <h3 className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#0F172A]/40 mb-8">
        {data.title}
      </h3>
      <div className="mb-10">
        <div className="text-4xl md:text-5xl font-serif font-bold text-[#0F172A] tracking-tight">
          {price}
        </div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-2">
          {data.price_label}
        </p>
      </div>

      <ul className="space-y-5 mb-12 flex-1">
        {data.features.map((f: string, i: number) => (
          <li
            key={i}
            className="flex items-start gap-4 text-sm font-medium text-[#0F172A]/80 leading-snug"
          >
            <span
              className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${highlight ? "bg-[#3B82F6]" : "bg-[#0F172A]/10"}`}
            />
            {f}
          </li>
        ))}
      </ul>

      {(footerText || deliveryText) && (
        <div className="mb-10 pt-6 border-t border-slate-50 space-y-4">
          {footerText && (
            <p className="text-[12px] text-slate-400 italic font-medium leading-relaxed">
              {footerText}
            </p>
          )}
          {deliveryText && (
            <div className="inline-flex items-center gap-2 text-[10px] font-bold text-[#0F172A] uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
              {deliveryText}
            </div>
          )}
        </div>
      )}

      <button
        onClick={handleClick}
        className={`w-full py-5 rounded-xl text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300 ${
          highlight
            ? "bg-[#0F172A] text-white hover:bg-[#3B82F6] hover:text-[#0F172A]"
            : "border border-[#0F172A] text-[#0F172A] hover:bg-[#0F172A] hover:text-white"
        }`}
      >
        {data.cta}
      </button>
    </motion.div>
  );
}

function ProcessStep({ number, title, desc, primary }: any) {
  return (
    <div className="flex gap-6 group">
      <span
        className={`text-2xl font-serif font-bold italic ${primary ? "text-[#3B82F6]" : "text-white/20"}`}
      >
        {number}
      </span>
      <div>
        <h4
          className={`text-lg font-bold ${primary ? "text-[#3B82F6]" : "text-white"}`}
        >
          {title}
        </h4>
        <p className="text-white/40 text-sm mt-1 max-w-sm italic">{desc}</p>
      </div>
    </div>
  );
}
