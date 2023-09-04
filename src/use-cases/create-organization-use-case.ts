import { Organization } from "@prisma/client";
import { hash } from "bcryptjs";
import { OrganizationsRepository } from "../repositories/organizations-repository";
import { OrganizationAlreadyExistsError } from "./errors/organization-already-exists-error";

interface CreateOrganizationRequest {
  email: string;
  password: string;
  responsablePerson: string;
  postCode: string;
  city: string;
  state: string;
  address: string;
  whatsapp: string;
}

interface CreateOrganizationResponse {
  organization: Organization;
}

export class CreateOrganizationUseCase {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  async execute({
    email,
    password,
    responsablePerson,
    postCode,
    city,
    state,
    address,
    whatsapp,
  }: CreateOrganizationRequest): Promise<CreateOrganizationResponse> {
    const organizationExists = await this.organizationsRepository.findByEmail(
      email
    );

    if (organizationExists) {
      throw new OrganizationAlreadyExistsError();
    }

    const passwordHash = await hash(password, 6);

    const organization = await this.organizationsRepository.create({
      email,
      passwordHash,
      responsablePerson,
      postCode,
      city,
      state,
      address,
      whatsapp,
    });

    return { organization };
  }
}
