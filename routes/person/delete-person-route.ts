import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { DeletePersonSchema } from "../../schemas/person-schema";
import { EnStatusCode, IApiResponse } from "../../types/api-type";
import { DeletePersonType } from "../../types/person-type";
import { DeletePersonUseCase } from "../../use-cases/person/delete-person-use-case";
import { PersonRepository } from "../../repository/person-repository";

export function deletePersonRoute(app: FastifyInstance) {
  app.delete('/', {
    schema: {
      tags: ['person'],
      description: "Delete person",
      body: DeletePersonSchema,
    },
  }, async (req: FastifyRequest<{ Body: DeletePersonType }>, rep: FastifyReply) => {
    try {
      const { id } = req.body;
      const use = new DeletePersonUseCase(new PersonRepository());
      const res = await use.tryDelete(id);

      if (res.success === true) {
        return rep.status(EnStatusCode.OK).send(res)
      }

      return rep.status(EnStatusCode.NOT_FOUND).send(res);
    } catch (e) {
      console.log('aqui', e)
      return rep.status(500).send(<IApiResponse>{ success: false, data: e })
    }
  })
}