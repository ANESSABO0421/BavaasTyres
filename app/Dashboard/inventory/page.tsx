"use client";

import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import gsap from "gsap";
import {
    Search,
    Plus,
    Package,
    AlertTriangle,
    CheckCircle2,
    Layers
} from "lucide-react";
import authAxios from "@/app/utils/authAxios";

interface InventoryItem {
    id: string;
    name: string;
    stock: number;
    price: number;
    status: string;
}

const InventoryPage: React.FC = () => {
    const tableRef = useRef<HTMLTableSectionElement | null>(null);

    const [inventory, setInventory] = useState<InventoryItem[]>([]);
    const [loading, setLoading] = useState(true);

    /* ---------- FETCH DATA ---------- */

    useEffect(() => {
        const fetchInventory = async () => {
            try {
                const resp = await authAxios.get("")



            } catch (error) {
                console.error("Inventory fetch error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchInventory();
    }, []);

    /* ---------- GSAP ANIMATION ---------- */

    useLayoutEffect(() => {
        if (inventory.length === 0) return;

        gsap.from(".inv-row", {
            opacity: 0,
            x: -20,
            duration: 0.5,
            stagger: 0.05,
            ease: "power2.out"
        });
    }, [inventory]);

    return (
        <div className="space-y-6">
            {/* Header */}

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white/[0.02] p-6 rounded-3xl border border-white/5">

                <div>
                    <h2 className="text-xl font-black italic uppercase tracking-tighter">
                        Live <span className="text-yellow-500">Inventory</span>
                    </h2>

                    <p className="text-[10px] font-mono text-white/20 uppercase">
                        Node: Kerala_Hub // Ref: {new Date().toLocaleDateString()}
                    </p>
                </div>

                {/* Search */}

                <div className="flex gap-3 w-full md:w-auto">

                    <div className="relative flex-1">

                        <Search
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20"
                            size={16}
                        />

                        <input
                            type="text"
                            placeholder="QUERY_DATABASE..."
                            className="bg-black border border-white/10 rounded-xl py-2 pl-10 pr-4 text-xs font-mono focus:border-yellow-500/50 outline-none w-full"
                        />

                    </div>

                    <button className="bg-yellow-500 text-black p-2 rounded-xl hover:scale-105 transition-transform">
                        <Plus size={20} strokeWidth={3} />
                    </button>

                </div>

            </div>

            {/* TABLE */}

            <div className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] overflow-hidden">

                <table className="w-full text-left">

                    <thead>
                        <tr className="bg-white/[0.03] text-[9px] font-mono text-white/40 uppercase tracking-[0.3em]">
                            <th className="p-6">Item_Manifest</th>
                            <th className="p-6">Stock_Level</th>
                            <th className="p-6">Valuation</th>
                            <th className="p-6">Condition</th>
                        </tr>
                    </thead>

                    <tbody ref={tableRef} className="text-sm">

                        {loading && (
                            <tr>
                                <td colSpan={4} className="p-10 text-center text-white/40">
                                    Loading Inventory...
                                </td>
                            </tr>
                        )}

                        {!loading && inventory.length === 0 && (
                            <tr>
                                <td colSpan={4} className="p-10 text-center text-white/40">
                                    No Inventory Data
                                </td>
                            </tr>
                        )}

                        {inventory.map((item) => (
                            <tr
                                key={item.id}
                                className="inv-row border-t border-white/5 hover:bg-white/[0.01] transition-colors group"
                            >
                                <td className="p-6">
                                    <div className="flex items-center gap-4">

                                        <div className="p-2 bg-white/5 rounded-lg group-hover:text-yellow-500 transition-colors">
                                            <Package size={18} />
                                        </div>

                                        <div>
                                            <p className="font-bold tracking-tight">{item.name}</p>
                                            <p className="text-[10px] font-mono text-white/20">
                                                {item.id}
                                            </p>
                                        </div>

                                    </div>
                                </td>

                                <td className="p-6 font-mono font-bold">
                                    {item.stock}
                                </td>

                                <td className="p-6 font-mono text-white/60">
                                    ₹{item.price.toLocaleString()}
                                </td>

                                <td className="p-6">

                                    <div
                                        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter border
                    ${item.status === "critical"
                                                ? "bg-red-500/10 border-red-500/20 text-red-500"
                                                : "bg-green-500/10 border-green-500/20 text-green-500"
                                            }`}
                                    >

                                        {item.status === "critical" ? (
                                            <AlertTriangle size={10} />
                                        ) : (
                                            <CheckCircle2 size={10} />
                                        )}

                                        {item.status}

                                    </div>

                                </td>

                            </tr>
                        ))}

                    </tbody>

                </table>

            </div>

            {/* STATS */}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

                <div className="bg-white/[0.02] border border-white/5 p-5 rounded-3xl flex items-center gap-4">

                    <div className="p-3 bg-yellow-500/10 text-yellow-500 rounded-2xl">
                        <Layers size={20} />
                    </div>

                    <div>
                        <p className="text-[9px] font-mono text-white/20 uppercase tracking-widest">
                            Global_Stock
                        </p>

                        <p className="text-xl font-black italic">
                            {inventory.reduce((sum, item) => sum + item.stock, 0)} Units
                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default InventoryPage;