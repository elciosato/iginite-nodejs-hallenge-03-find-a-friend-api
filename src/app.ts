import fastify from "fastify";
import { appRoutes } from "./app-routes";

export const app = fastify();

app.register(appRoutes);
