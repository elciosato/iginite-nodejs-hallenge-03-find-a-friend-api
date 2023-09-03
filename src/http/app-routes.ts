import { FastifyInstance } from "fastify";
import { createOrganizationController } from "./controllers/create-organization-controller";

export async function appRoutes(app: FastifyInstance) {
  app.get("/organizations", createOrganizationController);
}
