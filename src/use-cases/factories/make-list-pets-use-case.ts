import { PrismaOrganizationsRepository } from "../../repositories/prisma/prisma-organizations-repository";
import { PrismaPetsRepository } from "../../repositories/prisma/prisma-pets-repository";
import { ListPetsUseCase } from "../list-pets-use-case";

export function makeListPetsUseCase() {
  const organizationsRepository = new PrismaOrganizationsRepository();
  const petsRepository = new PrismaPetsRepository();
  const useCase = new ListPetsUseCase(organizationsRepository, petsRepository);

  return useCase;
}
