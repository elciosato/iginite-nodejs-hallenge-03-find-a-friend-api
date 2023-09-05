import { beforeEach, describe, expect, it, test } from "vitest";
import { PetsRepository } from "../repositories/pets-repository";
import { InMemoryPetsRepository } from "../repositories/in-memory/in-memory-pets-repository";
import { OrganizationsRepository } from "../repositories/organizations-repository";
import { InMemoryOrganizationsRepository } from "../repositories/in-memory/in-memory-organizations-repository";
import { hash } from "bcryptjs";
import { ShowPetUseCase } from "./show-pet-use-case";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { PetNotAvailableError } from "./errors/pet-not-available-error";

let organizationsRepository: OrganizationsRepository;
let petsRepository: PetsRepository;
let sut: ShowPetUseCase;

describe("Show Pet", () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository();
    petsRepository = new InMemoryPetsRepository();
    sut = new ShowPetUseCase(petsRepository);
  });

  it("should be able to show a pet", async () => {
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

    const newPet = await petsRepository.create({
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

    const { pet } = await sut.execute({ id: newPet.id });

    expect(pet.id).toEqual(expect.any(String));
  });

  it("should not be able to show a pet with invalid ID", async () => {
    expect(async () => {
      await sut.execute({ id: "invalid ID" });
    }).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  it("should not be able to show an unavailable pet", async () => {
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

    const newPet = await petsRepository.create({
      name: "Rex",
      description: "Cute Puppy",
      age: "Newborn",
      size: "Miniature",
      energyLevel: "Average",
      independenceLevel: "Dependent",
      physicalSpace: "Medium",
      availability: "Unavailable",
      organizationId: organization.id,
    });

    expect(async () => {
      await sut.execute({ id: newPet.id });
    }).rejects.toBeInstanceOf(PetNotAvailableError);
  });
});
