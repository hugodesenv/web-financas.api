import { CategoryRepository } from "../../repository/category-repository";
import { IApiResponse } from "../../types/api-type";
import { CreateCategoryType } from "../../types/category-type";
import { getFriendlyException } from "../../utils/string-utils";

export class CreateCategoryUseCase {
  constructor(private readonly repository: CategoryRepository) { }

  async tryCreate(data: CreateCategoryType): Promise<IApiResponse> {
    try {
      const id = await this.repository.createCategory({
        description: data.description,
        id: ""
      });

      if (id.length === 0) {
        return {
          success: false,
          message: "An error occurred to insert the category"
        }
      }

      return { success: true }
    } catch (e) {
      return {
        success: false,
        message: getFriendlyException(e).message
      }
    }
  }
}