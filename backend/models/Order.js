import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  productId: {
    type: String, // changed
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  priceAtSale: {   // better name
    type: Number,
    required: true
  }
});

const orderSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customers", // match your model name
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

export default mongoose.model("Orders", orderSchema);