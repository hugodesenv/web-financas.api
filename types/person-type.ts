import { Person } from "@prisma/client";
import { Static } from "@sinclair/typebox";
import { CreatePersonSchema } from "../schemas/person/create-person-schema";
import { IApiResponse } from "./api-type";


export interface IPersonRepository {
  createPerson(person: Person): Promise<IApiResponse>;
  updatePerson(person: Person): Promise<IApiResponse>;
  removePerson(id: string): Promise<IApiResponse>;
};

export type CreatePersonType = Static<typeof CreatePersonSchema>;