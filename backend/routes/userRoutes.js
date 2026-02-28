import { createUser } from "../controllers/userController.js";

export default async function userRoutes(fastify, options) {
  fastify.post("/", createUser);
}
