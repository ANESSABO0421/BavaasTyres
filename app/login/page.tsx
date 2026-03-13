"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import Link from "next/link";
import axiosInstance from "../utils/axiosInstance";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast"; // 1. Import Toast

const Page = () => {
  const containerRef = useRef(null);
  const router = useRouter();
  const cardRef = useRef(null);
  const overlayRef = useRef(null);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".hud-element", {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 1,
        ease: "power4.out"
      });

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

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("MISSING CREDENTIALS", {
        style: {
          background: "#1a1a1a",
          color: "#ff4b4b",
          border: "1px solid #ff4b4b33",
          fontSize: "10px",
          letterSpacing: "0.2em",
          fontWeight: "bold",
        },
      });
      return;
    }

    setLoading(true);
    const loadingToast = toast.loading("ENCRYPTING UPLINK...");

    try {
      const response = await axiosInstance.post("/users/login", { email, password });

      localStorage.setItem("token", response.data.token);

      toast.success("ACCESS GRANTED // WELCOME ADMIN", {
        id: loadingToast,
        duration: 3000,
        style: {
          background: "#0a0a0a",
          color: "#eab308",
          border: "1px solid #eab30833",
          fontSize: "10px",
          letterSpacing: "0.2em",
          fontWeight: "bold",
        },
      });

      setTimeout(() => router.push("/Dashboard"), 1500);

    } catch (error: any) {
      setLoading(false);
      toast.error("AUTHENTICATION FAILED // INVALID KEY", {
        id: loadingToast,
        style: {
          background: "#1a1a1a",
          color: "#ff4b4b",
          border: "1px solid #ff4b4b33",
          fontSize: "10px",
          letterSpacing: "0.2em",
          fontWeight: "bold",
        },
      });
      console.log(error.message);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current || !overlayRef.current) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const xRotation = ((clientY - innerHeight / 2) / innerHeight) * 25;
    const yRotation = ((clientX - innerWidth / 2) / innerWidth) * -25;

    gsap.to(cardRef.current, {
      rotationX: xRotation,
      rotationY: yRotation,
      duration: 0.5,
      ease: "power2.out",
    });

    gsap.to(overlayRef.current, {
      background: `radial-gradient(circle at ${(clientX / innerWidth) * 100}% ${(clientY / innerHeight) * 100}%, rgba(255,255,255,0.08) 0%, transparent 50%)`,
      duration: 0.3
    });
  };

  return (
    <div ref={containerRef} onMouseMove={handleMouseMove} className="relative min-h-screen w-full bg-[#020202] text-white flex items-center justify-center p-4 overflow-hidden perspective-[1500px]">

      {/* 2. Add Toaster Component */}
      <Toaster position="top-center" reverseOrder={false} />

      {/* --- BACKGROUND --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] bg-yellow-600/[0.02] blur-[180px] rounded-full" />
      </div>

      {/* --- CONSOLE --- */}
      <div ref={cardRef} style={{ transformStyle: "preserve-3d" }} className="relative z-10 w-full max-w-[500px] bg-black/40 backdrop-blur-[40px] border border-white/10 rounded-[4rem] p-1 shadow-[0_50px_100px_rgba(0,0,0,1)]">
        <div ref={overlayRef} className="absolute inset-0 rounded-[4rem] z-20 pointer-events-none" />

        <div className="relative bg-[#0a0a0a]/90 rounded-[3.9rem] p-10 sm:p-16 flex flex-col items-center border border-white/5">
          <div className="hud-element mb-12 flex flex-col items-center">
            <div className="logo-glow relative w-20 h-20 bg-yellow-500 rounded-3xl flex items-center justify-center mb-6 rotate-3">
              <span className="text-black text-4xl font-black italic -rotate-3">B</span>
            </div>
            <h1 className="text-3xl font-black italic tracking-tighter uppercase text-white drop-shadow-xl">
              Access <span className="text-yellow-500">Terminal</span>
            </h1>
          </div>

          <div className="hud-element w-full space-y-10 mb-12">
            <div className="group relative">
              <span className="absolute -top-6 left-0 text-[10px] font-mono tracking-[0.4em] text-white/20 uppercase group-focus-within:text-yellow-500">Credential_ID</span>
              <input
                type="text"
                placeholder="000-BAVAAS-X"
                className="w-full bg-transparent border-b border-white/10 py-3 text-lg font-mono tracking-widest outline-none focus:border-yellow-500 transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="group relative">
              <span className="absolute -top-6 left-0 text-[10px] font-mono tracking-[0.4em] text-white/20 uppercase group-focus-within:text-yellow-500">Secure_Pass</span>
              <input
                type="password"
                placeholder="********"
                className="w-full bg-transparent border-b border-white/10 py-3 text-lg font-mono tracking-widest outline-none focus:border-yellow-500 transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="hud-element w-full relative group">
            <div className="absolute inset-0 bg-yellow-500 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" />
            <button
              onClick={handleLogin}
              disabled={loading}
              className={`relative w-full py-6 bg-yellow-500 rounded-2xl overflow-hidden active:scale-95 transition-all ${loading ? 'opacity-50 cursor-wait' : ''}`}
            >
              <span className="text-black font-black uppercase tracking-[0.3em] text-xs">
                {loading ? "INITIALIZING..." : "Initialize System"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;