import { Organization, Prisma } from "@prisma/client";
import { OrganizationsRepository } from "../organizations-repository";
import { randomUUID } from "node:crypto";
import { ListPetsRequest } from "../../use-cases/list-pets-use-case";

export class InMemoryOrganizationsRepository
  implements OrganizationsRepository
{
  public organizationsRepository: Organization[] = [];

  async create(data: Prisma.OrganizationCreateInput) {
    const organization = {
      id: data.id ? data.id : randomUUID(),
      email: data.email,
      passwordHash: data.passwordHash,
      responsablePerson: data.responsablePerson,
      postCode: data.postCode,
      city: data.city,
      state: data.state,
      address: data.address,
      whatsapp: data.whatsapp,
    };

    this.organizationsRepository.push(organization);

    return organization;
  }

  async findByEmail(email: string) {
    const organization = this.organizationsRepository.find(
      (o) => o.email === email
    );

    if (!organization) {
      return null;
    }

    return organization;
  }

  async findById(id: string) {
    const organization = this.organizationsRepository.find((o) => o.id === id);

    if (!organization) {
      return null;
    }

    return organization;
  }

  async findOrgsByCityState({ city, state }: ListPetsRequest) {
    const orgs = this.organizationsRepository.filter((org) => {
      return org.city === city && org.state === state;
    });
    return orgs;
  }
}
