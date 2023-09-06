import {
  Age,
  EnergyLevel,
  IndependenceLevel,
  Organization,
  Pet,
  PhysicalSpace,
  Prisma,
  Size,
} from "@prisma/client";

export interface OrgsFilters {
  orgs: Organization[];
  age?: Age;
  size?: Size;
  energyLevel?: EnergyLevel;
  independenceLevel?: IndependenceLevel;
  physicalSpace?: PhysicalSpace;
}

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;
  findById(id: string): Promise<Pet | null>;
  findByOrgsFilters({
    orgs,
    age,
    size,
    energyLevel,
    independenceLevel,
    physicalSpace,
  }: OrgsFilters): Promise<Pet[]>;
}
