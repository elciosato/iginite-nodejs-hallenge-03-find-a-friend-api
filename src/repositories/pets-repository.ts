import { Organization, Pet, Prisma } from "@prisma/client";

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;
  findById(id: string): Promise<Pet | null>;
  findByOrgs(orgs: Organization[]): Promise<Pet[]>;
}
