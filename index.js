import Fastify from "fastify";
import estudianteRoutes from "./routes/estudiante.route.js";
import authRoutes from "./routes/auth.route.js";
import cors from "@fastify/cors";
import db from "./config/db.js";
import "dotenv/config";

const fastify = Fastify({ logger: true });
await fastify.register(cors, {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
});

async function database() {
  try {
    await db.sync();
    console.log("Database connected");
  } catch (e) {
    console.log(e);
  }
}

fastify.get("/", async (request, reply) => {
  return { hello: "world" };
});

estudianteRoutes.forEach((route) => {
  fastify.route(route);
});
authRoutes.forEach((route) => {
  fastify.route(route);
});

try {
  fastify.listen({ port: 3500 });
  database();
} catch (e) {
  console.log(e);
}
