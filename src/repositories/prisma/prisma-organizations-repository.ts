import { Prisma } from "@prisma/client";
import { ListPetsRequest } from "../../use-cases/list-pets-use-case";
import { OrganizationsRepository } from "../organizations-repository";
import { prisma } from "../../lib/prisma";

export class PrismaOrganizationsRepository implements OrganizationsRepository {
  async create(data: Prisma.OrganizationCreateInput) {
    const organization = await prisma.organization.create({
      data,
    });

    return organization;
  }

  async findByEmail(email: string) {
    const organization = await prisma.organization.findUnique({
      where: {
        email,
      },
    });

    return organization;
  }

  async findById(id: string) {
    const organization = await prisma.organization.findUnique({
      where: {
        id,
      },
    });

    return organization;
  }

  async findOrgsByCityState({ city, state }: ListPetsRequest) {
    const orgs = await prisma.organization.findMany({
      where: {
        city,
        state,
      },
    });

    return orgs;
  }
}
