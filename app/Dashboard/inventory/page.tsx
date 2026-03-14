"use client";

import React, { useLayoutEffect, useRef, useState, useEffect, useMemo } from "react";
import gsap from "gsap";
import {
  Search,
  Plus,
  Package,
  AlertTriangle,
  CheckCircle2,
  Layers,
  TrendingUp,
  Box,
  X,
  Database,
} from "lucide-react";
import authAxios from "@/app/utils/authAxios";
import AddUnitComponent from "@/app/components/AddUnitComponent";

// --- Types ---
interface InventoryItem {
  brand: string;
  model: string;
  size: number;
  vehicleType: string;
  purchasePrice: number;
  sellingPrice: number;
  quantity: number;
  minStock: number;
}

const InventoryPage: React.FC = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false); 

  /* ---------- DATA FETCH ---------- */
  const fetchInventory = async () => {
    try {
      const resp = await authAxios.get("/inventory/getinventory");
      console.log(resp.data)
      setInventory(resp.data.items);
    } catch (error) {
      console.error("Inventory fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const filteredInventory = useMemo(() => {
    return inventory.filter((item) =>
      `${item.brand} ${item.model}`.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, inventory]);

  /* ---------- GSAP ENTRANCE ---------- */
  useLayoutEffect(() => {
    if (loading) return;
    gsap.fromTo(
      ".inv-card",
      { opacity: 0, y: 20, filter: "blur(10px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6, stagger: 0.05, ease: "expo.out" }
    );
  }, [loading]);

  return (
    <div className="relative min-h-screen text-white p-4 md:p-8 space-y-8 font-sans selection:bg-yellow-500/30 overflow-x-hidden">
      
      {/* --- ADD UNIT DRAWER OVERLAY --- */}
      <AddUnitComponent
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
        onSuccess={fetchInventory} 
      />

      {/* --- TOP HUD --- */}
      <header className="flex flex-col lg:flex-row justify-between items-end lg:items-center gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <div className="h-8 w-1 bg-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.5)]" />
            <h1 className="text-4xl font-black italic tracking-tighter uppercase">
              Inventory <span className="text-yellow-500">OS</span>
            </h1>
          </div>
          <p className="text-[10px] font-mono text-white/40 tracking-[0.2em] flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            SYSTEM_ACTIVE // KERALA_HUB_v2.0
          </p>
        </div>

        <div className="flex items-center gap-4 w-full lg:w-auto">
          <div className="relative flex-grow lg:w-80 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-yellow-500 transition-colors" size={18} />
            <input
              type="text"
              placeholder="SEARCH_RECORDS..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-xs font-mono focus:border-yellow-500/50 focus:bg-white/[0.05] outline-none transition-all"
            />
          </div>
          <button 
            onClick={() => setIsFormOpen(true)}
            className="bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-4 rounded-2xl font-black flex items-center gap-2 transition-all active:scale-95 shadow-[0_0_20px_rgba(234,179,8,0.2)]"
          >
            <Plus size={20} strokeWidth={3} />
            <span className="hidden md:inline text-xs tracking-tighter">ADD_UNIT</span>
          </button>
        </div>
      </header>

      {/* --- STATS --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard label="Total Units" value={inventory.reduce((sum, i) => sum + i.quantity, 0)} icon={<Layers />} color="yellow" />
        <StatCard label="Inventory Value" value={`₹${inventory.reduce((sum, i) => sum + (i.sellingPrice * i.quantity), 0).toLocaleString()}`} icon={<TrendingUp />} color="green" />
        <StatCard label="Critical Alerts" value={inventory.filter(i => i.quantity <= i.minStock).length} icon={<AlertTriangle />} color="red" />
      </div>

      {/* --- TABLE --- */}
      <div className="relative bg-white/[0.02] border border-white/5 rounded-[2rem] backdrop-blur-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-white/5 text-[10px] font-mono text-white/30 uppercase tracking-[0.2em]">
                <th className="px-8 py-6 text-left">Product_ID</th>
                <th className="px-8 py-6 text-left">Specs</th>
                <th className="px-8 py-6 text-left">Stock_Level</th>
                <th className="px-8 py-6 text-left">Unit_Price</th>
                <th className="px-8 py-6 text-right">Operational_Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.03]">
              {loading ? <LoadingSkeleton /> : filteredInventory.map((item, idx) => <InventoryRow key={idx} item={item} />)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};




/* --- Keep the previous StatCard, InventoryRow, and LoadingSkeleton components here --- */
const StatCard = ({ label, value, icon, color }: any) => {
    const colors: any = {
      yellow: "text-yellow-500 bg-yellow-500/10 border-yellow-500/20",
      green: "text-green-500 bg-green-500/10 border-green-500/20",
      red: "text-red-500 bg-red-500/10 border-red-500/20",
    };
  
    return (
      <div className="inv-card bg-white/[0.02] border border-white/5 p-6 rounded-[2rem] flex items-center justify-between group hover:bg-white/[0.04] transition-all">
        <div className="space-y-1">
          <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest">{label}</p>
          <p className="text-2xl font-black tracking-tighter">{value}</p>
        </div>
        <div className={`p-4 rounded-2xl ${colors[color]} group-hover:scale-110 transition-transform`}>
          {React.cloneElement(icon, { size: 24 })}
        </div>
      </div>
    );
  };
  
  const InventoryRow = ({ item }: { item: InventoryItem }) => {
    const isCritical = item.quantity <= item.minStock;
  
    return (
      <tr className="inv-card group hover:bg-white/[0.02] transition-colors">
        <td className="px-8 py-6">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center border border-white/10 group-hover:border-yellow-500/50 transition-colors">
              <Box className="text-white/40 group-hover:text-yellow-500" size={20} />
            </div>
            <div>
              <p className="font-bold text-sm tracking-tight group-hover:text-yellow-500 transition-colors uppercase">
                {item.brand}
              </p>
              <p className="text-[11px] font-mono text-white/40">{item.model}</p>
            </div>
          </div>
        </td>
        <td className="px-8 py-6">
          <span className="text-xs font-mono bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
            R{item.size} / {item.vehicleType}
          </span>
        </td>
        <td className="px-8 py-6">
          <div className="flex flex-col gap-1">
            <span className={`text-sm font-black ${isCritical ? 'text-red-500' : 'text-white'}`}>
              {item.quantity} <span className="text-[10px] text-white/20 font-normal">Units</span>
            </span>
            <div className="w-24 h-1 bg-white/5 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full ${isCritical ? 'bg-red-500' : 'bg-green-500'}`} 
                style={{ width: `${Math.min((item.quantity / (item.minStock * 2)) * 100, 100)}%` }}
              />
            </div>
          </div>
        </td>
        <td className="px-8 py-6 font-mono text-sm">
          ₹{item.sellingPrice.toLocaleString()}
        </td>
        <td className="px-8 py-6 text-right">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all
            ${isCritical 
              ? "bg-red-500/10 border-red-500/20 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.1)]" 
              : "bg-green-500/10 border-green-500/20 text-green-400"
            }`}>
            {isCritical ? <AlertTriangle size={12} /> : <CheckCircle2 size={12} />}
            {isCritical ? "Low_Stock" : "In_Stock"}
          </div>
        </td>
      </tr>
    );
  };
  
  const LoadingSkeleton = () => (
    <>
      {[...Array(5)].map((_, i) => (
        <tr key={i} className="animate-pulse">
          <td colSpan={5} className="p-8"><div className="h-12 bg-white/5 rounded-2xl w-full" /></td>
        </tr>
      ))}
    </>
  );

export default InventoryPage;