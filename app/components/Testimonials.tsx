"use client";

import React from "react";

const testimonials = [
  {
    name: "Rahul Nair",
    vehicle: "Hyundai Creta",
    code: "UNIT_771",
    review:
      "I switched to Apollo tyres last year and the grip is outstanding. Smooth ride and excellent durability.",
  },
  {
    name: "Arjun Menon",
    vehicle: "Royal Enfield 350",
    code: "UNIT_320",
    review:
      "The bike tyres from MRF give amazing road stability. Highly recommended for long rides.",
  },
  {
    name: "Faisal Khan",
    vehicle: "Toyota Fortuner",
    code: "UNIT_904",
    review:
      "Purchased SUV tyres recently. Great performance in city and highway driving. Worth every rupee.",
  },
];

const Testimonials = () => {
  return (
    <section className="py-32  relative overflow-hidden">
      {/* Background Decorative Grid */}
      <div className="absolute inset-0  " />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="mb-20 space-y-4">
          <div className="flex items-center gap-3">
            <span className="h-[2px] w-12 bg-primary" />
            <span className="text-primary font-mono text-xs tracking-[0.4em] uppercase">Verified Logs</span>
          </div>
          <h2 className="text-5xl md:text-8xl font-black italic tracking-tighter uppercase leading-none">
            Drivers Feedback
          </h2>
        </div>

        {/* Grid of Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="group relative bg-card/30 backdrop-blur-xl border border-border p-10 rounded-[2.5rem] overflow-hidden hover:border-primary/50 transition-all duration-700 hover:-translate-y-3 shadow-2xl"
            >
              {/* Animated Scanner Line (from your globals.css) */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent h-1/4 w-full animate-scan pointer-events-none" />

              {/* Corner Accent */}
              <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-100 transition-opacity">
                <div className="w-10 h-10 border-t-2 border-r-2 border-primary rounded-tr-2xl" />
              </div>

              {/* Card Content */}
              <div className="relative z-10 space-y-8">
                {/* Status Bar */}
                

                {/* Review Text */}
                <p className="text-lg md:text-xl font-light italic leading-relaxed text-foreground/80">
                  “{item.review}”
                </p>

                {/* Driver Identity */}
                <div className="pt-8 border-t border-border flex items-center justify-between">
                  <div>
                    <h4 className="font-black uppercase italic tracking-tight text-xl text-foreground">
                      {item.name}
                    </h4>
                    <p className="text-xs font-mono uppercase text-primary/60 tracking-wider">
                      {item.vehicle}
                    </p>
                  </div>
                  
                  {/* Hexagon Placeholder for Avatar/Icon */}
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary transition-colors duration-500">
                    <span className="text-primary group-hover:text-primary-foreground font-black tracking-tighter">B</span>
                  </div>
                </div>
              </div>

              {/* Background Glass Glint (pure tailwind) */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-foreground/[0.03] to-transparent translate-y-full group-hover:translate-y-[-100%] transition-transform duration-1000 ease-in-out pointer-events-none" />
            </div>
          ))}
        </div>
      </div>

      {/* Atmospheric Blur */}
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
    </section>
  );
};

export default Testimonials;