export class OrganizationAlreadyExistsError extends Error {
  constructor() {
    super("Organization Already Exists!");
  }
}
