'use client';

import { useEffect, useRef, useState } from 'react';

export default function AudienceSection({
  dictionary,
}: {
  dictionary: {
    audience: {
      title: string;
      subtitle: string;
      groups: string[] | readonly string[];
      bottom_text: string;
    };
  };
}) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        const currentRef = sectionRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) observer.unobserve(currentRef);
        };
    }, []);

    // Distinct icons mapped to the target groups for a premium feel
    const getIcon = (index: number) => {
        const svgProps = { className: "w-6 h-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 1.5 };
        switch (index) {
            case 0: // Concept (Target)
                return (
                    <svg {...svgProps}>
                        <circle cx="12" cy="12" r="9" />
                        <circle cx="12" cy="12" r="5" />
                        <circle cx="12" cy="12" r="1.5" />
                    </svg>
                );
            case 1: // Investment Rounds (Trending Up Arrow)
                return <svg {...svgProps}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>;
            case 2: // Public support (Briefcase)
                return <svg {...svgProps}><path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
            case 3: // Scaling (Bar Chart)
                return (
                    <svg {...svgProps}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 20V10M12 20V4M6 20v-6" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 20h18" />
                    </svg>
                );
            case 4: // Without CFO (User/Account)
                return <svg {...svgProps}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
            default:
                return <svg {...svgProps}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>;
        }
    };

    return (
      <section
        id="audience"
        ref={sectionRef}
        className="w-full bg-brand-dark py-16 md:py-24"
      >
        <div className="container mx-auto px-6 lg:px-12 max-w-7xl flex flex-col items-center">
          {/* Header Section */}
          <div className="text-center mb-12 lg:mb-16">
            <h2
              className={`text-4xl md:text-5xl font-serif font-bold text-white mb-4 transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              {dictionary.audience.title}
            </h2>
            <p
              className={`text-lg md:text-xl text-slate-400 font-sans transition-all duration-1000 delay-200 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              {dictionary.audience.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6 w-full mb-16 justify-center">
            {dictionary.audience.groups.map((group, index) => (
              <div
                key={index}
                className={`group bg-white/5 border-2 border-white/5 hover:bg-[#EBEBEB] hover:border-brand-accent rounded-xl p-6 md:p-8 flex flex-col items-center text-center transition-all duration-500 ease-out hover:shadow-[0_10px_30px_rgba(0,0,0,0.1)] hover:-translate-y-2 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}`}
                style={{ transitionDelay: `${400 + index * 100}ms` }}
              >
                {/* Icon: Turns Navy on hover */}
                <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-white mb-4 md:mb-6 group-hover:text-[#10367D] group-hover:scale-110 transition-all duration-500">
                  {getIcon(index)}
                </div>

                {/* Text: Turns Navy on hover */}
                <h3 className="text-sm md:text-base font-semibold text-white group-hover:text-[#10367D] leading-snug transition-colors duration-500">
                  {group}
                </h3>
              </div>
            ))}
          </div>

          {/* Footer Section */}
          <div
            className={`text-center max-w-3xl mx-auto transition-all duration-1000 delay-[900ms] ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
          >
            <p className="text-2xl md:text-3xl text-white font-serif italic font-medium tracking-wide">
              {dictionary.audience.bottom_text}
            </p>
          </div>
        </div>
      </section>
    );
}
