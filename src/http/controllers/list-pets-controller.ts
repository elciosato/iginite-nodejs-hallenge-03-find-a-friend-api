import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeListPetsUseCase } from "../../use-cases/factories/make-list-pets-use-case";
import {
  Age,
  EnergyLevel,
  IndependenceLevel,
  PhysicalSpace,
  Size,
} from "@prisma/client";

export async function listPetsController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const listPetsQuerySchema = z.object({
    city: z.string(),
    state: z.string(),
    age: z.nativeEnum(Age).optional(),
    size: z.nativeEnum(Size).optional(),
    energyLevel: z.nativeEnum(EnergyLevel).optional(),
    independenceLevel: z.nativeEnum(IndependenceLevel).optional(),
    physicalSpace: z.nativeEnum(PhysicalSpace).optional(),
  });

  const {
    city,
    state,
    age,
    size,
    energyLevel,
    independenceLevel,
    physicalSpace,
  } = listPetsQuerySchema.parse(request.query);

  const listPestUseCase = makeListPetsUseCase();

  const { pets } = await listPestUseCase.execute({
    city,
    state,
    age,
    size,
    energyLevel,
    independenceLevel,
    physicalSpace,
  });

  return reply.status(200).send({ pets });
}
