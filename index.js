import Fastify from "fastify";
import estudianteRoutes from "./routes/estudiante.route.js";
import authRoutes from "./routes/auth.route.js";
import libretaRoutes from "./routes/libreta.route.js";
import tallerRoutes from "./routes/taller.route.js";
import passwordRoutes from "./routes/password.route.js";
import atrasosRoutes from "./routes/atrasos.route.js";
import asistenciaRoutes from "./routes/asistencia.route.js"
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
  return { hello: "world v1.3.2" };
});

authRoutes.forEach((route) => {
  fastify.route(route);
});

estudianteRoutes.forEach((route) => {
  fastify.route(route);
});

libretaRoutes.forEach((route) => {
  fastify.route(route);
});

tallerRoutes.forEach((route) => {
  fastify.route(route);
});

passwordRoutes.forEach((route) => {
  fastify.route(route);
});

atrasosRoutes.forEach((route) => {
  fastify.route(route);
});

asistenciaRoutes.forEach((route) => {
  fastify.route(route);
});

try {
  fastify.listen({ port: 3500, host: "0.0.0.0" });
  database();
} catch (e) {
  console.log(e);
}
