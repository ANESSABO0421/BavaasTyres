import Inventory from "../models/Inventory.js";
import createRandomId from "../utils/createRandomId.js";
import { uploadToCloudinary } from "../utils/uploadToCloudinary.js";

export const createInventory = async (request, reply) => {
  try {
    const parts = request.parts();

    let imageUrl = "";
    const fields = {};

    for await (const part of parts) {
      if (part.type === "file" && part.fieldname === "image") {
        imageUrl = await uploadToCloudinary(part.file);
      }

      if (part.type === "field") {
        fields[part.fieldname] = part.value;
      }
    }

    const {
      brand,
      model,
      size,
      vehicleType,
      purchasePrice,
      sellingPrice,
      quantity,
      minStock,
    } = fields;

    const item = await Inventory.create({
      _id: createRandomId("INV"),
      brand,
      model,
      size: Number(size),
      vehicleType,
      purchasePrice: Number(purchasePrice),
      sellingPrice: Number(sellingPrice),
      quantity: Number(quantity),
      minStock: Number(minStock),
      imageUrl: imageUrl || "",
    });

    return reply.code(201).send({
      success: true,
      item,
    });
  } catch (error) {
    return reply.code(500).send({
      success: false,
      message: error.message,
    });
  }
};
// get inventory
export const getInventory = async (request, reply) => {
  try {
    const items = await Inventory.find();

    return reply.code(200).send({
      success: true,
      items,
    });
  } catch (error) {
    return reply.code(500).send({
      success: false,
      message: error.message,
    });
  }
};

// update inventory
export const updateInventory = async (request, reply) => {
  try {
    const { id } = request.params;

    const updated = await Inventory.findByIdAndUpdate(id, request.body, {
      new: true,
    });

    return reply.code(200).send({
      success: true,
      updated,
    });
  } catch (error) {
    return reply.code(500).send({
      success: false,
      message: error.message,
    });
  }
};

// delete inventory
export const deleteInventory = async (request, reply) => {
  try {
    const { id } = request.params;

    await Inventory.findByIdAndDelete(id);

    return reply.code(200).send({
      success: true,
      message: "Item deleted",
    });
  } catch (error) {
    return reply.code(500).send({
      success: false,
      message: error.message,
    });
  }
};



export const getInventoryById = async (request, reply) => {
  try {
    const { id } = request.params;

    const item = await Inventory.findById(id);

    if (!item) {
      return reply.code(404).send({
        success: false,
        message: "Inventory item not found",
      });
    }

    return reply.code(200).send({
      success: true,
      item,
    });

  } catch (error) {
    return reply.code(500).send({
      success: false,
      message: error.message,
    });
  }
};