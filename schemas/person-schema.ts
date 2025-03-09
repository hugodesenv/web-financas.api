import { z } from "zod";

const _comumPersonSchema = {
  name: z.string(),
  nickname: z.string()
};

export const CreatePersonSchema = z.object(_comumPersonSchema);
export const UpdatePersonSchema = z.object({ ..._comumPersonSchema, id: z.string() });

export const DeletePersonSchema = z.object({
  id: z.string({ description: "Person ID" })
});
