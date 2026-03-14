import {
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
} from "../controllers/customerController.js";
import { verifyToken } from "../middleware/auth.js";

export default async function customerRoutes(fastify, options) {
  fastify.post("/customers", { preHandler: verifyToken }, createCustomer);

  fastify.get("/customers", { preHandler: verifyToken }, getCustomers);

  fastify.get("/customers/:id", { preHandler: verifyToken }, getCustomerById);

  fastify.put("/customers/:id", { preHandler: verifyToken }, updateCustomer);

  fastify.delete("/customers/:id", { preHandler: verifyToken }, deleteCustomer);
}
