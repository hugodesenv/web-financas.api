import { FastifyInstance } from "fastify";
import { UserAuth, UserAuthType } from "../schemas/user/user-auth-schema";
import { ApiResponse, ApiResponseType, IApiResponse } from "../types/api-type";
import { AuthenticationUserUseCase } from "../use-cases/user/authentication-user-use-case";

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

    const userCase = new AuthenticationUserUseCase();
    const isAuthenticated = await userCase.tryAuthentication(user, password);

    reply.status(200).send(<IApiResponse>{
      message: isAuthenticated ? 'User authenticated with success' : 'Username or password is incorrect',
      success: true
    });
  })
}