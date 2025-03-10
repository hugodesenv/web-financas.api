import { CategoryRepository } from "../../repository/category-repository";
import { IApiResponse } from "../../types/api-type";
import { UpdateCategoryType } from "../../types/category-type";
import { getFriendlyException } from "../../utils/string-utils";

export class UpdateCategoryUseCase {
  constructor(private readonly repository: CategoryRepository) { }

  async tryUpdate(data: UpdateCategoryType): Promise<IApiResponse> {
    try {
      const categoryResult = await this.repository.updateCategory({
        description: data.description,
        id: data.id
      });

      return { success: categoryResult };
    } catch (e) {
      return {
        success: false,
        message: getFriendlyException(e).message
      }
    }
  }
}