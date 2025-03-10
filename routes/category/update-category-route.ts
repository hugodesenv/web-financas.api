import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { UpdateCategorySchema } from "../../schemas/category-schema";
import { UpdateCategoryType } from "../../types/category-type";
import { EnStatusCode, IApiResponse } from "../../types/api-type";
import { UpdateCategoryUseCase } from "../../use-cases/category/update-category-use-case";
import { CategoryRepository } from "../../repository/category-repository";

export function updateCategoryRoute(app: FastifyInstance) {
  app.put('/', {
    schema: {
      tags: ['categoria'],
      description: 'Atualizar dados da categoria',
      body: UpdateCategorySchema
    }
  }, async (req: FastifyRequest<{ Body: UpdateCategoryType }>, rep: FastifyReply) => {
    try {
      const use = new UpdateCategoryUseCase(new CategoryRepository());
      const res = await use.tryUpdate(req.body);
      return rep.status(res.success ? EnStatusCode.OK : EnStatusCode.NOT_FOUND).send(res);
    } catch (e) {
      return rep.status(500).send(<IApiResponse>{ success: false, data: e });
    }
  })
}