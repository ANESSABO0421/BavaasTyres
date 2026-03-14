import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Inventory",
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
});

const orderSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true
  },
  items: [orderItemSchema],
  totalAmount: {
    type: Number
  },
  paymentMethod: {
    type: String,
    default: "Cash"
  }
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);