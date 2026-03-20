"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { type Dictionary } from "@/get-dictionary";

export default function ServicesSection({ dictionary }: { dictionary: Dictionary }) {
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
      { threshold: 0.1 },
    );

    const currentRef = sectionRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  const serviceKeys = ["budget", "liquidity", "forecast", "virtual_cfo"] as const;

  const serviceImages: { [key: string]: string } = {
    budget:
      "https://images.unsplash.com/photo-1554224154-26032ffc0d07?q=80&w=600&auto=format&fit=crop",
    liquidity:
      "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=600&auto=format&fit=crop",
    forecast:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop",
    virtual_cfo:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=600&auto=format&fit=crop",
  };

  return (
    <section
      ref={sectionRef}
      id="services"
      className="py-24 bg-[#EBEBEB] overflow-hidden"
    >
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div
          className={`max-w-3xl mb-16 transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h2 className="text-4xl md:text-5xl font-serif text-[#10367D] mb-6">
            {dictionary.services.title}
          </h2>
          <div className="w-20 h-1 bg-brand-accent"></div>
        </div>

        {/* Dynamic Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {serviceKeys.map((key, index) => {
            const service = dictionary.services[key];
            return (
              <div
                key={key}
                style={{ transitionDelay: `${index * 150}ms` }}
                className={`group relative bg-white overflow-hidden rounded-sm shadow-sm hover:shadow-xl transition-all duration-1000 ease-out border border-slate-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}
              >
                <div className="flex flex-col lg:flex-row h-full">
                  {/* Service Image - Now in Color */}
                  <div className="relative w-full lg:w-2/5 h-48 lg:h-auto overflow-hidden">
                    <Image
                      src={serviceImages[key]}
                      alt={service.title}
                      fill
                      /* REMOVED grayscale, KEPT transition and scale */
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* OPTIONAL: Subtle dark gradient instead of blue overlay for a premium look */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>

                  {/* Service Content */}
                  <div className="w-full lg:w-3/5 p-8 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-[#10367D] uppercase tracking-wider mb-4">
                        {service.title}
                      </h3>
                      <p className="text-slate-500 text-sm leading-relaxed mb-6 font-light">
                        {service.description}
                      </p>

                      {/* Feature Points */}
                      <ul className="space-y-2">
                        {service.points.map((point: string, idx: number) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 text-[13px] text-slate-600"
                          >
                            <span className="text-brand-accent mt-1">/</span>
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
