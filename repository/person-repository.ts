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

  async updatePerson(person: Person): Promise<boolean> {
    try {
      await pubStorage.get().db?.dbClient.person.update({
        where: {
          id: person.id
        },
        data: {
          name: person.name,
          nickname: person.nickname
        }
      });

      return true;
    } catch (e) {
      return false;
    }
  }

  async removePerson(id: string): Promise<void> {
    await pubStorage.get().db?.dbClient.person.delete({ where: { id } });
  }
}