import { PrismaOrganizationsRepository } from "../../repositories/prisma/prisma-organizations-repository";
import { AuthenticateUseCase } from "../authenticate-use-case";

export function makeAuthenticateUseCase() {
  const organizationsRepository = new PrismaOrganizationsRepository();
  const useCase = new AuthenticateUseCase(organizationsRepository);

  return useCase;
}
