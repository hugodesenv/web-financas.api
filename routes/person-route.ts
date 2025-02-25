import { FastifyInstance } from "fastify";
import { IApiResponse } from "../types/api-type";

export function PersonRoute(app: FastifyInstance) {

  app.post('/', {}, (request, reply) => {
    try {
      
    } catch (e) {
      reply.status(500).send(<IApiResponse>{ success: false, data: e });
    }
  })
}