import { Organization, Prisma } from "@prisma/client";
import { OrganizationsRepository } from "../organizations-repository";
import { randomUUID } from "node:crypto";

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
}
