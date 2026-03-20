"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface TeamMember {
  name: string;
  role: string;
  years: string;
  bio: string;
}

export default function AboutSection({
  dictionary,
}: {
  dictionary: {
    about: {
      title: string;
      subtitle: string;
      team: TeamMember[];
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
      { threshold: 0.1 },
    );
    const currentRef = sectionRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  // Placeholder images - replace these with your actual files in /public
  const images = ["/team1.jpeg", "/team2.png", "/team3.jpeg"];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-24 bg-white overflow-hidden"
    >
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Norwegian Minimalist Header */}
        <div
          className={`max-w-3xl mb-20 transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#10367D] mb-6 md:mb-8 leading-[1.1]">
            {dictionary.about.title}
          </h2>
          <p className="text-lg md:text-xl text-slate-500 leading-relaxed font-light border-l-[3px] border-[#A5CE00] pl-6 md:pl-8">
            {dictionary.about.subtitle}
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-16 gap-y-20">
          {dictionary.about.team.map((member: TeamMember, index: number) => (
            <div
              key={index}
              style={{ transitionDelay: `${index * 200}ms` }}
              className={`group transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}
            >
              <div className="relative mb-8 aspect-[3/4] overflow-hidden md:grayscale hover:grayscale-0 transition-all duration-700 bg-slate-100 rounded-sm">
                <Image
                  src={images[index]}
                  alt={member.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute top-6 right-0 bg-[#A5CE00] px-4 py-1.5 text-[#10367D] font-bold text-xs tracking-widest">
                  {member.years}+ YRS EXP
                </div>
              </div>

              <h3 className="text-lg font-bold text-[#10367D] tracking-[0.1em] uppercase mb-1">
                {member.name}
              </h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.3em] mb-6">
                {member.role}
              </p>
              <div className="w-8 h-[1px] bg-[#A5CE00] mb-6"></div>
              <p className="text-slate-500 text-sm leading-8 font-light italic">
                &quot;{member.bio}&quot;
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
