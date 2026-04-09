"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

type Currency = "NOK" | "USD" | "EUR" | "GBP";

const FALLBACK_RATES: Record<Currency, number> = {
  NOK: 1,
  USD: 0.094,
  EUR: 0.087,
  GBP: 0.074,
};

export default function PackagesSection({ dictionary, lang }: any) {
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

  const getPriceNumber = (plan: unknown): number => {
    switch (plan.id) {
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

  const handleCTA = () => {
    const el = document.getElementById("book-meeting");
    if (el) el.scrollIntoView({ behavior: "smooth" });
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
            <h2 className="text-5xl md:text-6xl font-serif font-bold text-slate-900 tracking-tight leading-tight">
              {pricing.header.title}
            </h2>
            <p className="text-slate-500 mt-6 text-lg font-light leading-relaxed max-w-xl border-l-2 border-slate-200 pl-6 italic">
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
            {isLive && (
              <div className="flex items-center gap-2 px-3 py-1 bg-green-50 rounded-full border border-green-100">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-[9px] font-bold text-green-600 uppercase tracking-widest">
                  Live Market Rates
                </span>
              </div>
            )}
          </div>
        </div>

        {/* MAIN PLANS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20 items-stretch">
          {pricing.plans
            .filter((p: any) => !p.category)
            .map((plan: any) => {
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
                    <p className="text-slate-500 text-sm font-light min-h-10 italic">
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
                    onClick={handleCTA}
                    className={`w-full py-5 rounded-2xl font-bold text-[11px] uppercase tracking-[0.2em] transition-all duration-300 cursor-pointer ${plan.highlight ? "bg-slate-900 text-white hover:bg-slate-800 shadow-md" : "border-2 border-slate-200 text-slate-900 hover:border-slate-900 hover:bg-slate-900 hover:text-white"}`}
                  >
                    {plan.cta}
                  </button>
                </motion.div>
              );
            })}
        </div>

        {/* ADD-ONS SECTION */}
        <div className="grid md:grid-cols-2 gap-8">
          {pricing.plans
            .filter((p: any) => p.category === "addon")
            .map((plan: any) => {
              const price = formatPrice(getPriceNumber(plan));
              return (
                <div
                  key={plan.id}
                  className="group p-10 border-2 border-dashed border-slate-200 rounded-[40px] bg-white transition-all duration-300 hover:border-brand-accent/40 flex flex-col h-full"
                >
                  <div className="flex justify-between items-start mb-6">
                    <h4 className="text-xl font-bold text-slate-900">
                      {plan.name}
                    </h4>
                    <div className="px-3 py-1 bg-brand-accent/10 rounded-lg text-brand-accent text-[9px] font-bold tracking-widest">
                      {lang === "no" ? "TILLEGG" : "ADD-ON"}
                    </div>
                  </div>
                  <p className="text-sm text-slate-500 mb-6 italic">
                    {plan.tagline}
                  </p>
                  <div className="text-3xl font-serif font-bold text-slate-900 mb-4">
                    {price}{" "}
                    <span className="text-xs font-normal text-slate-400">
                      / {lang === "no" ? "mnd" : "mo"}
                    </span>
                  </div>

                  {/* ✅ PLAN NOTE INTEGRATION */}
                  {plan.note && (
                    <div className="text-[13px] text-slate-500 mb-8 pb-8 border-b border-slate-100 space-y-1">
                      <p>{plan.note.commitment}</p>
                      <p className="font-bold text-slate-800 uppercase tracking-tight">
                        {plan.note.addon}
                      </p>
                    </div>
                  )}

                  <div className="grow mb-10">
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {plan.features.map((f: string, i: number) => (
                        <li
                          key={i}
                          className="flex items-center gap-3 text-sm text-slate-500 font-medium leading-tight"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-slate-200 group-hover:bg-brand-accent transition-colors" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button
                    onClick={handleCTA}
                    className="w-full py-4 rounded-xl border-2 border-brand-accent/20 text-brand-accent text-[11px] font-bold uppercase tracking-[0.2em] cursor-pointer hover:bg-brand-accent hover:text-white transition-all shadow-sm"
                  >
                    {lang === "no"
                      ? "+ LEGG TIL CFO-STØTTE"
                      : "+ ADD CFO SUPPORT"}
                  </button>
                </div>
              );
            })}
        </div>

        {/* FOOTER */}
        <div className="mt-20 pt-10 border-t border-slate-100 flex flex-col items-center gap-4">
          <p className="text-slate-400 text-[13px] font-light italic">
            {pricing.footer.note}
          </p>
          <button
            onClick={handleCTA}
            className="flex items-center gap-3 text-slate-900 text-[11px] font-bold uppercase tracking-[0.4em] cursor-pointer hover:opacity-70 transition-opacity"
          >
            {pricing.footer.cta} <span></span>
          </button>
        </div>
      </div>
    </section>
  );
}
