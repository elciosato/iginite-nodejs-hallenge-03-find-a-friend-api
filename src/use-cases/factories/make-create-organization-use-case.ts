import { InMemoryOrganizationsRepository } from "../../repositories/in-memory/in-memory-organizations-repository";
import { CreateOrganizationUseCase } from "../create-organization-use-case";

export function MakeCreateOrganizationUseCase() {
  const organizationsRepository = new InMemoryOrganizationsRepository();
  const useCase = new CreateOrganizationUseCase(organizationsRepository);

  return useCase;
}
