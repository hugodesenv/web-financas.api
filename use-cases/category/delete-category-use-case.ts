import { CategoryRepository } from "../../repository/category-repository";
import { IApiResponse } from "../../types/api-type";
import { getFriendlyException } from "../../utils/string-utils";

export class DeleteCategoryUseCase {
  constructor(private readonly repository: CategoryRepository) { }

  async tryDelete(id: string): Promise<IApiResponse> {
    try {
      await this.repository.removeCategory(id);
      return { success: true, message: "Category deleted" };
    } catch (err) {
      return {
        success: false,
        message: getFriendlyException(err).message
      }
    }
  }
}