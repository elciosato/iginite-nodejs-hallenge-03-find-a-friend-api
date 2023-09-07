import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeCreatePetUseCase } from "../../use-cases/factories/make-create-pet-use-case";
import {
  Age,
  Availability,
  EnergyLevel,
  IndependenceLevel,
  PhysicalSpace,
  Size,
} from "@prisma/client";

export async function createPetController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const petBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    age: z.nativeEnum(Age),
    size: z.nativeEnum(Size),
    energyLevel: z.nativeEnum(EnergyLevel),
    independenceLevel: z.nativeEnum(IndependenceLevel),
    physicalSpace: z.nativeEnum(PhysicalSpace),
    availability: z.nativeEnum(Availability),
  });

  const {
    name,
    description,
    age,
    size,
    energyLevel,
    independenceLevel,
    physicalSpace,
    availability,
  } = petBodySchema.parse(request.body);

  const createPetUseCase = makeCreatePetUseCase();

  const pet = await createPetUseCase.execute({
    name,
    description,
    age,
    size,
    energyLevel,
    independenceLevel,
    physicalSpace,
    availability,
    organizationId: request.user.sub,
  });
}
