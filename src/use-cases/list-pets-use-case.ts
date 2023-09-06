import {
  Age,
  EnergyLevel,
  IndependenceLevel,
  Pet,
  PhysicalSpace,
  Size,
} from "@prisma/client";
import { OrganizationsRepository } from "../repositories/organizations-repository";
import { PetsRepository } from "../repositories/pets-repository";

export interface ListPetsRequest {
  city: string;
  state: string;
  age?: Age;
  size?: Size;
  energyLevel?: EnergyLevel;
  independenceLevel?: IndependenceLevel;
  physicalSpace?: PhysicalSpace;
}

interface ListPetsResponse {
  pets: Pet[];
}

export class ListPetsUseCase {
  constructor(
    private organizationsRepository: OrganizationsRepository,
    private petsRepository: PetsRepository
  ) {}

  async execute({
    city,
    state,
    age,
    size,
    energyLevel,
    independenceLevel,
    physicalSpace,
  }: ListPetsRequest): Promise<ListPetsResponse> {
    const orgs = await this.organizationsRepository.findOrgsByCityState({
      city,
      state,
    });
    const pets = await this.petsRepository.findByOrgsFilters({
      orgs,
      age,
      size,
      energyLevel,
      independenceLevel,
      physicalSpace,
    });

    return { pets };
  }
}
