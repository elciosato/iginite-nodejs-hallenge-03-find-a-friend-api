import { Pet } from "@prisma/client";
import { PetsRepository } from "../repositories/pets-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { PetNotAvailableError } from "./errors/pet-not-available-error";

interface ShowPetRequest {
  id: string;
}

interface ShowPetResponse {
  pet: Pet;
}

export class ShowPetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({ id }: ShowPetRequest): Promise<ShowPetResponse> {
    const pet = await this.petsRepository.findById(id);

    if (!pet) {
      throw new ResourceNotFoundError();
    } else if (pet.availability !== "Available") {
      throw new PetNotAvailableError();
    }

    return { pet };
  }
}
