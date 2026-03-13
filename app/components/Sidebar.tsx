"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import {
    LayoutDashboard,
    Package,
    Users,
    Settings,
    ChevronRight,
    LogOut
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function Sidebar() {
    const pathname = usePathname();
    const [isHovered, setIsHovered] = useState(false);
    const sidebarRef = useRef(null);
    const navigate = useRouter();

    const menu = [
        { label: "Dashboard", icon: LayoutDashboard, href: "/Dashboard" },
        { label: "Inventory", icon: Package, href: "/Dashboard/inventory" },
        { label: "Clients", icon: Users, href: "/Dashboard/clients" },
        { label: "Settings", icon: Settings, href: "/Dashboard/settings" },
    ];
    const handleLogout = async () => {
        try {
            localStorage.removeItem("token")
            navigate.push("/")

        } catch (error: any) {
            console.log(error.message)
        }
    }

    // GSAP Spring Animation for smooth expansion
    const handleMouseEnter = () => {
        setIsHovered(true);
        gsap.to(sidebarRef.current, {
            width: 260,
            duration: 0.4,
            ease: "power3.out"
        });
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        gsap.to(sidebarRef.current, {
            width: 80,
            duration: 0.4,
            ease: "power3.inOut"
        });
    };

    return (
        <aside
            ref={sidebarRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="fixed left-0 top-0 h-screen bg-[#050505] border-r border-white/5 z-50 flex flex-col w-[80px] overflow-hidden transition-colors duration-300"
        >
            {/* --- LOGO SECTION --- */}
            <div className="p-6 mb-10 flex items-center gap-4">
                <div className="min-w-[32px] h-8 bg-yellow-500 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(234,179,8,0.3)]">
                    <span className="text-black font-black italic">B</span>
                </div>
                <span className={`font-black italic tracking-tighter text-xl transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                    BAVAAS<span className="text-yellow-500">.</span>
                </span>
            </div>

            {/* --- NAVIGATION --- */}
            <nav className="flex-1 px-3 space-y-2">
                {menu.map((item, index) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={index}
                            href={item.href}
                            className={`flex items-center gap-4 p-4 rounded-xl transition-all group relative ${isActive
                                ? 'bg-yellow-500 text-black shadow-lg shadow-yellow-500/20'
                                : 'text-white/40 hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            <item.icon size={22} className="min-w-[22px]" />

                            <span className={`font-bold text-xs uppercase tracking-[0.2em] whitespace-nowrap transition-all duration-300 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                                }`}>
                                {item.label}
                            </span>

                            {/* Active Indicator Dot */}
                            {isActive && !isHovered && (
                                <div className="absolute right-2 w-1.5 h-1.5 bg-black rounded-full" />
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* --- FOOTER / SHUTDOWN --- */}
            <div className="p-3 border-t border-white/5">
                <button className="w-full flex items-center gap-4 p-4 text-white/20 hover:text-red-500 transition-colors group" onClick={handleLogout}>
                    <LogOut size={22} className="min-w-[22px]" />
                    <span className={`font-bold text-xs uppercase tracking-widest whitespace-nowrap transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'
                        }`}>
                        Logout
                    </span>
                </button>
            </div>

            {/* Hint Arrow (visible when closed) */}
            {!isHovered && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 p-1 text-white/10">
                    <ChevronRight size={12} />
                </div>
            )}
        </aside>
    );
}