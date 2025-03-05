import { Person } from "@prisma/client";
import { IApiResponse } from "../../types/api-type";
import { PersonRepository } from "../../repository/person-repository";

export class CreatePersonUseCase {
  constructor(private personRepository: PersonRepository) { }

  async tryCreate(person: Person): Promise<IApiResponse> {
    const newID = await this.personRepository.createPerson(person);

    if (newID.length === 0) {
      return { message: "Failed to create person", success: false }
    }

    return {
      message: "Person created",
      success: true,
      data: { id: newID }
    }
  }
}