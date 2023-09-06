import { Pet } from "@prisma/client";
import { OrganizationsRepository } from "../repositories/organizations-repository";
import { PetsRepository } from "../repositories/pets-repository";

export interface ListPetsRequest {
  city: string;
  state: string;
}

interface ListPetsResponse {
  pets: Pet[];
}

export class ListPetsUseCase {
  constructor(
    private organizationsRepository: OrganizationsRepository,
    private petsRepository: PetsRepository
  ) {}

  async execute({ city, state }: ListPetsRequest): Promise<ListPetsResponse> {
    const orgs = await this.organizationsRepository.findOrgsByCityState({
      city,
      state,
    });
    const pets = await this.petsRepository.findByOrgs(orgs);

    return { pets };
  }
}
