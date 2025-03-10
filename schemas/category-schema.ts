import { z } from "zod";

const _commomCategorySchema = {
  description: z.string()
}

export const CreateCategorySchema = z.object({ ..._commomCategorySchema });
export const UpdateCategorySchema = z.object({ ..._commomCategorySchema, id: z.string() });
export const DeleteCategorySchema = z.object({ id: z.string() });