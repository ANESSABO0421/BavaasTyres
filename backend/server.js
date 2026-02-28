import Fastify from "fastify";
import dotenv from "dotenv";
import cors from "@fastify/cors";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const fastify = Fastify({ logger: true });

const port = process.env.PORT || 5000;

// Register CORS
fastify.register(cors, { origin: true });

// api
fastify.register(userRoutes, { prefix: "/api/users" });

// Global Error Handler
fastify.setErrorHandler((error, request, reply) => {
  fastify.log.error(error);
  reply.status(500).send({
    success: false,
    message: error.message,
  });
});

connectDB()
  .then(() => {
    console.log("✅ MongoDB connected successfully");

    fastify.listen({ port: port, host: "0.0.0.0" }, (err, address) => {
      if (err) {
        fastify.log.error(err);
        process.exit(1);
      }

      console.log(`🚀 Server running at ${address}`);
    });
  })
  .catch((error) => {
    console.error("❌ Failed to start server:", error.message);
    process.exit(1);
  });
