import {
  createInventory,
  deleteInventory,
  getInventory,
  getInventoryById,
  updateInventory,
} from "../controllers/inventoryController.js";
import { verifyToken } from "../middleware/auth.js";
import upload from "../middleware/upload.js";

export default async function inventoryRoutes(fastify, options) {
  fastify.post(
    "/createinventory",
    { preHandler: verifyToken, upload },
    createInventory,
  );
  fastify.post(
    "/updateinventory/:id",
    { preHandler: verifyToken,upload },
    updateInventory,
  );
  fastify.post(
    "/deleteinventory/:id",
    { preHandler: verifyToken },
    deleteInventory,
  );
  fastify.get("/getinventory", { preHandler: verifyToken }, getInventory);
  fastify.get(
    "/getInventoryById/:id",
    { preHandler: verifyToken },
    getInventoryById,
  );
}
