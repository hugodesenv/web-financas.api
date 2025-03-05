import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { IApiResponse } from "../../types/api-type";

export function alterPersonRoute(app: FastifyInstance) {
  app.put('/', {}, async (req: FastifyRequest, rep: FastifyReply) => {
    try {
      
    } catch (e) {
      rep.status(500).send(<IApiResponse>{ success: false, data: e });
    }
  })
}