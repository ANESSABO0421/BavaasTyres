import Inventory from "../models/Inventory.js";
import createRandomId from "../utils/createRandomId.js";
import cloudinary from "../utils/cloudinary.js";

export const createInventory = async (request, reply) => {
  try {
    const parts = request.parts();

    let imageUrl = "";
    const fields = {};

    for await (const part of parts) {
      if (part.type === "file" && part.fieldname === "imageUrl") {
        const uploadResult = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "inventory" },
            (error, result) => {
              if (error) return reject(error);
              resolve(result);
            },
          );

          part.file.pipe(stream);
        });

        imageUrl = uploadResult.secure_url;
      } else {
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

    if (!brand || !model || !size || !vehicleType) {
      return reply.code(400).send({
        success: false,
        message: "Required fields missing",
      });
    }

    console.log(imageUrl);

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
    });

    if (imageUrl) {
      await Inventory.updateOne(
        { _id: item._id },
        {
          $addToSet: {
            imageUrl: imageUrl,
          },
        },
      );
    }

    return reply.code(201).send({
      success: true,
      item: item,
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
