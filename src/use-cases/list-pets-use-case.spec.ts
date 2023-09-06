import { beforeEach, describe, expect, it, test } from "vitest";
import { PetsRepository } from "../repositories/pets-repository";
import { InMemoryPetsRepository } from "../repositories/in-memory/in-memory-pets-repository";
import { OrganizationsRepository } from "../repositories/organizations-repository";
import { InMemoryOrganizationsRepository } from "../repositories/in-memory/in-memory-organizations-repository";
import { hash } from "bcryptjs";
import { ListPetsUseCase } from "./list-pets-use-case";

let organizationsRepository: OrganizationsRepository;
let petsRepository: PetsRepository;
let sut: ListPetsUseCase;

describe("List Pets", () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository();
    petsRepository = new InMemoryPetsRepository();
    sut = new ListPetsUseCase(organizationsRepository, petsRepository);
  });

  it("should be able to list pets", async () => {
    const organization1 = await organizationsRepository.create({
      email: "johndoe1@example.com",
      passwordHash: await hash("123123", 6),
      responsablePerson: "John Doe",
      address: "address",
      city: "Curitiba",
      state: "PR",
      postCode: "12345-123",
      whatsapp: "+99 999999999",
    });

    await petsRepository.create({
      name: "Rex1",
      description: "Cute Puppy",
      age: "Newborn",
      size: "Miniature",
      energyLevel: "Average",
      independenceLevel: "Dependent",
      physicalSpace: "Medium",
      availability: "Available",
      organizationId: organization1.id,
    });

    const organization2 = await organizationsRepository.create({
      email: "johndoe2@example.com",
      passwordHash: await hash("123123", 6),
      responsablePerson: "John Doe",
      address: "address",
      city: "Curitiba",
      state: "PR",
      postCode: "12345-123",
      whatsapp: "+99 999999999",
    });

    await petsRepository.create({
      name: "Rex2",
      description: "Cute Puppy",
      age: "Newborn",
      size: "Miniature",
      energyLevel: "Average",
      independenceLevel: "Dependent",
      physicalSpace: "Medium",
      availability: "Available",
      organizationId: organization2.id,
    });

    const organization3 = await organizationsRepository.create({
      email: "johndoe3@example.com",
      passwordHash: await hash("123123", 6),
      responsablePerson: "John Doe",
      address: "address",
      city: "Maringa",
      state: "PR",
      postCode: "12345-123",
      whatsapp: "+99 999999999",
    });

    await petsRepository.create({
      name: "Rex3",
      description: "Cute Puppy",
      age: "Newborn",
      size: "Miniature",
      energyLevel: "Average",
      independenceLevel: "Dependent",
      physicalSpace: "Medium",
      availability: "Available",
      organizationId: organization3.id,
    });

    const { pets } = await sut.execute({ city: "Curitiba", state: "PR" });

    expect(pets.length).toEqual(2);
    expect(pets).toEqual([
      expect.objectContaining({ name: "Rex1" }),
      expect.objectContaining({ name: "Rex2" }),
    ]);
  });
});
