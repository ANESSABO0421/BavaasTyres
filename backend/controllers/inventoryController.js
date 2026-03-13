import Inventory from "../models/Inventory.js";
import createRandomId from "../utils/createRandomId.js"

export const createInventory = async (request, reply) => {
    try {
        const { brand, model, size, vehicleType, purchasePrice, sellingPrice, quantity, minStock } = request.body;

        if (!brand || !model || !size || !vehicleType) {
            return reply.code(400).send({
                success: false,
                message: "Required fields missing"
            });
        }

        const item = await Inventory.create({
            _id:createRandomId("INV"),
            brand,
            model,
            size,
            vehicleType,
            purchasePrice,
            sellingPrice,
            quantity,
            minStock
        });

        return reply.code(201).send({
            success: true,
            item
        });

    } catch (error) {
        return reply.code(500).send({
            success: false,
            message: error.message
        });
    }
};


// get inventory
export const getInventory = async (request, reply) => {
    try {

        const items = await Inventory.find();

        return reply.code(200).send({
            success: true,
            items
        });

    } catch (error) {
        return reply.code(500).send({
            success: false,
            message: error.message
        });
    }
};


// update inventory
export const updateInventory = async (request, reply) => {
    try {

        const { id } = request.params;

        const updated = await Inventory.findByIdAndUpdate(
            id,
            request.body,
            { new: true }
        );

        return reply.code(200).send({
            success: true,
            updated
        });

    } catch (error) {
        return reply.code(500).send({
            success: false,
            message: error.message
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
            message: "Item deleted"
        });

    } catch (error) {
        return reply.code(500).send({
            success: false,
            message: error.message
        });
    }
};