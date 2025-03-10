import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export function CreateEntryRoute(app: FastifyInstance) {
  app.post('/',
    {},
    async (req: FastifyRequest, rep: FastifyReply) => {
      console.log("Continuar desenvolvimento.")
    })
}