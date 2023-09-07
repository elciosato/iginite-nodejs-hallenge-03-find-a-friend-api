import { FastifyReply, FastifyRequest } from "fastify";
import { makeCreateOrganizationUseCase } from "../../use-cases/factories/make-create-organization-use-case";
import { z } from "zod";
import { OrganizationAlreadyExistsError } from "../../use-cases/errors/organization-already-exists-error";
import { error } from "console";

export async function createOrganizationController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const organizationBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    responsablePerson: z.string(),
    postCode: z.string(),
    city: z.string(),
    state: z.string(),
    address: z.string(),
    whatsapp: z.string(),
  });

  const {
    email,
    password,
    responsablePerson,
    postCode,
    city,
    state,
    address,
    whatsapp,
  } = organizationBodySchema.parse(request.body);

  const createOrganizationUseCase = makeCreateOrganizationUseCase();

  try {
    const organization = await createOrganizationUseCase.execute({
      email,
      password,
      responsablePerson,
      postCode,
      city,
      state,
      address,
      whatsapp,
    });

    return reply.status(201).send("Organization created");
  } catch (err) {
    if (err instanceof OrganizationAlreadyExistsError) {
      return reply.status(400).send({
        message: err.message,
      });
    }
    throw err;
  }
}
