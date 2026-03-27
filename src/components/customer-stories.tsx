"use client";

import { motion } from "framer-motion";
import { type Dictionary } from "@/get-dictionary";

interface Story {
  text: string;
  company: string;
}

export default function CustomerStories({
  dictionary,
}: {
  dictionary: Dictionary;
}) {
  const stories = (dictionary.customer_stories?.stories as Story[]) || [];
  const { title, subtitle, title_badge } = dictionary.customer_stories || {};

  return (
    <section
      id="customers"
      className="relative py-28 md:py-40 bg-brand-gradient-dark text-white overflow-hidden"
    >
      {/* AMBIENT OVERLAY: Adds depth to the gradient */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none"></div>

      <div className="relative container mx-auto px-6 max-w-7xl">
        {/* HEADER: (Split Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24 items-end">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7"
          >
            <div className="flex items-center gap-4 mb-8">
              <span className="w-12 h-0.5 bg-brand-accent"></span>
              <span className="text-brand-accent text-[12px] font-black uppercase tracking-[0.5em]">
                {title_badge || "CASE STUDIES"}
              </span>
            </div>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tighter leading-[0.95]">
              {title}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 lg:pb-2"
          >
            <p className="text-xl md:text-2xl text-slate-400 font-light leading-relaxed italic border-l-2 border-white/10 pl-8">
              {subtitle}
            </p>
          </motion.div>
        </div>

        {/* CASE STUDY CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stories.map((story: Story, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              whileHover={{ y: -12 }}
              className="group relative flex flex-col h-full bg-white/4 border border-white/10 rounded-[40px] p-10 backdrop-blur-md transition-all duration-700 hover:bg-white/8 hover:border-brand-accent/40"
            >
              {/* INTERACTIVE GLOW: Card emits a gradient glow on hover */}
              <div className="absolute inset-0 rounded-[40px] bg-brand-gradient blur-2xl opacity-0 group-hover:opacity-15 transition-opacity duration-700 pointer-events-none"></div>

              {/* QUOTE ICON */}
              <div className="text-5xl font-serif mb-8 text-brand-accent transition-transform duration-500 group-hover:translate-x-2">
                “
              </div>

              {/* TESTIMONIAL TEXT */}
              <p className="text-lg md:text-xl text-slate-200 font-light leading-relaxed mb-12 italic opacity-80 group-hover:opacity-100 transition-opacity">
                {story.text}
              </p>

              {/* FOOTER */}
              <div className="mt-auto border-t border-white/10 pt-8">
                <h4 className="text-white font-bold tracking-widest text-[12px] uppercase mb-3">
                  {story.company}
                </h4>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-px bg-brand-gradient group-hover:w-20 transition-all duration-700"></div>
                  <span className="text-[9px] font-black text-brand-accent uppercase tracking-widest opacity-60">
                    Verified
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
