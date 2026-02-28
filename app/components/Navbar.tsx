"use client"
import React, { useState, useEffect } from "react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll effect for glassmorphism
  useEffect(() => {
    const handleScroll = () => {
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
    <nav
      className={`fixed top-0 w-full z-100 transition-all duration-500 px-6 md:px-12 ${
        isScrolled 
          ? "py-4 bg-[#0f0e11]/80 backdrop-blur-xl border-b border-white/5" 
          : "py-8 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center font-black text-black text-xl">
            <img src="./logo.png" alt="" />
          </div>
          <span className="text-xl font-bold tracking-tighter uppercase hidden sm:block">
            Bavaas<span className="text-yellow-500">Tyres</span>
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10">
          <div className="flex gap-8 text-[13px] font-bold uppercase tracking-[0.2em] text-white/50">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-yellow-500 transition-colors duration-300"
              >
                {link.name}
              </a>
            ))}
          </div>

          <button className="px-6 py-2.5 bg-yellow-500 text-black text-[12px] font-bold uppercase tracking-wider rounded-full hover:bg-white transition-all duration-300 active:scale-95">
            Get Quote
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden flex flex-col gap-1.5 z-50"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className={`w-6 h-0.5 bg-white transition-transform ${isMobileMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`w-6 h-0.5 bg-white transition-opacity ${isMobileMenuOpen ? "opacity-0" : ""}`} />
          <span className={`w-6 h-0.5 bg-white transition-transform ${isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-[#0f0e11] transition-transform duration-500 ease-in-out md:hidden flex flex-col items-center justify-center gap-8 ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-3xl font-black uppercase tracking-tighter hover:text-yellow-500 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>
        
        <button className="mt-8 px-10 py-4 bg-yellow-500 text-black font-bold uppercase rounded-full">
          Get Quote
        </button>
      </div>
    </nav>
  );
};

export default Navbar;