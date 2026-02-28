"use client";

import Link from "next/link";
import React, { useState } from "react";

const FeatureTyres = () => {
  const [active, setActive] = useState<"car" | "bike">("car");

  const apolloProducts = {
    car: [
      { id: 1, name: "ALNAC 4G", sizes: "13 Size(s)", tag: "Comfort" },
      {
        id: 2,
        name: "AMAZER 4G LIFE",
        sizes: "25 Size(s)",
        tag: "Durability",
      },
      { id: 3, name: "APTERRA AT2", sizes: "14 Size(s)", tag: "All-Terrain" },
      { id: 4, name: "APTERRA CROSS", sizes: "5 Size(s)", tag: "Urban" },
    ],
    bike: [
      { id: 1, name: "TRAMPLR XR", sizes: "9 Size(s)", tag: "Adventure" },
      { id: 2, name: "ALPHA H1", sizes: "2 Size(s)", tag: "Sport" },
      { id: 3, name: "ACTIZIP F2", sizes: "6 Size(s)", tag: "City" },
      { id: 4, name: "ACTIGRIP S5", sizes: "3 Size(s)", tag: "Off-Road" },
    ],
  };

  return (
    <section className=" text-white py-32 px-6 relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-125 h-125 bg-yellow-500/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-2 w-12 bg-yellow-500" />
              <span className="text-yellow-500 font-mono text-xs tracking-[0.3em] uppercase">
                Authorized Dealer
              </span>
            </div>
            <h2 className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase leading-none">
              Apollo{" "}
              <span
                className="text-transparent"
                style={{ WebkitTextStroke: "1px #fbbf24" }}
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
        <div className="flex gap-4 mb-16 p-2 bg-white/2 border border-white/5 rounded-2xl w-fit backdrop-blur-md">
          {[
            { id: "car", label: "CAR & SUV" },
            { id: "bike", label: "BIKE & MOTO" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id as any)}
              className={`px-8 py-4 rounded-xl font-black tracking-widest text-xs transition-all duration-500 uppercase ${
                active === tab.id
                  ? "bg-yellow-500 text-black shadow-[0_0_30px_-5px_rgba(234,179,8,0.4)]"
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
              className="group relative bg-black t border border-white/5 rounded-[2rem] p-8 overflow-hidden transition-all duration-700 hover:border-yellow-500/30 hover:-translate-y-2"
            >
              {/* Corner Accent */}
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                <div className="w-8 h-8 border-t-2 border-r-2 border-yellow-500 rounded-tr-xl" />
              </div>

              {/* Product Info */}
              <div className="relative z-10 flex flex-col h-full">
                <span className="text-[10px] font-mono text-yellow-500/60 tracking-widest uppercase mb-4 group-hover:text-yellow-500 transition-colors">
                  {product.tag} // Series
                </span>

                <h3 className="text-3xl font-black italic uppercase leading-none mb-2 tracking-tighter group-hover:scale-105 transition-transform origin-left duration-500">
                  {product.name}
                </h3>

                <div className="flex items-center gap-2 mb-8">
                  <div className="h-1 w-1 rounded-full bg-white/20" />
                  <p className="text-white/30 text-xs font-mono uppercase tracking-tighter">
                    Stock: {product.sizes}
                  </p>
                </div>

                {/* Technical Divider */}
                <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                  <Link href={`/tyredetails/${product.id}`} className="text-[10px] font-black uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">
                    Tech Specs
                  </Link>
                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-yellow-500 group-hover:border-yellow-500 transition-all duration-500">
                    <span className="text-white group-hover:text-black transition-colors font-bold">
                      →
                    </span>
                  </div>
                </div>
              </div>

              {/* Background Glass Glare (Pure Tailwind) */}
              <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/2 to-transparent translate-y-full group-hover:translate-y-full transition-transform duration-1000 ease-in-out pointer-events-none" />

              {/* Massive Ghost Number */}
              <div className="absolute -bottom-4 -right-2 text-8xl font-black italic text-white/2 group-hover:text-yellow-500/3 transition-colors pointer-events-none">
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
