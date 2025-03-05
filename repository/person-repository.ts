import { Person } from "@prisma/client";
import { pubStorage } from "../context/async-storage-context";
import { IPersonRepository } from "../types/person-type";

export class PersonRepository implements IPersonRepository {

  async createPerson(person: Person): Promise<string> {
    const personCreated = await pubStorage.get().db?.dbClient.person.create({
      data: {
        name: person.name,
        nickname: person.nickname,
      }
    });

    return personCreated?.id || "";
  }

  updatePerson(person: { name: string; id: string; nickname: string; }): Promise<void> {
    throw new Error("Method not implemented.");
  }

  removePerson(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}