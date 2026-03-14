import Orders from "../models/Orders.js";
import Inventory from "../models/Inventory.js";

// create order
export const createOrder = async (request, reply) => {
  try {
    const { customerId, items, paymentMethod } = request.body;

    if (!customerId || !items || items.length === 0) {
      return reply.code(400).send({
        success: false,
        message: "Customer and items are required",
      });
    }

    let totalAmount = 0;

    for (const item of items) {
      const product = await Inventory.findById(item.productId);

      if (!product) {
        return reply.code(404).send({
          success: false,
          message: "Inventory item not found",
        });
      }

      if (product.quantity < item.quantity) {
        return reply.code(400).send({
          success: false,
          message: `Not enough stock for ${product.brand}`,
        });
      }

      const itemTotal = product.sellingPrice * item.quantity;

      totalAmount += itemTotal;

      // reduce inventory stock
      product.quantity -= item.quantity;

      await product.save();
    }

    const order = await Orders.create({
      customerId,
      items,
      totalAmount,
      paymentMethod,
    });

    return reply.code(201).send({
      success: true,
      order,
    });
  } catch (error) {
    return reply.code(500).send({
      success: false,
      message: error.message,
    });
  }
};

// get all orders
export const getOrders = async (request, reply) => {
  try {
    const orders = await Orders.find()
      .populate("customerId")
      .populate("items.productId");

    return reply.code(200).send({
      success: true,
      orders,
    });
  } catch (error) {
    return reply.code(500).send({
      success: false,
      message: error.message,
    });
  }
};

// get single order
export const getOrderById = async (request, reply) => {
  try {
    const { id } = request.params;

    const order = await Orders.findById(id)
      .populate("customerId")
      .populate("items.productId");

    if (!order) {
      return reply.code(404).send({
        success: false,
        message: "Order not found",
      });
    }

    return reply.code(200).send({
      success: true,
      order,
    });
  } catch (error) {
    return reply.code(500).send({
      success: false,
      message: error.message,
    });
  }
};

// delete order
export const deleteOrder = async (request, reply) => {
  try {
    const { id } = request.params;

    await Orders.findByIdAndDelete(id);

    return reply.code(200).send({
      success: true,
      message: "Order deleted",
    });
  } catch (error) {
    return reply.code(500).send({
      success: false,
      message: error.message,
    });
  }
};
