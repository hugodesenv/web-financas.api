import { FastifyInstance } from "fastify";
import { PersonRepository } from "../../repository/person-repository";
import { CreatePersonSchema } from "../../schemas/person/create-person-schema";
import { IApiResponse } from "../../types/api-type";
import { CreatePersonType } from "../../types/person-type";
import { CreatePersonUseCase } from "../../use-cases/person/create-person-use-case";

export function createPersonRoute(app: FastifyInstance) {

  app.post<{ Body: CreatePersonType }>('/', {
    schema: CreatePersonSchema
  }, async (request, reply) => {
    try {
      const lCreate = new CreatePersonUseCase(new PersonRepository());

      const lResponse = await lCreate.tryCreate({
        name: request.body.name,
        nickname: request.body.nickbame,
        id: ""
      });

      return reply.status(201).send(<IApiResponse>{ success: true, data: lResponse });
    } catch (e) {
      reply.status(500).send(<IApiResponse>{ success: false, data: e });
    }
  })
}