import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { PersonRepository } from "../../repository/person-repository";
import { IApiResponse } from "../../types/api-type";
import { CreatePersonType } from "../../types/person-type";
import { CreatePersonUseCase } from "../../use-cases/person/create-person-use-case";
import { CreatePersonSchema } from './../../schemas/person-schema';

export function createPersonRoute(app: FastifyInstance) {

  app.post<{ Body: CreatePersonType }>('/', {
    schema: {
      description: 'Create person',
      tags: ['person'],
      body: CreatePersonSchema,
    }
  }, async (request: FastifyRequest<{ Body: CreatePersonType }>, reply: FastifyReply) => {
    try {
      const lCreate = new CreatePersonUseCase(new PersonRepository());

      const lResponse = await lCreate.tryCreate({
        name: request.body.name,
        nickname: request.body.nickname,
        id: ""
      });

      return reply.status(201).send(lResponse);
    } catch (e) {
      reply.status(500).send(<IApiResponse>{ success: false, data: e });
    }
  })
}