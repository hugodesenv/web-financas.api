import { pubStorage } from "../context/async-storage-context";
import { IApiResponse } from "../types/api-type";
import { IPersonRepository } from "../types/person-type";

export class PersonRepository implements IPersonRepository {
  async createPerson(person: { name: string; id: string; nickname: string; }): Promise<IApiResponse> {
    const test = pubStorage.get();
    console.log('we got...', test);

    return {
      data: '',
      message: '',
      success: true,
    }
  }

  updatePerson(person: { name: string; id: string; nickname: string; }): Promise<IApiResponse> {
    throw new Error("Method not implemented.");
  }

  removePerson(id: string): Promise<IApiResponse> {
    throw new Error("Method not implemented.");
  }
}