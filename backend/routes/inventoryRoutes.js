import { createInventory, deleteInventory, getInventory, updateInventory } from "../controllers/inventoryController.js";
import { verifyToken } from "../middleware/auth.js";
import upload from "../middleware/upload.js";

export default async function inventoryRoutes(fastify, options) {
    fastify.post("/createinventory", { preHandler: verifyToken ,upload}, createInventory)
    fastify.patch("/updateinventory", { preHandler: verifyToken }, updateInventory)
    fastify.post("/deleteinventory", { preHandler: verifyToken }, deleteInventory)
    fastify.get("/getinventory", { preHandler: verifyToken }, getInventory)
}