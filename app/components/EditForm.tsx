"use client";

import React, { useEffect, useState } from "react";
import authAxios from "@/app/utils/authAxios";

interface InventoryItem {
  _id: string;
  brand: string;
  model: string;
  size: number;
  vehicleType: string;
  purchasePrice: number;
  sellingPrice: number;
  quantity: number;
  minStock: number;
}

interface Props {
  item: InventoryItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const EditForm: React.FC<Props> = ({ item, isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState<InventoryItem | null>(item);

  useEffect(() => {
    setFormData(item);
  }, [item]);

  if (!isOpen || !formData) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.type === "number"
          ? Number(e.target.value)
          : e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await authAxios.post(
        `/inventory/updateinventory/${formData._id}`,
        formData
      );

      onSuccess();
      onClose();
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-[#0c0c0c] p-8 rounded-2xl w-125 border border-white/10">

        <h2 className="text-xl font-bold text-yellow-500 mb-6">
          Edit Inventory Item
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            className="w-full p-3 bg-black border border-white/10 rounded"
          />

          <input
            name="model"
            value={formData.model}
            onChange={handleChange}
            className="w-full p-3 bg-black border border-white/10 rounded"
          />

          <input
            name="size"
            type="number"
            value={formData.size}
            onChange={handleChange}
            className="w-full p-3 bg-black border border-white/10 rounded"
          />

          <input
            name="vehicleType"
            value={formData.vehicleType}
            onChange={handleChange}
            className="w-full p-3 bg-black border border-white/10 rounded"
          />

          <input
            name="purchasePrice"
            type="number"
            value={formData.purchasePrice}
            onChange={handleChange}
            className="w-full p-3 bg-black border border-white/10 rounded"
          />

          <input
            name="sellingPrice"
            type="number"
            value={formData.sellingPrice}
            onChange={handleChange}
            className="w-full p-3 bg-black border border-white/10 rounded"
          />

          <input
            name="quantity"
            type="number"
            value={formData.quantity}
            onChange={handleChange}
            className="w-full p-3 bg-black border border-white/10 rounded"
          />

          <input
            name="minStock"
            type="number"
            value={formData.minStock}
            onChange={handleChange}
            className="w-full p-3 bg-black border border-white/10 rounded"
          />

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-white/10 rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-yellow-500 text-black rounded font-bold"
            >
              Update
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default EditForm;