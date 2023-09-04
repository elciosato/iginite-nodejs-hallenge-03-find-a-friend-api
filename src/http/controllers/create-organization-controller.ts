import { FastifyReply, FastifyRequest } from "fastify";
import { MakeCreateOrganizationUseCase } from "../../use-cases/factories/make-create-organization-use-case";
import { z } from "zod";

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

  const createOrganizationUseCase = MakeCreateOrganizationUseCase();

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
}
