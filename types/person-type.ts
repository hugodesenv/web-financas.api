import { Person } from "@prisma/client";
import { z } from "zod";
import { CreatePersonSchema, DeletePersonSchema, UpdatePersonSchema } from "../schemas/person-schema";

export interface IPersonRepository {
  createPerson(person: Person): Promise<string>;
  updatePerson(person: Person): Promise<boolean>;
  removePerson(id: string): Promise<void>;
};

export type CreatePersonType = z.infer<typeof CreatePersonSchema>;
export type UpdatePersonType = z.infer<typeof UpdatePersonSchema>;
export type DeletePersonType = z.infer<typeof DeletePersonSchema>;