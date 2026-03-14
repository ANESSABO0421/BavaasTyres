"use client";

import React, { useState } from "react";
import imageCompression from "browser-image-compression";
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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      console.log("Original file size:", file.size / 1024, "KB");

      try {
        const compressedFile = await imageCompression(file, {
          maxSizeMB: 1, // Max size in MB
          maxWidthOrHeight: 1920, // Max width/height
          useWebWorker: true,
        });
        console.log("Compressed file size:", compressedFile.size / 1024, "KB");
        setImage(compressedFile);
      } catch (error) {
        console.error("Image compression failed:", error);
        setImage(file); // Fallback to original
      }
    }
  };

  const submitForm = async () => {
  try {
    const data = new FormData();

    data.append("brand", formData.brand);
    data.append("model", formData.model);
    data.append("size", formData.size);
    data.append("vehicleType", formData.vehicleType);
    data.append("purchasePrice", formData.purchasePrice);
    data.append("sellingPrice", formData.sellingPrice);
    data.append("quantity", formData.quantity);
    data.append("minStock", formData.minStock);

    if (image) {
      data.append("image", image);
    }

    await authAxios.post("/inventory/createinventory", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

  } catch (err) {
    console.log(err);
  }
};

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">

      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] overflow-hidden">

        {/* Header */}
        <div className="p-8 border-b border-white/10 flex justify-between items-center">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Database className="text-yellow-500" size={20} />
            New Record
          </h2>

          <button onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-8 space-y-6">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <input
              name="brand"
              placeholder="Brand"
              value={formData.brand}
              onChange={handleChange}
              className="cyber-input"
            />

            <input
              name="model"
              placeholder="Model"
              value={formData.model}
              onChange={handleChange}
              className="cyber-input"
            />

            <input
              name="size"
              placeholder="Size"
              value={formData.size}
              onChange={handleChange}
              className="cyber-input"
            />

            <input
              name="vehicleType"
              placeholder="Vehicle Type"
              value={formData.vehicleType}
              onChange={handleChange}
              className="cyber-input"
            />

            <input
              name="purchasePrice"
              placeholder="Purchase Price"
              value={formData.purchasePrice}
              onChange={handleChange}
              className="cyber-input"
            />

            <input
              name="sellingPrice"
              placeholder="Selling Price"
              value={formData.sellingPrice}
              onChange={handleChange}
              className="cyber-input"
            />

            <input
              name="quantity"
              placeholder="Quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="cyber-input"
            />

            <input
              name="minStock"
              placeholder="Min Stock"
              value={formData.minStock}
              onChange={handleChange}
              className="cyber-input"
            />

          </div>

          {/* Image Upload */}
          <label className="flex flex-col items-center justify-center border border-dashed border-white/20 rounded-xl p-6 cursor-pointer">
            {image ? (
              <span className="text-sm">{image.name}</span>
            ) : (
              <>
                <Upload size={20} />
                <span className="text-xs mt-2">Upload Image</span>
              </>
            )}
            <input
              type="file"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>

          {/* Submit button (no logic) */}
          <button 
            onClick={submitForm} 
            disabled={loading}
            className="w-full bg-yellow-500 text-black py-3 rounded-xl font-bold disabled:opacity-50"
          >
            {loading ? "Adding..." : "Add Unit"}
          </button>

        </div>
      </div>

      <style jsx>{`
        .cyber-input {
          width: 100%;
          padding: 0.8rem;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          outline: none;
        }
      `}</style>

    </div>
  );
};

export default AddUnitComponent;
