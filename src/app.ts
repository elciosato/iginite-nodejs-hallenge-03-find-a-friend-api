import fastify from "fastify";
import fastifyJWT from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";
import { appRoutes } from "./http/app-routes";
import { ZodError } from "zod";
import { env } from "./env";

export const app = fastify();

app.register(fastifyJWT, {
  secret: env.JWT_SECRET,
  cookie: { cookieName: "refreshToken", signed: false },
  sign: {
    expiresIn: "5m",
  },
});
app.register(fastifyCookie);

app.register(appRoutes);

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: "Validation Error",
      issues: error.format(),
    });
  }

  if (env.NODE_ENV !== "production") {
    console.error(error);
  }

  return reply.status(500).send({
    message: "Internal Server Error",
  });
});
