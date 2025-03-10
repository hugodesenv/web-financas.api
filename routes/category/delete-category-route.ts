import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { CategoryRepository } from "../../repository/category-repository";
import { DeleteCategorySchema } from "../../schemas/category-schema";
import { EnStatusCode, IApiResponse } from "../../types/api-type";
import { DeleteCategoryType } from "../../types/category-type";
import { DeleteCategoryUseCase } from "../../use-cases/category/delete-category-use-case";

export function deleteCategoryRoute(app: FastifyInstance) {
  app.delete('/',
    {
      schema: {
        tags: ['categoria'],
        description: 'Excluir categoria',
        body: DeleteCategorySchema
      }
    },
    async (req: FastifyRequest<{ Body: DeleteCategoryType }>, rep: FastifyReply) => {
      try {
        const use = new DeleteCategoryUseCase(new CategoryRepository());
        const res = await use.tryDelete(req.body.id);

        return rep.status(res.success ? EnStatusCode.OK : EnStatusCode.NOT_FOUND).send(res);
      } catch (error) {
        return rep.status(500).send(<IApiResponse>{ success: false });
      }
    })
}