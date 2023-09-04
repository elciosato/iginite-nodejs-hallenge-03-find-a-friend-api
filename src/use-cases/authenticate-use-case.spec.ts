import { beforeEach, describe, expect, it, test } from "vitest";
import { OrganizationsRepository } from "../repositories/organizations-repository";
import { InMemoryOrganizationsRepository } from "../repositories/in-memory/in-memory-organizations-repository";
import { AuthenticateUseCase } from "./authenticate-use-case";
import { hash } from "bcryptjs";
import { OrganizationAlreadyExistsError } from "./errors/organization-already-exists-error";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

let organizationsRepository: OrganizationsRepository;
let sut: AuthenticateUseCase;

describe("Authenticate Organization", () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository();
    sut = new AuthenticateUseCase(organizationsRepository);
  });

  it("should be able to authenticate an organization", async () => {
    await organizationsRepository.create({
      email: "johndoe@example.com",
      passwordHash: await hash("123123", 6),
      responsablePerson: "John Doe",
      address: "address",
      postCode: "12345-123",
      whatsapp: "+99 999999999",
    });

    const { organization } = await sut.execute({
      email: "johndoe@example.com",
      password: "123123",
    });

    expect(organization.id).toEqual(expect.any(String));
  });

  it("should not be able to authenticate with an inexistent organization", async () => {
    expect(async () => {
      await sut.execute({
        email: "inexistent@example.com",
        password: "123123",
      });
    }).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not be able to authenticate with invalid password", async () => {
    await organizationsRepository.create({
      email: "johndoe@example.com",
      passwordHash: await hash("123123", 6),
      responsablePerson: "John Doe",
      address: "address",
      postCode: "12345-123",
      whatsapp: "+99 999999999",
    });

    expect(async () => {
      await sut.execute({
        email: "johndoe@example.com",
        password: "123456",
      });
    }).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
