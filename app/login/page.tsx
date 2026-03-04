"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";

const Page = () => {
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const overlayRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Entrance: Explosive "Power-On" sequence
      gsap.from(".hud-element", {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 1,
        ease: "power4.out"
      });

      // The "B" Logo Pulsing Glow
      gsap.to(".logo-glow", {
        boxShadow: "0 0 40px 10px rgba(234, 179, 8, 0.6)",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current || !overlayRef.current) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;

    // Intense 3D Tilt
    const xRotation = ((clientY - innerHeight / 2) / innerHeight) * 25;
    const yRotation = ((clientX - innerWidth / 2) / innerWidth) * -25;

    gsap.to(cardRef.current, {
      rotationX: xRotation,
      rotationY: yRotation,
      duration: 0.5,
      ease: "power2.out",
    });

    // Light Refraction Follower
    gsap.to(overlayRef.current, {
      background: `radial-gradient(circle at ${(clientX / innerWidth) * 100}% ${(clientY / innerHeight) * 100}%, rgba(255,255,255,0.08) 0%, transparent 50%)`,
      duration: 0.3
    });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full bg-[#020202] text-white flex items-center justify-center p-4 overflow-hidden perspective-[1500px]"
    >
      {/* --- CINEMATIC BACKGROUND --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] bg-yellow-600/[0.02] blur-[180px] rounded-full" />
        
        {/* Animated HUD Lines */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-[15%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-yellow-500 to-transparent animate-pulse" />
          <div className="absolute bottom-[15%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-yellow-500 to-transparent animate-pulse" />
        </div>
      </div>

      {/* --- THE "ELITE" CONSOLE --- */}
      <div
        ref={cardRef}
        style={{ transformStyle: "preserve-3d" }}
        className="relative z-10 w-full max-w-[500px] bg-black/40 backdrop-blur-[40px] border border-white/10 rounded-[4rem] p-1 shadow-[0_50px_100px_rgba(0,0,0,1)]"
      >
        {/* Dynamic Light Overlay */}
        <div ref={overlayRef} className="absolute inset-0 rounded-[4rem] z-20 pointer-events-none" />

        <div className="relative bg-[#0a0a0a]/90 rounded-[3.9rem] p-10 sm:p-16 flex flex-col items-center border border-white/5">
          
          {/* Header Section */}
          <div className="hud-element mb-12 flex flex-col items-center">
            <div className="logo-glow relative w-20 h-20 bg-yellow-500 rounded-3xl flex items-center justify-center mb-6 rotate-3">
              <span className="text-black text-4xl font-black italic -rotate-3">B</span>
            </div>
            <h1 className="text-3xl font-black italic tracking-tighter uppercase text-white drop-shadow-xl">
              Access <span className="text-yellow-500">Terminal</span>
            </h1>
            <div className="mt-3 h-[2px] w-12 bg-yellow-500/30 rounded-full" />
          </div>

          {/* Input Interface */}
          <div className="hud-element w-full space-y-10 mb-12">
            <div className="group relative">
              <span className="absolute -top-6 left-0 text-[10px] font-mono tracking-[0.4em] text-white/20 uppercase group-focus-within:text-yellow-500 transition-colors">Credential_ID</span>
              <input 
                type="text" 
                placeholder="000-BAVAAS-X" 
                className="w-full bg-transparent border-b border-white/10 py-3 text-lg font-mono tracking-widest outline-none focus:border-yellow-500 transition-all placeholder:text-white/5"
              />
            </div>

            <div className="group relative">
              <span className="absolute -top-6 left-0 text-[10px] font-mono tracking-[0.4em] text-white/20 uppercase group-focus-within:text-yellow-500 transition-colors">Secure_Pass</span>
              <input 
                type="password" 
                placeholder="********" 
                className="w-full bg-transparent border-b border-white/10 py-3 text-lg font-mono tracking-widest outline-none focus:border-yellow-500 transition-all placeholder:text-white/5"
              />
            </div>
          </div>

          {/* Ignition Button */}
          <div className="hud-element w-full relative group">
            <div className="absolute inset-0 bg-yellow-500 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" />
            <button className="relative w-full py-6 bg-yellow-500 rounded-2xl overflow-hidden active:scale-95 transition-all">
              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.3)_50%,transparent_75%)] bg-[length:250%_250%] animate-[shimmer_3s_infinite] pointer-events-none" />
              <span className="text-black font-black uppercase tracking-[0.3em] text-xs">Initialize System</span>
            </button>
          </div>

          {/* Subtle Links */}
          <div className="hud-element mt-10 flex gap-8 text-[10px] font-bold uppercase tracking-widest text-white/20">
            <button className="hover:text-white transition-colors">Request_Key</button>
            <button className="hover:text-white transition-colors">Bypass_Auth</button>
          </div>
        </div>
      </div>

      {/* --- HUD DECORATIONS --- */}
      <div className="hud-element absolute bottom-12 left-12 hidden xl:block opacity-20">
        <div className="flex gap-4 items-center">
            <div className="w-12 h-12 rounded-full border-2 border-dashed border-white/50 animate-[spin_10s_linear_infinite]" />
            <div className="font-mono text-[9px] leading-relaxed tracking-widest">
                SYSTEM: ONLINE<br/>
                TEMP: 32.4°C<br/>
                ID: KERALA_01
            </div>
        </div>
      </div>

      <Link href="/" className="hud-element absolute top-12 left-12 z-50 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-yellow-500 hover:text-black transition-all">
            <span className="text-xs">←</span>
        </div>
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">Exit</span>
      </Link>
    </div>
  );
};

export default Page;