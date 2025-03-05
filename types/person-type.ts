import { Person } from "@prisma/client";
import { Static } from "@sinclair/typebox";
import { CreatePersonSchema } from "../schemas/person-schema";

export interface IPersonRepository {
  createPerson(person: Person): Promise<string>;
  updatePerson(person: Person): Promise<void>;
  removePerson(id: string): Promise<void>;
};

export type CreatePersonType = Static<typeof CreatePersonSchema>;