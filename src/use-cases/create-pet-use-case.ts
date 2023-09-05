import {
  Age,
  Availability,
  EnergyLevel,
  IndependenceLevel,
  Pet,
  PhysicalSpace,
  Size,
} from "@prisma/client";
import { hash } from "bcryptjs";
import { PetsRepository } from "../repositories/pets-repository";
import { OrganizationAlreadyExistsError } from "./errors/organization-already-exists-error";

interface CreatePetRequest {
  name: string;
  description: string;
  age: Age;
  size: Size;
  energyLevel: EnergyLevel;
  independenceLevel: IndependenceLevel;
  physicalSpace: PhysicalSpace;
  availability: Availability;
  organizationId: string;
}

interface CreatePetResponse {
  pet: Pet;
}

export class CreatePetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    name,
    description,
    age,
    size,
    energyLevel,
    independenceLevel,
    physicalSpace,
    availability,
    organizationId,
  }: CreatePetRequest): Promise<CreatePetResponse> {
    const pet = await this.petsRepository.create({
      name,
      description,
      age,
      size,
      energyLevel,
      independenceLevel,
      physicalSpace,
      availability,
      organizationId,
    });

    return { pet };
  }
}
