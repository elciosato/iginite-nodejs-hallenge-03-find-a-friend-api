import { beforeEach, describe, expect, it, test } from "vitest";
import { PetsRepository } from "../repositories/pets-repository";
import { CreatePetUseCase } from "./create-pet-use-case";
import { InMemoryPetsRepository } from "../repositories/in-memory/in-memory-pets-repository";
import { OrganizationsRepository } from "../repositories/organizations-repository";
import { InMemoryOrganizationsRepository } from "../repositories/in-memory/in-memory-organizations-repository";
import { hash } from "bcryptjs";

let organizationsRepository: OrganizationsRepository;
let petsRepository: PetsRepository;
let sut: CreatePetUseCase;

describe("Create Pet", () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository();
    petsRepository = new InMemoryPetsRepository();
    sut = new CreatePetUseCase(petsRepository);
  });

  it("should be able to create a pet", async () => {
    const organization = await organizationsRepository.create({
      email: "johndoe@example.com",
      passwordHash: await hash("123123", 6),
      responsablePerson: "John Doe",
      address: "address",
      city: "Curitiba",
      state: "PR",
      postCode: "12345-123",
      whatsapp: "+99 999999999",
    });

    const { pet } = await sut.execute({
      name: "Rex",
      description: "Cute Puppy",
      age: "Newborn",
      size: "Miniature",
      energyLevel: "Average",
      independenceLevel: "Dependent",
      physicalSpace: "Medium",
      availability: "Available",
      organizationId: organization.id,
    });

    expect(pet.id).toEqual(expect.any(String));
  });
});
