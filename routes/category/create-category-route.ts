import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { CategoryRepository } from '../../repository/category-repository';
import { CreateCategorySchema } from "../../schemas/category-schema";
import { EnStatusCode, IApiResponse } from "../../types/api-type";
import { CreateCategoryType } from "../../types/category-type";
import { CreateCategoryUseCase } from "../../use-cases/category/create-category-use-case";

export function createCategoryRoute(app: FastifyInstance) {
  app.post('/', {
    schema: {
      body: CreateCategorySchema,
      tags: ['categoria'],
      description: "Nova categoria do lançamento"
    }
  }, async (req: FastifyRequest<{ Body: CreateCategoryType }>, rep: FastifyReply) => {
    try {
      const use = new CreateCategoryUseCase(new CategoryRepository());
      const res = await use.tryCreate(req.body);

      return rep.status(res.success ? EnStatusCode.OK : EnStatusCode.NOT_FOUND).send(res);
    } catch (error) {
      return rep.status(500).send(<IApiResponse>{ success: false, data: error });
    }
  });
}