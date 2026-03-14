import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    vehicleNumber: {
      type: String,
    },

    vehicleType: {
      type: String,
      enum: ["Car", "Bike", "Truck", "Other"],
      default: "Car",
    },

    address: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Customers", customerSchema);
