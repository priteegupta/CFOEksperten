"use client";

import { useSyncExternalStore } from "react";
import Script from "next/script";

const emptySubscribe = () => () => {};

export default function BookingSection({
  dictionary,
}: {
  dictionary: {
    booking: {
      notice: string;
      title: string;
      subtitle: string;
      cta: string;
    };
  };
}) {
  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const CALENDLY_URL = "https://calendly.com/adiam-negassie/30min";

  const openCalendly = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({ url: CALENDLY_URL });
    } else {
      window.open(CALENDLY_URL, "_blank", "noopener,noreferrer");
    }
  };

  if (!isClient) return null;

  return (
    <section id="book-meeting" className="py-8 md:py-16 bg-white scroll-mt-20">
      <link
        href="https://assets.calendly.com/assets/external/widget.css"
        rel="stylesheet"
      />
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
      />

      <div className="container mx-auto px-6">
        {/* Shadow and border updated for the Blue Theme */}
        <div className="max-w-6xl mx-auto rounded-xl overflow-hidden flex flex-col md:flex-row bg-white shadow-[0_40px_100px_rgba(15,23,42,0.1)] border border-slate-100">
          {/* Left Content */}
          <div className="p-8 md:p-20 flex-1 bg-white relative z-10 order-2 md:order-1">
            <div className="flex items-center gap-4 mb-8 md:mb-12">
              {/*  Blue Accent Line */}
              <span className="w-8 md:w-12 h-[1px] bg-brand-accent"></span>
              <span className="text-brand-dark text-[10px] font-black uppercase tracking-[0.4em]">
                {dictionary.booking.notice}
              </span>
            </div>

            <h2 className="text-3xl md:text-6xl font-serif font-bold text-brand-dark mb-6 md:mb-10 leading-[1.2] md:leading-[1.1] tracking-tight">
              {dictionary.booking.title}
            </h2>

            <p className="text-slate-500 text-base md:text-lg mb-10 md:mb-14 font-light leading-relaxed max-w-md">
              {dictionary.booking.subtitle}
            </p>

            {/* CTA BUTTON: Blue Theme with Hover Transition */}
            <button
              onClick={openCalendly}
              type="button"
              className="w-full md:w-auto group relative overflow-hidden bg-brand-accent text-white px-10 md:px-14 py-5 md:py-6 rounded-sm font-black uppercase text-[11px] tracking-[0.3em] transition-all duration-500 hover:text-white shadow-lg shadow-brand-accent/20 cursor-pointer active:scale-95"
            >
              <span className="relative z-10">{dictionary.booking.cta}</span>
              {/* Slide up effect remains, now Dark Blue */}
              <div className="absolute inset-0 bg-brand-dark translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
            </button>
          </div>

          {/* Right Panel: Blue Constellations */}
          <div className="h-[300px] md:h-auto md:w-[42%] bg-brand-gradient-dark relative flex items-center justify-center p-8 overflow-hidden order-1 md:order-2 border-l border-white/5">
            <div className="absolute inset-0 opacity-80 pointer-events-none">
              <svg
                className="w-full h-full"
                viewBox="0 0 400 600"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <filter
                    id="glow"
                    x="-20%"
                    y="-20%"
                    width="140%"
                    height="140%"
                  >
                    <feGaussianBlur stdDeviation="5" result="blur" />
                    <feComposite
                      in="SourceGraphic"
                      in2="blur"
                      operator="over"
                    />
                  </filter>
                </defs>
                <path
                  d="M100 150L250 100L350 250L200 400L50 350L100 150"
                  stroke="#60A5FA"
                  strokeWidth="1.5"
                  strokeDasharray="1000"
                  strokeDashoffset="1000"
                  filter="url(#glow)"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    from="1000"
                    to="0"
                    dur="6s"
                    repeatCount="indefinite"
                  />
                </path>
                {[
                  { x: 100, y: 150 },
                  { x: 250, y: 100 },
                  { x: 350, y: 250 },
                  { x: 200, y: 400 },
                  { x: 50, y: 350 },
                ].map((point, i) => (
                  <circle
                    key={i}
                    cx={point.x}
                    cy={point.y}
                    r="4"
                    fill="#60A5FA"
                  >
                    <animate
                      attributeName="opacity"
                      values="0.4;1;0.4"
                      dur={`${3 + i}s`}
                      repeatCount="indefinite"
                    />
                  </circle>
                ))}
              </svg>
            </div>

            <div className="relative z-20 text-center">
              <div className="relative mb-6 md:mb-10">
                {/* Glow updated to Blue */}
                <div className="absolute inset-0 bg-brand-accent/10 blur-[60px] rounded-full scale-150"></div>
                <div className="w-24 h-24 md:w-28 md:h-28 rounded-full flex flex-col items-center justify-center bg-transparent border border-brand-accent/40 relative z-10 backdrop-blur-md">
                  <span className="text-4xl md:text-5xl font-serif font-bold text-brand-accent mb-1">
                    30
                  </span>
                  <span className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.4em] text-white/60">
                    Min
                  </span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-white text-[11px] md:text-[12px] font-black uppercase tracking-[0.4em] md:tracking-[0.5em]">
                  Discovery Call
                </p>
                <p className="text-brand-accent/60 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] italic">
                  Strategic Structure
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}