import { createUser, loginUser } from "../controllers/userController.js";

export default async function userRoutes(fastify, options) {
  fastify.post("/createuser", createUser);
  fastify.post("/login", loginUser)
}
