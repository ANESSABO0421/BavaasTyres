import Customers from "../models/Customers.js";
import Inventory from "../models/Inventory.js";
import Order from "../models/Order.js";

// create customer and purchase tyres
export const createCustomerWithPurchase = async (request, reply) => {
  try {
    const {
      name,
      phone,
      vehicleNumber,
      vehicleType,
      address,
      items,
      paymentMethod,
    } = request.body;

    if (!name || !phone || !items || items.length === 0) {
      return reply.code(400).send({
        success: false,
        message: "Customer details and items required",
      });
    }

    // create customer
    const customer = await Customers.create({
      name,
      phone,
      vehicleNumber,
      vehicleType,
      address,
    });

    let totalAmount = 0;
    const orderItems = [];

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
          message: `Insufficient stock for ${product.brand}`,
        });
      }

      const price = product.sellingPrice;

      totalAmount += price * item.quantity;

      orderItems.push({
        productId: product._id,
        quantity: item.quantity,
        priceAtSale: price,
      });

      // reduce inventory
      product.quantity -= item.quantity;
      await product.save();
    }

    const order = await Order.create({
      customerId: customer._id,
      items: orderItems,
      totalAmount,
      paymentMethod,
    });

    return reply.code(201).send({
      success: true,
      customer,
      order,
    });
  } catch (error) {
    return reply.code(500).send({
      success: false,
      message: error.message,
    });
  }
};

export const deleteCustomer = async (request, reply) => {
  try {
    const { id } = request.params;

    await Order.deleteMany({ customerId: id });
    await Customers.findByIdAndDelete(id);

    return reply.code(200).send({
      success: true,
      message: "Customer and related orders deleted",
    });
  } catch (error) {
    return reply.code(500).send({
      success: false,
      message: error.message,
    });
  }
};
