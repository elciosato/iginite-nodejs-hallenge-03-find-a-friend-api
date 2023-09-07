import { FastifyInstance } from "fastify";
import { createOrganizationController } from "./controllers/create-organization-controller";
import { authenticateController } from "./controllers/authenticate-controller";
import { refreshController } from "./controllers/refresh-controller";
import { createPetController } from "./controllers/create-pet-controller";
import { verifyJwt } from "../middlewares/verify-jwt";

export async function appRoutes(app: FastifyInstance) {
  app.post("/organizations", createOrganizationController);
  app.post("/sessions", authenticateController);
  app.patch("/refresh/token", refreshController);

  app.post("/pets", { onRequest: [verifyJwt] }, createPetController);
  app.get("/pets", { onRequest: [verifyJwt] }, (request) => {
    return request.user;
  });
}
