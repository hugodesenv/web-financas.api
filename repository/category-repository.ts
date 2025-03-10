import { pubStorage } from "../context/async-storage-context";
import { ICategoryRepository } from "../types/category-type";

export class CategoryRepository implements ICategoryRepository {

  async createCategory(category: { description: string; id: string; }): Promise<string> {
    const { id, ...rest } = category;
    const response = await pubStorage.get().db?.dbClient.category.create({
      data: rest
    });

    return response?.id || "";
  }

  async updateCategory(category: { description: string; id: string; }): Promise<boolean> {
    const { id, ...rest } = category;
    const created = await pubStorage.get().db?.dbClient.category.update({
      data: rest,
      where: { id: id }
    });
    return (created?.id?.length ?? 0) > 0;
  }

  async removeCategory(id: string): Promise<void> {
    await pubStorage.get().db?.dbClient.category.delete({ where: { id } });
  }
}