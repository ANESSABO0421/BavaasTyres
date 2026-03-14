import {
  createOrder,
  getOrders,
  getOrderById,
  deleteOrder,
} from "../controllers/OrderController.js";
import { verifyToken } from "../middleware/auth.js";

export default async function orderRoutes(fastify) {
  // create order
  fastify.post("/orders", { preHandler: verifyToken }, createOrder);

  // get all orders
  fastify.get("/orders", { preHandler: verifyToken }, getOrders);

  // get single order
  fastify.get("/orders/:id", { preHandler: verifyToken }, getOrderById);

  // delete order
  fastify.delete("/orders/:id", { preHandler: verifyToken }, deleteOrder);
}
