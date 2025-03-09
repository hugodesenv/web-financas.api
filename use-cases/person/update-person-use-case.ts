import { PersonRepository } from "../../repository/person-repository";
import { ApiResponseType } from "../../types/api-type";
import { UpdatePersonType } from "../../types/person-type";

export class UpdatePersonUseCase {
  constructor(private readonly personRepository: PersonRepository) { }

  async tryUpdatePerson(data: UpdatePersonType): Promise<ApiResponseType> {
    const personResult = await this.personRepository.updatePerson({
      id: data.id,
      name: data.name,
      nickname: data.nickname
    });

    return { success: personResult }
  }
}