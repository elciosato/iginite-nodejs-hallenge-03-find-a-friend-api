import { FastifyInstance } from "fastify";
import { createOrganizationController } from "./controllers/create-organization-controller";
import { authenticateController } from "./controllers/authenticate-controller";

export async function appRoutes(app: FastifyInstance) {
  app.post("/organizations", createOrganizationController);
  app.post("/sessions", authenticateController);
}
