"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { openCalendly } from "@/lib/calendly";

type Plan = {
  id: string;
  label?: string;
  name: string;
  tagline: string;
  billingNote: string;
  features: string[];
  meta?: {
    bestFor?: string;
    delivery?: string;
  };
  cta: string;
  highlight?: boolean;
  category?: string;
  note?: {
    commitment?: string;
    addon?: string;
  };
};

type PricingType = {
  header: {
    title: string;
    description: string;
  };
  plans: Plan[];
  footer: {
    note: string;
    cta: string;
  };
};

type Currency = "NOK" | "USD" | "EUR" | "GBP";

type PackagesSectionProps = {
  dictionary: {
    pricing: PricingType;
  };
  lang: string;
};

const FALLBACK_RATES: Record<Currency, number> = {
  NOK: 1,
  USD: 0.094,
  EUR: 0.087,
  GBP: 0.074,
};

export default function PackagesSection({ dictionary, lang }: PackagesSectionProps) {
  const [currency, setCurrency] = useState<Currency>(
    lang === "no" ? "NOK" : "USD",
  );

  const [rates, setRates] = useState(FALLBACK_RATES);
  const [isLive, setIsLive] = useState(false);

  const pricing = dictionary.pricing;

  // ✅ FETCH RATES (Logic Untouched)
  useEffect(() => {
    const fetchRates = async () => {
      try {
        const res = await fetch("/api/exchange-rates");
        const data = await res.json();
        if (data.rates) {
          setRates(data.rates);
          setIsLive(!data.fallback);
        }
      } catch {}
    };
    fetchRates();
  }, []);

  const getPriceNumber = (plan: Plan): number => {
    const typedPlan = plan as Plan;
    switch (typedPlan.id) {
      case "plan1":
        return 9900;
      case "plan2":
        return 18500;
      case "plan3":
        return 35000;
      case "cfo_basic":
        return 6900;
      case "cfo_pro":
        return 7900;
      default:
        return 0;
    }
  };

  const formatPrice = (nok: number) => {
    if (!nok) return "—";
    if (currency === "NOK") return `${nok.toLocaleString("no-NO")} kr`;
    const symbols = { USD: "$", EUR: "€", GBP: "£" };
    const value = Math.round(nok * rates[currency]);
    return `${symbols[currency]}${value.toLocaleString("en-US")}`;
  };

 const handleCTA = (plan: Plan) => {
   // Use the name from the dictionary so it's readable in the email
   const planName = plan.name;
   const isCfoAddon = plan.category === "addon";

   openCalendly(planName, isCfoAddon);
 };

  return (
    <section
      id="packages"
      className="py-24 bg-[#fcfcfd] overflow-hidden scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* HEADER AREA */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-10">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 mb-5"
            >
              <span className="w-10 h-[1.5px] bg-brand-accent"></span>
              <span className="text-brand-accent text-[10px] font-bold uppercase tracking-[0.4em]">
                {lang === "no" ? "PRISMODELLER" : "PRICING"}
              </span>
            </motion.div>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-serif font-bold text-slate-900 tracking-tight leading-snug md:leading-tight">
              {pricing.header.title}
            </h2>

            <p className="text-slate-500 mt-4 md:mt-6 text-base sm:text-lg font-light leading-relaxed max-w-full md:max-w-xl border-l-0 md:border-l-2 border-slate-200 pl-0 md:pl-6">
              {pricing.header.description}
            </p>
          </div>

          <div className="flex flex-col items-end gap-3">
            {lang === "en" && (
              <div className="flex bg-white p-1 rounded-full border border-slate-200 shadow-sm backdrop-blur-sm">
                {["USD", "EUR", "GBP"].map((c) => (
                  <button
                    key={c}
                    onClick={() => setCurrency(c as Currency)}
                    className={`px-6 py-2 rounded-full text-[10px] font-bold tracking-widest transition-all duration-300 cursor-pointer ${currency === c ? "bg-slate-900 text-white shadow-md" : "text-slate-400 hover:text-slate-900"}`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            )}
            {/* {isLive && (
              <div className="flex items-center gap-2 px-3 py-1 bg-green-50 rounded-full border border-green-100">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-[9px] font-bold text-green-600 uppercase tracking-widest">
                  Live Market Rates
                </span>
              </div>
            )} */}
          </div>
        </div>

        {/* MAIN PLANS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20 items-stretch">
          {pricing.plans
            .filter((p: Plan) => !p.category)
            .map((plan: Plan) => {
              const price = formatPrice(getPriceNumber(plan));
              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  whileHover={{ y: -10 }}
                  className={`relative flex flex-col p-8 lg:p-10 rounded-4xl border transition-all duration-500 ${plan.highlight ? "bg-white border-brand-accent shadow-[0_30px_70px_-10px_rgba(0,0,0,0.1)] z-10 lg:scale-[1.03]" : "bg-white border-slate-100 shadow-sm shadow-slate-200/50"}`}
                >
                  {plan.highlight && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-accent text-white text-[10px] font-bold px-5 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                      {lang === "no" ? "Mest Valgt" : "Most Popular"}
                    </div>
                  )}
                  <div className="mb-8">
                    <p className="text-[10px] font-bold text-slate-400 mb-3 uppercase tracking-widest">
                      {plan.label}
                    </p>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-slate-500 text-sm font-light min-h-10 ">
                      {plan.tagline}
                    </p>
                  </div>
                  <div className="mb-1">
                    <span className="text-5xl font-serif font-bold tracking-tighter text-slate-900">
                      {price}
                    </span>
                  </div>
                  <p className="text-[11px] font-bold text-brand-accent mb-8 uppercase tracking-widest">
                    {plan.billingNote}
                  </p>

                  {plan.id === "plan3" && (
                    <div className="mb-8 p-6 rounded-2xl bg-slate-50 border border-slate-100 text-slate-600 text-[13px] space-y-3 shadow-inner">
                      {/* CFO SUPPORT LINE */}
                      <p className="flex justify-between items-center font-medium">
                        <span>
                          {lang === "no"
                            ? "CFO-støtte (3 mnd)"
                            : "CFO Support (3 mo)"}
                        </span>

                        <span className="text-brand-accent font-semibold">
                          +{formatPrice(7900)} / {lang === "no" ? "mnd" : "mo"}
                        </span>
                      </p>

                      {/* TOTAL */}
                      <div className="pt-3 border-t border-slate-200">
                        <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-1">
                          {lang === "no"
                            ? "Total investering"
                            : "Total Investment"}
                        </p>

                        <p className="text-2xl font-bold text-slate-900 tracking-tighter">
                          {formatPrice(58700)}
                        </p>
                      </div>

                      {/* OPTIONAL CONTINUATION */}
                      <p className="text-xs text-slate-500 pt-2">
                        {lang === "no"
                          ? `Valgfri videreføring à ${formatPrice(7900)} / mnd deretter`
                          : `Optional continuation at ${formatPrice(7900)} / month thereafter`}
                      </p>
                    </div>
                  )}
                  <div className="grow">
                    <ul className="space-y-4 mb-8">
                      {plan.features.map((f: string, i: number) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-sm text-slate-600 font-medium leading-relaxed"
                        >
                          <span className="text-brand-accent font-bold mt-0.5">
                            +
                          </span>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {plan.meta && (
                    <div className="mb-8 pt-6 border-t border-slate-50 text-[12px] text-slate-500 space-y-2">
                      <p>
                        <span className="font-bold text-slate-400 uppercase tracking-tighter mr-2">
                          {lang === "no" ? "PASSER FOR:" : "BEST FOR:"}
                        </span>
                        {plan.meta.bestFor}
                      </p>
                      <p>
                        <span className="font-bold text-slate-400 uppercase tracking-tighter mr-2">
                          {lang === "no" ? "LEVERING:" : "DELIVERY:"}
                        </span>
                        {plan.meta.delivery}
                      </p>
                    </div>
                  )}

                  <button
                    onClick={() => handleCTA(plan)}
                    className={`w-full py-5 rounded-2xl font-bold text-[11px] uppercase tracking-[0.2em] transition-all duration-300 cursor-pointer ${plan.highlight ? "bg-slate-600 text-white hover:bg-slate-800 shadow-md" : "border-2 border-slate-200 text-slate-900 hover:border-slate-600 hover:bg-slate-600 hover:text-white"}`}
                  >
                    {plan.cta}
                  </button>
                </motion.div>
              );
            })}
        </div>

        {/* REFINED ADD-ONS SECTION: CENTERED WIDE CARD WITH HOVER EFFECTS */}
        <div className="max-w-5xl mx-auto space-y-8 mt-12">
          {pricing.plans
            .filter((p: Plan) => p.category === "addon")
            .map((plan: Plan) => {
              const price = formatPrice(getPriceNumber(plan));
              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="group relative p-8 md:p-12 border-2 border-dashed border-slate-200 rounded-[3rem] bg-white transition-all duration-700 ease-out hover:border-brand-accent/40 hover:shadow-[0_40px_80px_-20px_rgba(15,23,42,0.08)] flex flex-col lg:flex-row gap-10 items-center"
                >
                  {/* LEFT SIDE: Identity & Pricing */}
                  <div className="lg:w-2/5 space-y-5 text-center lg:text-left">
                    <div className="inline-block px-4 py-1 bg-brand-accent/5 rounded-full text-brand-accent text-[9px] font-black tracking-[0.3em] uppercase">
                      {lang === "no" ? " Tillegg" : "Add-on"}
                    </div>

                    <div className="space-y-1">
                      <h4 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 tracking-tight">
                        {plan.name}
                      </h4>
                      {/* Added: Valgfritt tillegg subtitle */}
                      <p className="text-slate-400 text-sm font-light italic">
                        {lang === "no"
                          ? "Valgfritt tillegg"
                          : "Optional add-on"}
                      </p>
                    </div>

                    <div className="pt-4">
                      <div className="flex items-baseline justify-center lg:justify-start gap-2">
                        <span className="text-4xl font-serif font-bold text-slate-900">
                          {price}
                        </span>
                        <span className="text-slate-400 text-xs">
                          / {lang === "no" ? "mnd" : "mo"}
                        </span>
                      </div>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mt-3 opacity-70">
                        {lang === "no"
                          ? "Ingen minimumsbinding — avslutt når du vil"
                          : "No commitment — cancel anytime"}
                      </p>
                    </div>
                  </div>

                  {/* RIGHT SIDE: Features & Centered CTA with Hover Effects */}
                  <div className="lg:w-3/5 w-full flex flex-col items-center lg:items-end gap-10 lg:pl-10 lg:border-l border-slate-100">
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 w-full">
                      {plan.features.map((f: string, i: number) => (
                        <li
                          key={i}
                          className="flex items-center gap-3 text-[12px] text-slate-600 font-medium transition-all duration-500 group-hover:translate-x-1"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-200 transition-all duration-500 group-hover:bg-brand-accent group-hover:scale-125" />
                          <span className="group-hover:text-slate-900 transition-colors duration-500">
                            {f}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() => handleCTA(plan)}
                      className="w-full md:w-72 py-5 rounded-2xl border-2 border-brand-accent text-brand-accent font-black text-[10px] uppercase tracking-[0.3em] transition-all duration-700 hover:bg-brand-accent hover:text-white hover:shadow-xl hover:shadow-brand-accent/20 cursor-pointer whitespace-nowrap active:scale-95"
                    >
                      {lang === "no" ? " TA KONTAKT" : " ADD CFO SUPPORT"}
                    </button>
                  </div>
                </motion.div>
              );
            })}
        </div>

        {/* FOOTER */}
        <div className="mt-20 pt-10 border-t border-slate-100 flex flex-col items-center gap-4">
          <p className="text-slate-400 text-[13px] font-light ">
            {pricing.footer.note}
          </p>
          <button
            onClick={() => openCalendly("Pris_Footer_Kontakt")}
            className="flex items-center gap-3 text-slate-900 text-[11px] font-bold uppercase tracking-[0.4em] cursor-pointer hover:opacity-70 transition-opacity"
          >
            {pricing.footer.cta} <span></span>
          </button>
        </div>
      </div>
    </section>
  );
}
