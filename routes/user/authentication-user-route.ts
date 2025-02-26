import { FastifyInstance } from "fastify";
import { UserAuth } from "../../schemas/user/user-auth-schema";
import { ApiResponse, ApiResponseType, IApiResponse } from "../../types/api-type";
import { AuthenticationUserUseCase } from "../../use-cases/user/authentication-user-use-case";
import { UserAuthType } from "../../types/user-type";

export function authenticationUserRoute(app: FastifyInstance) {
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

    if (isAuthenticated === false) {
      return reply.status(403).send(<IApiResponse>{
        message: 'Username or password is incorrect',
        success: false
      });
    }

    const lTokenPayload = {
      username: user,
      createdAt: new Date()
    }

    reply.status(200).send(<IApiResponse>{
      data: app.jwt.sign(lTokenPayload),
      message: 'User authenticated',
      success: true,
    });
  })
}