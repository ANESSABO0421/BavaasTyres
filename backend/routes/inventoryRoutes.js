import { createInventory, deleteInventory, getInventory, updateInventory } from "../controllers/inventoryController.js";
import { verifyToken } from "../middleware/auth.js";

export default async function inventoryRoutes(fastify, options) {
    fastify.post("/createinventory", { preHandler: verifyToken }, createInventory)
    fastify.post("/updateinventory", { preHandler: verifyToken }, updateInventory)
    fastify.post("/deleteinventory", { preHandler: verifyToken }, deleteInventory)
    fastify.post("/getinventory", { preHandler: verifyToken }, getInventory)
}