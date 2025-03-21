import { PersonRepository } from "../../repository/person-repository";
import { IApiResponse } from "../../types/api-type";
import { getFriendlyException } from "../../utils/string-utils";

export class DeletePersonUseCase {
  constructor(private readonly repository: PersonRepository) { }

  async tryDelete(id: string): Promise<IApiResponse> {
    try {
      await this.repository.removePerson(id);
      return { success: true, message: "Person deleted" };
    } catch (err) {
      return {
        success: false,
        message: getFriendlyException(err).message
      }
    }
  }
}