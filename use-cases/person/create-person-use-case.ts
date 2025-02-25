import { Person } from "@prisma/client";
import { IApiResponse } from "../../types/api-type";
import { PersonRepository } from "../../repository/person-repository";

export class CreatePersonUseCase {
  constructor(private personRepository: PersonRepository) { }

  async tryCreate(person: Person): Promise<IApiResponse> {
    const responseCreate = await this.personRepository.createPerson(person);
    return responseCreate;
  }
}