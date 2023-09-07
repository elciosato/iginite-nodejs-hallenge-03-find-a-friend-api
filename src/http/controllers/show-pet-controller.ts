import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeShowPetUseCase } from "../../use-cases/factories/make-show-pet-use-case";
import { ResourceNotFoundError } from "../../use-cases/errors/resource-not-found-error";
import { PetNotAvailableError } from "../../use-cases/errors/pet-not-available-error";

export async function showPetController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const showPetParamSchema = z.object({
    id: z.string().uuid(),
  });

  const { id } = showPetParamSchema.parse(request.params);

  const showPetUseCase = makeShowPetUseCase();

  try {
    const pet = await showPetUseCase.execute({ id });
    return reply.status(200).send({
      pet,
    });
  } catch (err) {
    if (
      err instanceof ResourceNotFoundError ||
      err instanceof PetNotAvailableError
    ) {
      return reply.status(400).send({
        message: err.message,
      });
    }
  }
}
