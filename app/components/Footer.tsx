"use client";

import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-black pt-24 pb-12 overflow-hidden">
      {/* HUD Grid Background - Very subtle for technical depth */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          
          {/* Brand Identity */}
          <div className="md:col-span-2 space-y-6">
            <h2 className="text-3xl font-black italic tracking-tighter uppercase text-white">
              BAVAAS <span className="text-transparent text-outline">TYRES</span>
            </h2>
            <p className="text-white/40 text-sm max-w-sm leading-relaxed italic">
              Your authorized hub for high-velocity performance. Providing premium tyre solutions 
              and expert fitment for drivers who demand precision.
            </p>
            
            {/* Social Signal Indicators */}
            <div className="flex gap-4">
              {['FB', 'IG', 'WA'].map((social) => (
                <div key={social} className="w-10 h-10 border border-white/10 rounded-xl flex items-center justify-center text-[10px] font-mono text-white/40 hover:border-primary hover:text-primary transition-all cursor-pointer">
                  {social}
                </div>
              ))}
            </div>
          </div>

          {/* Technical Navigation */}
          <div className="space-y-6">
            <span className="text-[10px] font-mono text-primary uppercase tracking-[0.3em]">
              // System_Links
            </span>
            <ul className="space-y-4 text-sm font-bold uppercase tracking-tight text-white/70">
              <li className="hover:text-primary transition-colors cursor-pointer">Inventory</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Services</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Showroom</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Consultation</li>
            </ul>
          </div>

          {/* Direct Comms */}
          <div className="space-y-6">
            <span className="text-[10px] font-mono text-primary uppercase tracking-[0.3em]">
              // Contact_Data
            </span>
            <div className="space-y-6">
              <div className="group cursor-pointer">
                <p className="text-[10px] text-white/20 uppercase font-mono tracking-widest mb-1">Direct Line</p>
                <p className="text-white font-bold group-hover:text-primary transition-colors">+91 8943743074</p>
              </div>
              <div className="group cursor-pointer">
                <p className="text-[10px] text-white/20 uppercase font-mono tracking-widest mb-1">Base Location</p>
                <p className="text-white font-bold group-hover:text-primary transition-colors italic">Kodur, Kerala</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Status Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-mono text-white/20 uppercase tracking-[0.4em]">
            &copy; {currentYear} BAVAAS TYRES. ALL SYSTEMS OPERATIONAL.
          </p>
          <div className="flex items-center gap-8">
            <span className="text-[10px] font-mono text-white/20 uppercase tracking-[0.2em] hover:text-white cursor-pointer transition-colors">Privacy_Protocol</span>
            <span className="text-[10px] font-mono text-white/20 uppercase tracking-[0.2em] hover:text-white cursor-pointer transition-colors">Term_Conditions</span>
          </div>
        </div>
      </div>

      {/* Atmospheric Ambient Glow */}
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
    </footer>
  );
};

export default Footer;