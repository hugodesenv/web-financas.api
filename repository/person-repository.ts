import { IApiResponse } from "../types/api-type";
import { IPersonRepository } from "../types/person-type";

export class PersonRepository implements IPersonRepository {
  createPerson(person: { name: string; id: string; nickname: string; }): Promise<IApiResponse> {
    throw new Error("Method not implemented.");
  }

  updatePerson(person: { name: string; id: string; nickname: string; }): Promise<IApiResponse> {
    throw new Error("Method not implemented.");
  }

  removePerson(id: string): Promise<IApiResponse> {
    throw new Error("Method not implemented.");
  }
}

By Hugo Souza
Lets create the CRUD from the persona and the next step, to implement the test.