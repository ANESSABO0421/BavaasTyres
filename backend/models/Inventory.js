import mongoose from "mongoose";

const InventorySchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    brand: { type: String, required: true },
    model: { type: String, required: true, unique: true },
    size: { type: Number, required: true },
    vehicleType: { type: String, required: true },
    purchasePrice: { type: Number, required: true },
    sellingPrice: { type: Number, required: true },
    quantity: { type: Number, required: true },
    minStock: { type: Number, required: true },
    imageUrl: { type: String },
  },
  { timestamps: true },
  {
    versionKey: false
  }
);

export default mongoose.model("Inventory", InventorySchema);
