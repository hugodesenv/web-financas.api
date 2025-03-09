import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { PersonRepository } from "../../repository/person-repository";
import { UpdatePersonSchema } from "../../schemas/person-schema";
import { EnStatusCode, IApiResponse } from "../../types/api-type";
import { UpdatePersonType } from "../../types/person-type";
import { UpdatePersonUseCase } from "../../use-cases/person/update-person-use-case";

export function updatePersonRoute(app: FastifyInstance) {
  app.put('/', {
    schema: {
      description: 'Update person',
      body: UpdatePersonSchema,
      tags: ['person'],
    }
  }, async (req: FastifyRequest<{ Body: UpdatePersonType }>, rep: FastifyReply) => {
    try {
      const use = new UpdatePersonUseCase(new PersonRepository());
      const personResponse = await use.tryUpdatePerson(req.body);

      if (personResponse.success === true) {
        return rep.status(EnStatusCode.OK).send(<IApiResponse>{ success: true });
      }

      return rep.status(EnStatusCode.NOT_MODIFIED).send(<IApiResponse>{ success: false });
    } catch (e) {
      rep.status(500).send(<IApiResponse>{ success: false, data: e });
    }
  })
}