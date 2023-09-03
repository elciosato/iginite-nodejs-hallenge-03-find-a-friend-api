import { beforeEach, describe, expect, it, test } from "vitest";
import request from "supertest";
import { OrganizationsRepository } from "../repositories/organizations-repository";
import { CreateOrganizationUseCase } from "./create-organization-use-case";
import { InMemoryOrganizationsRepository } from "../repositories/in-memory/in-memory-organizations-repository";
import { compare } from "bcryptjs";
import { OrganizationAlreadyExistsError } from "./errors/organization-already-exists-error";

let organizationsRepository: OrganizationsRepository;
let sut: CreateOrganizationUseCase;

describe("Create Organization", () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository();
    sut = new CreateOrganizationUseCase(organizationsRepository);
  });

  it("should be able to create an organization", async () => {
    const { organization } = await sut.execute({
      email: "johndoe@example.com",
      password: "123123",
      responsablePerson: "John Doe",
      address: "address",
      postCode: "12345-123",
      whatsapp: "+99 999999999",
    });

    expect(organization.id).toEqual(expect.any(String));
  });

  it("should hash organization password upon create", async () => {
    const { organization } = await sut.execute({
      email: "johndoe@example.com",
      password: "123123",
      responsablePerson: "John Doe",
      address: "address",
      postCode: "12345-123",
      whatsapp: "+99 999999999",
    });

    const isPasswordHashed = await compare("123123", organization.passwordHash);

    expect(isPasswordHashed).toBe(true);
  });

  it("should not be able to create an organization with the same email", async () => {
    const email = "johndoe@example.com";

    await sut.execute({
      email,
      password: "123123",
      responsablePerson: "John Doe",
      address: "address",
      postCode: "12345-123",
      whatsapp: "+99 999999999",
    });

    expect(async () => {
      await sut.execute({
        email,
        password: "123123",
        responsablePerson: "John Doe",
        address: "address",
        postCode: "12345-123",
        whatsapp: "+99 999999999",
      });
    }).rejects.toBeInstanceOf(OrganizationAlreadyExistsError);
  });
});
