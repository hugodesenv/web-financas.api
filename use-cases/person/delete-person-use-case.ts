import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { PersonRepository } from "../../repository/person-repository";
import { IApiResponse } from "../../types/api-type";

export class DeletePersonUseCase {
  constructor(private readonly repository: PersonRepository) { }

  async tryDelete(id: string): Promise<IApiResponse> {
    try {
      await this.repository.removePerson(id);
      return { success: true, message: "Person deleted" };
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        return {
          success: false,
          message: err.code === 'P2025' ? 'Person not found' : err.message,
        }
      }
      return { success: false, message: "An error occurs to delete the person" }
    }
  }
}