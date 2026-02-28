"use client";

import React from "react";

const brands = [
  { name: "Apollo Tyres", tag: "Premium Partner" },
  { name: "TVS Tyres", tag: "Elite Grip" },
  { name: "MRF Tyres", tag: "Street Master" },
  { name: "CEAT Tyres", tag: "All Terrain" },
  { name: "Michelin", tag: "Pilot Sport" },
  { name: "Bridgestone", tag: "Ecopia Series" },
];

const Brands = () => {
  return (
    <section className="py-24  overflow-hidden relative">
      {/* 1. Header with Industrial Accents */}
      <div className="max-w-7xl mx-auto px-6 mb-20 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="text-yellow-500 font-mono text-[10px] tracking-[0.5em] uppercase">
            // Technical Partners
          </span>
          <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase text-white">
            Trusted <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}>Brands</span>
          </h2>
        </div>
        <p className="text-white/30 max-w-xs text-sm font-light leading-relaxed uppercase tracking-widest border-l border-white/10 pl-6">
          Collaborating with the world's <span className="text-white">leading manufacturers</span> to deliver peak performance.
        </p>
      </div>

      {/* 2. The Infinite Kinetic Ribbon */}
      <div className="relative flex flex-col gap-4 rotate-[-2deg] scale-105 group">
        
        {/* Top Ribbon (Moving Left) */}
        <div className="flex overflow-hidden border-y border-white/5 bg-black backdrop-blur-3xl py-10">
          <div className="flex animate-[marquee_30s_linear_infinite] whitespace-nowrap group-hover:[animation-play-state:paused]">
            {[...brands, ...brands, ...brands].map((brand, index) => (
              <div
                key={index}
                className="flex items-center gap-12 mx-12 group/item cursor-pointer"
              >
                {/* Brand Decorator */}
                <div className="w-2 h-2 rounded-full bg-yellow-500/20 group-hover/item:bg-yellow-500 transition-colors" />
                
                <div className="flex flex-col">
                  <h3 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-white/20 group-hover/item:text-white transition-all duration-500 group-hover/item:scale-110">
                    {brand.name}
                  </h3>
                  <span className="text-[8px] font-mono tracking-[0.4em] text-yellow-500 opacity-0 group-hover/item:opacity-100 transition-opacity">
                    {brand.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Ribbon (Moving Right + Different Speed) */}
        <div className="flex overflow-hidden border-b border-white/5 bg-black py-6">
          <div className="flex animate-[marquee-reverse_40s_linear_infinite] whitespace-nowrap group-hover:[animation-play-state:paused]">
            {[...brands, ...brands, ...brands].map((brand, index) => (
              <div
                key={index}
                className="flex items-center gap-8 mx-16 text-white/10 italic font-black uppercase tracking-[0.3em] text-xl"
              >
                <span>Performance</span>
                <span className="text-yellow-500/20">///</span>
                <span>Durability</span>
                <span className="text-yellow-500/20">///</span>
                <span>Precision</span>
              </div>
            ))}
          </div>
        </div>
      </div>


      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-yellow-500/5 blur-[120px] rounded-full pointer-events-none" />

      
     
    </section>
  );
};

export default Brands;