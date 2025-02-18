import { FastifyInstance } from "fastify";
import { UserCase } from "../use-cases/user-case";
import { ApiResponse, ApiResponseType } from "../utils/types/api-types";
import { UserAuth, UserAuthType } from "../utils/types/user-types";

export function userRoute(app: FastifyInstance) {
  app.post<{ Body: UserAuthType, Reply: ApiResponseType }>('/auth', {
    schema: {
      body: UserAuth,
      response: {
        200: ApiResponse
      }
    },
  }, async (request, reply) => {
    const { user, password } = request.body;

    const userCase = new UserCase();
    await userCase.authenticate(user, password);

    reply.status(200).send({
      message: 'ok',
      data: '',
      success: true
    });
  })
}