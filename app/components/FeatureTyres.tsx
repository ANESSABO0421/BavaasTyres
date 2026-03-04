"use client";

import Link from "next/link";
import React, { useState } from "react";

const FeatureTyres = () => {
  const [active, setActive] = useState<"car" | "bike">("car");

  const apolloProducts = {
    car: [
      { id: 1, name: "ALNAC 4G", sizes: "13 Sizes", tag: "Comfort", img: "data:image/jpeg;base64,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" },
      { id: 2, name: "AMAZER 4G", sizes: "25 Sizes", tag: "Durability", img: "https://images.unsplash.com/photo-1578844541663-47139a68ce24?q=80&w=800&auto=format&fit=crop" },
      { id: 3, name: "APTERRA AT2", sizes: "14 Sizes", tag: "All-Terrain", img: "https://images.unsplash.com/photo-1533106418989-88406c7cc8ca?q=80&w=800&auto=format&fit=crop" },
      { id: 4, name: "APTERRA CROSS", sizes: "5 Sizes", tag: "Urban", img: "https://images.unsplash.com/photo-1621932953986-15fcf084da0f?q=80&w=800&auto=format&fit=crop" },
    ],
    bike: [
      { id: 1, name: "TRAMPLR XR", sizes: "9 Sizes", tag: "Adventure", img: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=800&auto=format&fit=crop" },
      { id: 2, name: "ALPHA H1", sizes: "2 Sizes", tag: "Sport", img: "https://images.unsplash.com/photo-1614165933388-9b55d3882ff6?q=80&w=800&auto=format&fit=crop" },
      { id: 3, name: "ACTIZIP F2", sizes: "6 Sizes", tag: "City", img: "https://images.unsplash.com/photo-1444491741275-3747c53c99b4?q=80&w=800&auto=format&fit=crop" },
      { id: 4, name: "ACTIGRIP S5", sizes: "3 Sizes", tag: "Off-Road", img: "https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?q=80&w=800&auto=format&fit=crop" },
    ],
  };

  return (
    <section className=" text-white py-32 px-6 relative overflow-hidden">
      {/* HUD Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-125 h-125 bg-yellow-500/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-[1px] w-12 bg-yellow-500 shadow-[0_0_10px_#fbbf24]" />
              <span className="text-yellow-500 font-mono text-xs tracking-[0.3em] uppercase">
                Authorized Dealer
              </span>
            </div>
            <h2 className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase leading-none">
              Apollo{" "}
              <span
                className="text-transparent text-yellow-500"
                style={{ WebkitTextStroke: "1.5px rgba(253, 182, 0, 1)" }}
              >
                Elite
              </span>
            </h2>
          </div>
          <p className="text-white/40 max-w-md text-lg font-light italic border-l border-white/10 pl-6">
            Engineered for those who demand{" "}
            <span className="text-white font-medium">zero compromise</span>{" "}
            between the wheel and the world.
          </p>
        </div>

        {/* Cinematic Tabs */}
        <div className="flex gap-4 mb-16 p-2 bg-white/[0.03] border border-white/5 rounded-2xl w-fit backdrop-blur-md">
          {[
            { id: "car", label: "CAR & SUV" },
            { id: "bike", label: "BIKE & MOTO" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id as any)}
              className={`px-8 py-4 rounded-xl font-black tracking-widest text-xs transition-all duration-500 uppercase ${active === tab.id
                ? "bg-yellow-500 text-black shadow-[0_10px_30px_-5px_rgba(234,179,8,0.5)]"
                : "text-white/40 hover:text-white hover:bg-white/5"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {apolloProducts[active].map((product, index) => (
            <div
              key={index}
              className="group relative bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-8 h-[500px] overflow-hidden transition-all duration-700 hover:border-yellow-500/40 hover:-translate-y-2 flex flex-col justify-between"
            >
              {/* Image Background Layer */}
              <div className="absolute inset-0 z-0 opacity-20 group-hover:opacity-40 transition-opacity duration-1000">
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-full h-full object-cover grayscale scale-110 group-hover:grayscale-0 group-hover:scale-100 transition-all duration-1000 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              </div>

              {/* Vertical Scanner Animation (from your globals.css) */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-yellow-500/10 to-transparent h-1/3 w-full animate-scan z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />

              {/* Corner Accent */}
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity z-30">
                <div className="w-8 h-8 border-t-2 border-r-2 border-yellow-500 rounded-tr-xl" />
              </div>

              {/* Product Info (Top) */}
              <div className="relative z-30 flex flex-col">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] font-mono text-yellow-500/60 tracking-widest uppercase group-hover:text-yellow-500 transition-colors">
                    {product.tag} // Series
                  </span>
                  <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse" />
                </div>

                <h3 className="text-3xl font-black italic uppercase leading-none mb-2 tracking-tighter group-hover:translate-x-2 transition-transform duration-500">
                  {product.name}
                </h3>

                <div className="flex items-center gap-2">
                  <div className="h-1 w-1 rounded-full bg-white/20" />
                  <p className="text-white/30 text-[10px] font-mono uppercase tracking-tighter">
                    Ready Stock: {product.sizes}
                  </p>
                </div>
              </div>

              {/* Footer Section (Bottom) */}
              <div className="relative z-30 pt-6 border-t border-white/5 flex items-center justify-between">
                <Link
                  href={`/tyredetails/${product.id}`}
                  className="text-[10px] font-black uppercase tracking-widest text-white/40 group-hover:text-white transition-colors"
                >
                  View Tech Specs_
                </Link>
                <div className="w-12 h-12 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center group-hover:bg-yellow-500 group-hover:border-yellow-500 transition-all duration-500 group-hover:-rotate-12">
                  <span className="text-white group-hover:text-black transition-colors font-bold text-xl">
                    ↗
                  </span>
                </div>
              </div>

              {/* Massive Ghost Number */}
              <div className="absolute -bottom-6 -right-2 text-[150px] font-black italic text-white/[0.03] group-hover:text-yellow-500/[0.06] transition-all duration-700 pointer-events-none leading-none">
                0{index + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureTyres;