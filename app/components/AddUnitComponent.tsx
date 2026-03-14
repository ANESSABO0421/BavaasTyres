"use client";

import React, { useState } from "react";
import {
  X,
  Upload,
  Database,
  Package,
  BadgeIndianRupee,
  Ruler,
} from "lucide-react";
import authAxios from "../utils/authAxios";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface InventoryItem {
  brand: string;
  model: string;
  size: string;
  vehicleType: string;
  purchasePrice: string;
  sellingPrice: string;
  quantity: string;
  minStock: string;
}

const AddUnitComponent = ({ isOpen, onClose, onSuccess }: Props) => {
  const [formData, setFormData] = useState<InventoryItem>({
    brand: "",
    model: "",
    size: "",
    vehicleType: "",
    purchasePrice: "",
    sellingPrice: "",
    quantity: "",
    minStock: "",
  });

  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      console.log("File size:", e.target.files[0].size / 1024, "KB");

      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });
      if (image) data.append("image", image);

      const response = await authAxios.post(
        "/inventory/createinventory",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      onSuccess();
      onClose();
    } catch (error) {
      console.error(error);
      alert("Error creating inventory");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Background Overlay */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden">
        {/* Glow Decor */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-yellow-500/10 blur-[80px] rounded-full" />

        {/* Header */}
        <div className="relative p-8 border-b border-white/5 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-black italic uppercase tracking-tighter flex items-center gap-3">
              <Database className="text-yellow-500" size={24} />
              New <span className="text-yellow-500">Record</span>
            </h2>
            <p className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em] mt-1">
              Kerala_Hub // Inventory_Provisioning
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl text-white/50 hover:text-white transition-all"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Left Column: Core Info */}
            <div className="space-y-4">
              <FormGroup label="Manufacturer" icon={<Package size={14} />}>
                <input
                  name="brand"
                  placeholder="e.g. MRF"
                  value={formData.brand}
                  onChange={handleChange}
                  required
                  className="cyber-input"
                />
              </FormGroup>

              <FormGroup label="Design Variant" icon={<Database size={14} />}>
                <input
                  name="model"
                  placeholder="e.g. ZLX Performance"
                  value={formData.model}
                  onChange={handleChange}
                  required
                  className="cyber-input"
                />
              </FormGroup>

              <div className="grid grid-cols-2 gap-4">
                <FormGroup label="Size (R)" icon={<Ruler size={14} />}>
                  <input
                    name="size"
                    type="number"
                    placeholder="15"
                    value={formData.size}
                    onChange={handleChange}
                    required
                    className="cyber-input"
                  />
                </FormGroup>
                <FormGroup label="Class">
                  <input
                    name="vehicleType"
                    placeholder="SUV/Sedan"
                    value={formData.vehicleType}
                    onChange={handleChange}
                    required
                    className="cyber-input"
                  />
                </FormGroup>
              </div>
            </div>

            {/* Right Column: Numbers */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormGroup
                  label="Purchase"
                  icon={<BadgeIndianRupee size={14} />}
                >
                  <input
                    name="purchasePrice"
                    type="number"
                    placeholder="0.00"
                    value={formData.purchasePrice}
                    onChange={handleChange}
                    required
                    className="cyber-input text-yellow-500/80"
                  />
                </FormGroup>
                <FormGroup
                  label="Selling"
                  icon={<BadgeIndianRupee size={14} />}
                >
                  <input
                    name="sellingPrice"
                    type="number"
                    placeholder="0.00"
                    value={formData.sellingPrice}
                    onChange={handleChange}
                    required
                    className="cyber-input text-green-500/80"
                  />
                </FormGroup>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormGroup label="Initial Stock">
                  <input
                    name="quantity"
                    type="number"
                    placeholder="Qty"
                    value={formData.quantity}
                    onChange={handleChange}
                    required
                    className="cyber-input font-bold"
                  />
                </FormGroup>
                <FormGroup label="Min. Alert">
                  <input
                    name="minStock"
                    type="number"
                    placeholder="Min"
                    value={formData.minStock}
                    onChange={handleChange}
                    required
                    className="cyber-input text-red-400"
                  />
                </FormGroup>
              </div>

              {/* Image Upload Zone */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-white/30 uppercase tracking-widest ml-1">
                  Asset_Image
                </label>
                <label className="relative flex flex-col items-center justify-center w-full h-[88px] border-2 border-dashed border-white/10 hover:border-yellow-500/40 rounded-2xl cursor-pointer bg-white/[0.02] hover:bg-white/[0.04] transition-all group overflow-hidden">
                  {image ? (
                    <span className="text-xs font-mono text-yellow-500">
                      {image.name.slice(0, 20)}...
                    </span>
                  ) : (
                    <>
                      <Upload
                        className="text-white/20 group-hover:text-yellow-500 transition-colors"
                        size={20}
                      />
                      <span className="text-[10px] text-white/40 mt-2 font-mono uppercase tracking-tighter">
                        Click to Upload
                      </span>
                    </>
                  )}
                  <input
                    type="file"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full relative group overflow-hidden bg-yellow-500 disabled:bg-white/10 text-black py-5 rounded-2xl font-black uppercase tracking-[0.3em] text-xs transition-all active:scale-[0.98] shadow-[0_0_30px_rgba(234,179,8,0.2)]"
          >
            <span className="relative z-10 flex items-center justify-center gap-3">
              {loading ? (
                "Encrypting_Record..."
              ) : (
                <>
                  Commit to Database <Database size={16} strokeWidth={3} />
                </>
              )}
            </span>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
          </button>
        </form>
      </div>

      <style jsx>{`
        .cyber-input {
          width: 100%;
          padding: 0.85rem 1rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 1rem;
          font-size: 0.875rem;
          outline: none;
          transition: all 0.2s;
        }
        .cyber-input:focus {
          border-color: rgba(234, 179, 8, 0.5);
          background: rgba(255, 255, 255, 0.05);
          box-shadow: 0 0 15px rgba(234, 179, 8, 0.05);
        }
      `}</style>
    </div>
  );
};

/* Helper Component for Inputs */
const FormGroup = ({
  label,
  icon,
  children,
}: {
  label: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) => (
  <div className="space-y-1.5">
    <label className="text-[10px] font-mono text-white/30 uppercase tracking-widest ml-1 flex items-center gap-2">
      {icon} {label}
    </label>
    {children}
  </div>
);

export default AddUnitComponent;
