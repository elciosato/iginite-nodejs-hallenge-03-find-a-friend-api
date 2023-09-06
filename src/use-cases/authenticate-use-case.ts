import { Organization } from "@prisma/client";
import { compare, hash } from "bcryptjs";
import { OrganizationsRepository } from "../repositories/organizations-repository";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

interface AuthenticateRequest {
  email: string;
  password: string;
}

interface AuthenticateResponse {
  organization: Organization;
}

export class AuthenticateUseCase {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateRequest): Promise<AuthenticateResponse> {
    const organization = await this.organizationsRepository.findByEmail(email);

    if (!organization) {
      throw new InvalidCredentialsError();
    }

    const isPasswordMatched = await compare(
      password,
      organization.passwordHash
    );

    if (!isPasswordMatched) {
      throw new InvalidCredentialsError();
    }

    return { organization };
  }
}
