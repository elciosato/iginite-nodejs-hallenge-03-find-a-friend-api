import { FastifyInstance } from "fastify";
import { createOrganizationController } from "./controllers/create-organization-controller";
import { authenticateController } from "./controllers/authenticate-controller";
import { refreshController } from "./controllers/refresh-controller";
import { createPetController } from "./controllers/create-pet-controller";
import { verifyJwt } from "../middlewares/verify-jwt";
import { showPetController } from "./controllers/show-pet-controller";
import { listPetsController } from "./controllers/list-pets-controller";

export async function appRoutes(app: FastifyInstance) {
  app.post("/organizations", createOrganizationController);
  app.post("/sessions", authenticateController);
  app.patch("/refresh/token", refreshController);

  app.post("/pets", { onRequest: [verifyJwt] }, createPetController);
  app.get("/pets/:id", showPetController);
  app.get("/pets", listPetsController);
}
