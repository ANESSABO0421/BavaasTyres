"use client";

import React, { useLayoutEffect, useState, useEffect, useMemo } from "react";
import gsap from "gsap";
import {
  Search,
  Plus,
  AlertTriangle,
  Layers,
  TrendingUp,
  Image as ImageIcon,
  Edit3,
  Trash2,
  Package,
} from "lucide-react";

import authAxios from "@/app/utils/authAxios";
import AddUnitComponent from "@/app/components/AddUnitComponent";
import EditForm from "@/app/components/EditForm";

// ... (Interface stays the same)
interface InventoryItem {
  _id: string;
  imageUrl: string;
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
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);

  const fetchInventory = async () => {
    try {
      const resp = await authAxios.get("/inventory/getinventory");
      setInventory(resp.data.items);
    } catch (error) {
      console.error("Inventory fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id: string) => {
    if (!window.confirm("ARE_YOU_SURE_YOU_WANT_TO_PURGE_THIS_RECORD?")) return;
    try {
      await authAxios.post(`/inventory/deleteinventory/${id}`);
      fetchInventory();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const filteredInventory = useMemo(() => {
    return inventory.filter((item) =>
      `${item.brand} ${item.model}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery, inventory]);

  useLayoutEffect(() => {
    if (loading) return;
    gsap.fromTo(
      ".inv-card",
      { opacity: 0, y: 30, filter: "blur(12px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.8,
        stagger: 0.08,
        ease: "power4.out",
      },
    );
  }, [loading]);

  const handleEditOpen = (item: InventoryItem) => {
    setEditingItem(item);
    setIsEditOpen(true);
  };

  return (
    <div className="relative min-h-screen text-white p-6 md:p-12 space-y-12 font-sans bg-[#050505]">
      {/* Visual Depth Background */}
      <div className="fixed top-0 right-0 w-200 h-200 bg-yellow-500/2 blur-[150px] rounded-full -z-10 pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-125 h-125 bg-blue-500/2 blur-[120px] rounded-full -z-10 pointer-events-none" />

      {/* Forms */}
      <AddUnitComponent
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSuccess={fetchInventory}
      />
      <EditForm
        item={editingItem}
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSuccess={fetchInventory}
      />

      {/* --- HEADER --- */}
      <header className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-8">
        <div>
          <h1 className="text-6xl font-black italic uppercase tracking-tighter leading-none">
            Stock{" "}
            <span className="text-yellow-500 underline decoration-1 underline-offset-8">
              Engine
            </span>
          </h1>
          <p className="text-[10px] font-mono text-white/30 tracking-[0.4em] uppercase mt-4">
            Terminal_Active // Port: {inventory.length}_Units_Detected
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full xl:w-auto">
          <div className="relative w-full sm:w-96 group">
            <Search
              className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-yellow-500 transition-colors"
              size={18}
            />
            <input
              type="text"
              placeholder="SEARCH_MANIFEST..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/3 border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-xs outline-none focus:border-yellow-500/40 focus:bg-white/5 transition-all"
            />
          </div>

          <button
            onClick={() => setIsFormOpen(true)}
            className="w-full sm:w-auto bg-yellow-500 text-black px-8 py-5 rounded-2xl font-black flex items-center justify-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-[0_20px_40px_-10px_rgba(234,179,8,0.3)]"
          >
            <Plus size={20} strokeWidth={3} />
            DEPLOY_UNIT
          </button>
        </div>
      </header>

      {/* --- STATS GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          label="Global Inventory"
          value={inventory.reduce((sum, i) => sum + i.quantity, 0)}
          sub="Units in stock"
          icon={<Layers className="text-yellow-500/50" />}
        />
        <StatCard
          label="Total Valuation"
          value={`₹${inventory.reduce((sum, i) => sum + i.sellingPrice * i.quantity, 0).toLocaleString()}`}
          sub="Current Liquid Assets"
          icon={<TrendingUp className="text-green-500/50" />}
        />
        <StatCard
          label="System Alerts"
          value={inventory.filter((i) => i.quantity <= i.minStock).length}
          sub="Low stock detected"
          icon={<AlertTriangle className="text-red-500/50" />}
        />
      </div>

      {/* --- DATA TABLE --- */}
      <div className="bg-white/2 border border-white/5 rounded-[2.5rem] overflow-hidden backdrop-blur-3xl shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-white/3 text-[10px] text-white/40 uppercase font-mono tracking-[0.3em]">
                <th className="px-8 py-6 text-left">Product_Meta</th>
                <th className="px-8 py-6 text-left">Specification</th>
                <th className="px-8 py-6 text-left">Stock_Level</th>
                <th className="px-8 py-6 text-left">Valuation</th>
                <th className="px-8 py-6 text-center">Status</th>
                <th className="px-8 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <LoadingSkeleton />
              ) : (
                filteredInventory.map((item) => (
                  <InventoryRow
                    key={item._id}
                    item={item}
                    onDelete={deleteItem}
                    onEdit={handleEditOpen}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

/* --- SUB-COMPONENTS --- */

const StatCard = ({ label, value, icon, sub }: any) => (
  <div className="inv-card group bg-white/2 border border-white/5 p-8 rounded-[2.5rem] flex justify-between items-start hover:bg-white/4 hover:border-white/10 transition-all duration-500">
    <div className="space-y-2">
      <p className="text-[10px] font-mono uppercase tracking-widest text-white/30">
        {label}
      </p>
      <p className="text-4xl font-black tracking-tighter italic">{value}</p>
      <p className="text-[9px] font-mono text-white/20 uppercase">{sub}</p>
    </div>
    <div className="p-4 bg-black/40 rounded-2xl group-hover:scale-110 transition-transform">
      {icon}
    </div>
  </div>
);

const InventoryRow = ({ item, onDelete, onEdit }: any) => {
  const isCritical = item.quantity <= item.minStock;

  return (
    <tr className="inv-card group hover:bg-white/2 transition-colors">
      <td className="px-8 py-6">
        <div className="flex items-center gap-6">
          <div className="relative w-16 h-16 bg-black rounded-2xl overflow-hidden border border-white/5 group-hover:border-yellow-500/30 transition-all">
            {item.imageUrl ? (
              <img
                src={item.imageUrl}
                className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white/10">
                <ImageIcon size={24} />
              </div>
            )}
          </div>
          <div>
            <p className="font-black text-lg tracking-tight uppercase italic leading-tight">
              {item.brand}
            </p>
            <p className="text-[10px] font-mono text-white/30 uppercase">
              {item.model}
            </p>
          </div>
        </div>
      </td>

      <td className="px-8 py-6">
        <div className="flex items-center gap-2">
          <span className="px-2 py-1 bg-white/5 rounded text-[10px] font-bold text-white/60 uppercase">
            R{item.size}
          </span>
          <span className="px-2 py-1 bg-white/5 rounded text-[10px] font-bold text-white/60 uppercase">
            {item.vehicleType}
          </span>
        </div>
      </td>

      <td className="px-8 py-6 font-mono font-bold text-sm">
        {item.quantity} <span className="text-[10px] text-white/20">Units</span>
      </td>

      <td className="px-8 py-6">
        <p className="font-black text-yellow-500/80">
          ₹{item.sellingPrice.toLocaleString()}
        </p>
      </td>

      <td className="px-8 py-6">
        <div className="flex justify-center">
          <span
            className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${
              isCritical
                ? "bg-red-500/10 border-red-500/20 text-red-500"
                : "bg-green-500/10 border-green-500/20 text-green-500"
            }`}
          >
            {isCritical ? "Low_Stock_Alert" : "Stable_Output"}
          </span>
        </div>
      </td>

      <td className="px-8 py-6">
        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100  translate-x-4 group-hover:translate-x-0 transition-all">
          <button
            onClick={() => onEdit(item)}
            className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-white/40 hover:text-white transition-all"
          >
            <Edit3 size={16} />
          </button>
          <button
            onClick={() => onDelete(item._id)}
            className="p-3 bg-red-600/10 hover:bg-red-600 rounded-xl text-red-500 hover:text-white transition-all"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
};

const LoadingSkeleton = () => (
  <>
    {[...Array(5)].map((_, i) => (
      <tr key={i} className="animate-pulse">
        <td colSpan={6} className="px-10 py-10">
          <div className="h-16 bg-white/3 rounded-3xl" />
        </td>
      </tr>
    ))}
  </>
);

export default InventoryPage;
