import {
  createCustomerWithPurchase,
  deleteCustomer,
} from "../controllers/customerController.js";
import { verifyToken } from "../middleware/auth.js";

export default async function customerRoutes(fastify, options) {
  fastify.post(
    "/customers",
    { preHandler: verifyToken },
    createCustomerWithPurchase,
  );

  fastify.delete("/customers/:id", { preHandler: verifyToken }, deleteCustomer);
}
