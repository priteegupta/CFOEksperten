"use client";

import Image from "next/image";

export function CustomerStories() {
  const stories = [
    {
      name: "John Doe",
      role: "CEO, TechFlow Solutions",
      quote: "Partnering with CFO Eksperten was the best financial decision we made. They restructured our capital model and extended our runway by 18 months.",
      image: "/team1.jpeg" // using placeholder image until client updates
    },
    {
      name: "Jane Smith",
      role: "Founder, GreenEnergy Nordic",
      quote: "Their financial dashboards gave us complete clarity. We went from cash flow panic to confident, strategic growth within a single quarter.",
      image: "/team3.jpeg"
    },
    {
      name: "Erik Johansen",
      role: "Managing Director, OsloRetail",
      quote: "Before them, our bookkeeping was a mess. Now, we have a clear, automated pipeline and expert strategy meetings every month.",
      image: "/team1.jpeg" // using placeholder image until client updates
    }
  ];

  return (
    <section className="py-24 bg-[#0F172A] text-white">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="mb-16 text-center">
          <span className="text-[#3B82F6] text-[10px] font-black uppercase tracking-[0.3em] block mb-4">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-white">
            Customer Stories
          </h2>
          <p className="text-lg text-slate-400 font-sans max-w-2xl mx-auto">
            See how our tailored financial strategies have transformed businesses across the Nordics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stories.map((story, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full overflow-hidden relative bg-slate-800">
                  <Image src={story.image} alt={story.name} fill className="object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-white tracking-wide">{story.name}</h4>
                  <p className="text-[#3B82F6] text-[10px] uppercase tracking-wider">{story.role}</p>
                </div>
              </div>
              <p className="text-slate-300 italic font-light leading-relaxed">
                "{story.quote}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
