"use client";

import React, { useState, useRef } from "react";

const Services = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, activeIndex: null });
  const threshold = 15; // Intensity of tilt

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: any) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    
    // Calculate normalized position (-0.5 to 0.5)
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    
    // For Tilt
    const tiltX = (y - 0.5) * -threshold;
    const tiltY = (x - 0.5) * threshold;

    setMousePos({ x: tiltX, y: tiltY, activeIndex: index });
    
    // Update CSS variables for the spotlight effect
    e.currentTarget.style.setProperty("--mouse-x", `${x * 100}%`);
    e.currentTarget.style.setProperty("--mouse-y", `${y * 100}%`);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    setMousePos({ x: 0, y: 0, activeIndex: null });
  };

  const services = [
    { title: "Tyre Removal", desc: "Professional fitting for maximum safety.", icon: "🛞", color: "from-blue-500" },
    { title: "Puncture Repair", desc: "Quick fixing to get you back on the road.", icon: "🔧", color: "from-yellow-500" },
    { title: "Air Filling", desc: "Optimal pressure for mileage and safety.", icon: "💨", color: "from-green-500" },
    { title: "Wheel Balancing", desc: "Smooth driving with reduced vibration.", icon: "⚙️", color: "from-purple-500" },
    { title: "Wheel Alignment", desc: "Precision handling and improved tyre life.", icon: "📐", color: "from-red-500" },
    { title: "Car Wash", desc: "Complete cleaning for a polished look.", icon: "🚿", color: "from-cyan-500" },
  ];

  return (
    <section className=" text-white py-24 px-6 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full  pointer-events-none" />

      <div className="max-w-7xl mx-auto text-center mb-20">
        <h2 className="text-5xl md:text-7xl font-black tracking-tighter italic uppercase">
          Premium <span className="text-yellow-400">Services</span>
        </h2>
        <div className="h-1 w-24 bg-yellow-400 mx-auto mt-4 rounded-full" />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {services.map((service, index) => {
          const isTilting = mousePos.activeIndex === index;

          return (
            <div
              key={index}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: isTilting
                  ? `perspective(1000px) rotateX(${mousePos.x}deg) rotateY(${mousePos.y}deg) scale3d(1.02, 1.02, 1.02)`
                  : "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
                transition: isTilting ? "none" : "all 0.5s cubic-bezier(0.23, 1, 0.32, 1)",
              }}
              className="group relative bg-[#111113] border border-white/5 rounded-3xl p-10 overflow-hidden cursor-pointer"
            >
              {/* 1. Spotlight Background Effect */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.06), transparent 40%)`
                }}
              />

              {/* 2. Animated Border Gradient (Mask Technique) */}
              <div className="absolute inset-0 rounded-3xl border border-yellow-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* 3. Icon Content */}
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-4xl mb-6 ring-1 ring-white/10 group-hover:ring-yellow-400/50 group-hover:bg-yellow-400/10 transition-all duration-500 shadow-2xl">
                  {service.icon}
                </div>

                <h3 className="text-2xl font-bold mb-4 tracking-tight group-hover:translate-x-1 transition-transform duration-300">
                  {service.title}
                </h3>

                <p className="text-gray-400 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                  {service.desc}
                </p>

                {/* 4. Bottom Accent Bar */}
                <div className="mt-8 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-yellow-400 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2 transition-all duration-500">
                  <span>Explore Service</span>
                  <div className="h-2 w-8 bg-yellow-400" />
                </div>
              </div>

              {/* 5. The "Ghost" Background Icon */}
              <div className="absolute -bottom-8 -right-8 text-9xl opacity-[0.02] group-hover:opacity-[0.07] group-hover:-rotate-12 transition-all duration-700 pointer-events-none italic font-black">
                {service.icon}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Services;