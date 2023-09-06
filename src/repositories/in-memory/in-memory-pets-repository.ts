import { Prisma, $Enums, Pet, Organization } from "@prisma/client";
import { PetsRepository } from "../pets-repository";
import { randomUUID } from "crypto";

export class InMemoryPetsRepository implements PetsRepository {
  public petsRepository: Pet[] = [];

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet: Pet = {
      id: data.id ? data.id : randomUUID(),
      name: data.name,
      description: data.description,
      age: data.age,
      size: data.size,
      energyLevel: data.energyLevel,
      independenceLevel: data.independenceLevel,
      physicalSpace: data.physicalSpace,
      availability: data.availability,
      organizationId: data.organizationId,
    };

    this.petsRepository.push(pet);

    return pet;
  }

  async findById(id: string) {
    const pet = this.petsRepository.find((p) => p.id === id);

    if (!pet) {
      return null;
    }

    return pet;
  }

  async findByOrgs(orgs: Organization[]) {
    const pets: Pet[] = [];

    orgs.forEach((o) => {
      const petsByOrgs = this.petsRepository.filter(
        (p) => p.organizationId === o.id && p.availability === "Available"
      );
      pets.push(...petsByOrgs);
    });

    return pets;
  }
}
