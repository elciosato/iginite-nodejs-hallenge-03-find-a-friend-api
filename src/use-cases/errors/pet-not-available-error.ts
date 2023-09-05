export class PetNotAvailableError extends Error {
  constructor() {
    super("Pet not available");
  }
}
