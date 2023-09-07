import { Prisma, $Enums } from "@prisma/client";
import { OrgsFilters, PetsRepository } from "../pets-repository";
import { prisma } from "../../lib/prisma";

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    });

    return pet;
  }

  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    });
    return pet;
  }

  async findByOrgsFilters({
    orgs,
    age,
    size,
    energyLevel,
    independenceLevel,
    physicalSpace,
  }: OrgsFilters) {
    const orgsIds = orgs.map((o) => o.id);
    const pets = prisma.pet.findMany({
      where: {
        AND: [
          { organizationId: { in: orgsIds } },
          { age },
          { size },
          { energyLevel },
          { independenceLevel },
          { physicalSpace },
        ],
      },
    });

    return pets;
  }
}
