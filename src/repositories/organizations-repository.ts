import { Organization, Pet, Prisma } from "@prisma/client";
import { ListPetsRequest } from "../use-cases/list-pets-use-case";

export interface OrganizationsRepository {
  create(data: Prisma.OrganizationCreateInput): Promise<Organization>;
  findByEmail(email: string): Promise<Organization | null>;
  findById(id: string): Promise<Organization | null>;
  findOrgsByCityState({
    city,
    state,
  }: ListPetsRequest): Promise<Organization[]>;
}
