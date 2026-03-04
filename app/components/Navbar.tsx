// "use client"
// import React, { useState, useEffect } from "react";

// const Navbar = () => {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   // Handle scroll effect for glassmorphism
//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 20);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const navLinks = [
//     { name: "Services", href: "#" },
//     { name: "Inventory", href: "#" },
//     { name: "About Us", href: "#" },
//     { name: "Contact", href: "#" },
//   ];

//   return (
//     <nav
//       className={`fixed top-0 w-full z-100 transition-all duration-500 px-6 md:px-12 ${
//         isScrolled 
//           ? "py-4 bg-[#0f0e11]/80 backdrop-blur-xl border-b border-white/5" 
//           : "py-8 bg-transparent"
//       }`}
//     >
//       <div className="max-w-7xl mx-auto flex justify-between items-center">
//         {/* Logo */}
//         <div className="flex items-center gap-2 group cursor-pointer">
//           <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center font-black text-black text-xl">
//             <img src="./logo.png" alt="" />
//           </div>
//           <span className="text-xl font-bold tracking-tighter uppercase hidden sm:block">
//             Bavaas<span className="text-yellow-500">Tyres</span>
//           </span>
//         </div>

//         {/* Desktop Navigation */}
//         <div className="hidden md:flex items-center gap-10">
//           <div className="flex gap-8 text-[13px] font-bold uppercase tracking-[0.2em] text-white/50">
//             {navLinks.map((link) => (
//               <a
//                 key={link.name}
//                 href={link.href}
//                 className="hover:text-yellow-500 transition-colors duration-300"
//               >
//                 {link.name}
//               </a>
//             ))}
//           </div>

//           <button className="px-6 py-2.5 bg-yellow-500 text-black text-[12px] font-bold uppercase tracking-wider rounded-full hover:bg-white transition-all duration-300 active:scale-95">
//             Get Quote
//           </button>
//         </div>

//         {/* Mobile Menu Toggle */}
//         <button 
//           className="md:hidden flex flex-col gap-1.5 z-50"
//           onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//         >
//           <span className={`w-6 h-0.5 bg-white transition-transform ${isMobileMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
//           <span className={`w-6 h-0.5 bg-white transition-opacity ${isMobileMenuOpen ? "opacity-0" : ""}`} />
//           <span className={`w-6 h-0.5 bg-white transition-transform ${isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
//         </button>
//       </div>

//       {/* Mobile Menu Overlay */}
//       <div 
//         className={`fixed inset-0 bg-[#0f0e11] transition-transform duration-500 ease-in-out md:hidden flex flex-col items-center justify-center gap-8 ${
//           isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
//         }`}
//       >
//         <div className="flex flex-col items-center gap-6">
//           {navLinks.map((link) => (
//             <a
//               key={link.name}
//               href={link.href}
//               onClick={() => setIsMobileMenuOpen(false)}
//               className="text-3xl font-black uppercase tracking-tighter hover:text-yellow-500 transition-colors"
//             >
//               {link.name}
//             </a>
//           ))}
//         </div>

//         <button className="mt-8 px-10 py-4 bg-yellow-500 text-black font-bold uppercase rounded-full">
//           Get Quote
//         </button>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;




"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Small threshold to trigger the "Scrolled" state
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Services", href: "#" },
    { name: "Inventory", href: "#" },
    { name: "About Us", href: "#" },
    { name: "Contact", href: "#" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ease-in-out px-6 md:px-12 ${isScrolled
            ? "py-4 bg-black/80 backdrop-blur-2xl border-b border-white/5 shadow-2xl"
            : "py-8 bg-transparent"
          }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo Section */}
          <div className="flex items-center gap-3 group cursor-pointer relative z-[110]">
            <div className="w-10 h-10 bg-yellow-500 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(234,179,8,0.3)] group-hover:scale-110 transition-transform">
              <span className="font-black text-black text-xl italic">B</span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-xl font-black tracking-tighter uppercase text-white">
                Bavaas<span className="text-yellow-500 italic">Tyres</span>
              </span>
              <span className="text-[8px] font-mono text-white/30 tracking-[0.3em] uppercase">
                Est. 2014
              </span>
            </div>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-12">
            <div className="flex gap-10 text-[11px] font-black uppercase tracking-[0.3em] text-white/40">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="relative group hover:text-white transition-colors duration-300"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-yellow-500 transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>

            <Link href="/login" className="px-8 py-3 bg-yellow-500 text-black text-[11px] font-black uppercase tracking-widest rounded-xl hover:bg-white hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all duration-300 active:scale-95 shadow-lg">
              Get Quote
            </Link>
          </div>

          {/* Mobile Toggle Button */}
          <button
            className="md:hidden relative z-[110] p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            <div className="flex flex-col gap-1.5 items-end">
              <span className={`h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? "w-6 rotate-45 translate-y-2" : "w-6"}`} />
              <span className={`h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : "w-4"}`} />
              <span className={`h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? "w-6 -rotate-45 -translate-y-2" : "w-5"}`} />
            </div>
          </button>
        </div>
      </nav>

      {/* Fullscreen Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black z-[90] transition-all duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] md:hidden flex flex-col items-center justify-center ${isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
          }`}
      >
        {/* Subtle Background HUD Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem]" />

        <div className="relative z-10 flex flex-col items-center gap-8">
          {navLinks.map((link, index) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-5xl font-black uppercase tracking-tighter text-white hover:text-yellow-500 transition-all duration-300 ${isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {link.name}
            </a>
          ))}

          <button className="mt-12 px-12 py-5 bg-yellow-500 text-black font-black uppercase tracking-widest rounded-2xl text-sm shadow-[0_20px_50px_rgba(234,179,8,0.2)]">
            Get Quote
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;