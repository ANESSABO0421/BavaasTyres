"use client";

import React from "react";

const CallToAction = () => {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* HUD Grid Background */}

      <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
        {/* Content Side */}
        <div className="space-y-10">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="flex h-2 w-2"></span>
            </div>

            <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase leading-[0.9]">
              Visit Our Shop<br />
              
            </h2>
          </div>

          <p className="text-white text-lg md:text-xl font-light leading-relaxed max-w-lg italic">
            Your authorized hub for premium tyre brands. Visit{" "}
            <a 
              href="https://www.google.com/maps/place/Bavaas+Tyres/@11.0250258,76.0670527,21z" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white underline"
            >
              Bavaas Tyres
            </a>{" "}
            for expert fitment and consultation.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
            <div className="p-6 border border-border/40 rounded-3xl bg-foreground/[0.02] backdrop-blur-md">
              <span className="text-[10px] font-mono text-white  uppercase tracking-[0.2em] block mb-2">
                Location
              </span>
              <p className="text-white font-bold uppercase tracking-tight text-sm">
                Chemmankadavu-Palakkal-Ottathara Rd, <br /> Kodur, Kerala 676504
              </p>
            </div>
            <div className="p-6 border border-border/40 rounded-3xl bg-foreground/[0.02] backdrop-blur-md">
              <span className="text-[10px] text-white font-mono  uppercase tracking-[0.2em] block mb-2">
                Availability
              </span>
              <p className="text-white font-bold uppercase tracking-tight text-sm">
                Mon - Sat | 7:00 AM - 7:00 PM
              </p>
            </div>
          </div>

          <button className="group relative w-full sm:w-auto px-12 py-5 bg-foreground text-background font-black uppercase tracking-tighter rounded-2xl overflow-hidden hover:scale-105 active:scale-95 transition-all">
            <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <span className="relative z-10">Initialize Navigation</span>
          </button>
        </div>

        {/* Map Side */}
        <div className="relative group">
          <div className="absolute -inset-4 bg-primary/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

          <div className="relative rounded-[3rem] overflow-hidden border border-border/60">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/10 to-transparent h-1/4 w-full animate-scan z-20 pointer-events-none" />

            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d489.1357288647038!2d76.06711913166946!3d11.02506456075678!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba64b001d4aa7e5%3A0xf398eab06b51e14e!2sBavaas%20Tyres!5e0!3m2!1sen!2sin!4v1740738734062!5m2!1sen!2sin"
              width="100%"
              height="500"
              style={{
                border: 0,
                filter: "grayscale(1) invert(1) contrast(1.2)",
              }}
              allowFullScreen
              loading="lazy"
              className="grayscale brightness-50 contrast-125 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;