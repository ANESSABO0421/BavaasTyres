"use client";

import React from "react";

const About = () => {
  return (
    <section className="relative z-10 py-24 md:py-44 px-6  overflow-hidden">
      {/* 1. Background Architecture: Grid & Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-500/10 blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center relative">
        
        {/* LEFT CONTENT: Typography Focus */}
        <div className="lg:col-span-7 space-y-10 order-2 lg:order-1">
          <div className="relative inline-block">
             <span className="flex items-center gap-2 text-yellow-500 font-mono text-xs tracking-[0.4em] uppercase mb-4">
              <span className="h-1 w-8 bg-yellow-500" /> Since 2014
            </span>
            <h2 className="text-6xl md:text-9xl font-black leading-[0.85] tracking-tighter uppercase italic text-white">
              DRIVEN BY <br />
              <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.4)' }}>
                EXCELLENCE
              </span>
            </h2>
          </div>

          <div className="flex flex-col md:flex-row gap-10">
            <div className="max-w-xl space-y-8">
              <p className="text-xl md:text-2xl text-white/90 font-light leading-relaxed border-l-2 border-yellow-500 pl-6">
                At <span className="text-yellow-500 font-bold italic">Bavaas Tyres</span>, 
                we master the chemistry between rubber and road.
              </p>
              <p className="text-white/40 text-base md:text-lg font-light leading-relaxed">
                Precision is our obsession. Whether it's a routine check or a high-performance 
                upgrade, we treat every vehicle like a masterpiece of engineering. 
                Safety isn't just a promise—it's our baseline.
              </p>

              {/* Advanced Stats: Interactive Hover */}
              <div className="flex flex-wrap gap-12 pt-10">
                {[
                  { label: "Years Mastery", value: "10+" },
                  { label: "Elite Clients", value: "5k+" },
                  { label: "Precision", value: "100%" },
                ].map((stat, i) => (
                  <div key={i} className="group cursor-default">
                    <div className="text-4xl md:text-5xl font-black text-white group-hover:text-yellow-500 transition-all duration-300 transform group-hover:-translate-y-1">
                      {stat.value}
                    </div>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-white/30 group-hover:text-yellow-500/60 transition-colors">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT CONTENT: The "Tech-Stack" Card */}
        <div className="lg:col-span-5 relative order-1 lg:order-2 group">
          {/* Outer Card Glow */}
          <div className="absolute -inset-1 bg-linear-to-r from-yellow-500/20 to-transparent rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-100 transition duration-1000" />
          
          <div className="relative bg-[#0a0a0c] border border-white/5 rounded-[2.5rem] p-8 md:p-12 backdrop-blur-3xl overflow-hidden shadow-2xl">
            
            {/* Visual Header */}
            <div className="flex items-center justify-between mb-12">
              <h3 className="text-2xl font-bold text-white tracking-tight italic uppercase">
                Core Metrics
              </h3>
              <div className="flex gap-1">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full bg-yellow-500/40" />
                ))}
              </div>
            </div>

            <ul className="space-y-10">
              {[
                { title: "Expert Techs", desc: "Certified Automotive masters." },
                { title: "Premium Brands", desc: "Only the world's finest rubber." },
                { title: "Laser Alignment", desc: "Sub-millimeter precision tech." },
                { title: "Fixed Pricing", desc: "Zero hidden fees. Ever." },
              ].map((item, idx) => (
                <li key={idx} className="flex gap-6 group/item relative">
                  {/* Vertical Line on Hover */}
                  <div className="absolute -left-4 top-0 bottom-0 w-0.5 bg-yellow-500 scale-y-0 group-hover/item:scale-y-100 transition-transform duration-300 origin-top" />
                  
                  <div className="flex-1">
                    <h4 className="text-white text-lg font-bold group-hover/item:text-yellow-400 transition-colors mb-1 tracking-wide uppercase italic">
                      {item.title}
                    </h4>
                    <p className="text-white/30 text-sm leading-relaxed group-hover/item:text-white/60">
                      {item.desc}
                    </p>
                  </div>
                  <div className="text-white/5 font-black text-4xl italic self-center group-hover/item:text-yellow-500/10 transition-colors">
                    0{idx + 1}
                  </div>
                </li>
              ))}
            </ul>

            {/* Bottom "Machine" Detail */}
            <div className="mt-12 pt-8 border-t border-white/5 flex justify-between items-center text-[10px] uppercase tracking-widest text-white/20">
              <span>System: 004-BT</span>
              <span className="text-yellow-500/40">Verified ///</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;