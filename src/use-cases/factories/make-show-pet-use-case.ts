import { PrismaPetsRepository } from "../../repositories/prisma/prisma-pets-repository";
import { ShowPetUseCase } from "../show-pet-use-case";

export function makeShowPetUseCase() {
  const petsRepository = new PrismaPetsRepository();
  const useCase = new ShowPetUseCase(petsRepository);

  return useCase;
}
