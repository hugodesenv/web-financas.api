import { Person } from "@prisma/client";
import { IApiResponse } from "./api-type";

export interface IPersonRepository {
  createPerson(person: Person): Promise<IApiResponse>;
  updatePerson(person: Person): Promise<IApiResponse>;
  removePerson(id: string): Promise<IApiResponse>;
}