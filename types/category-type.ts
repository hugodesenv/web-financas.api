import { Category } from "@prisma/client";
import { z } from "zod";
import { CreateCategorySchema, DeleteCategorySchema, UpdateCategorySchema } from "../schemas/category-schema";

export type CreateCategoryType = z.infer<typeof CreateCategorySchema>;
export type UpdateCategoryType = z.infer<typeof UpdateCategorySchema>;
export type DeleteCategoryType = z.infer<typeof DeleteCategorySchema>;

export interface ICategoryRepository {
  createCategory(category: Category): Promise<string>;
  updateCategory(category: Category): Promise<boolean>;
  removeCategory(id: string): Promise<void>;
};