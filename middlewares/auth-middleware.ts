import { FastifyReply, FastifyRequest } from "fastify";
import { pubStorage } from "../context/async-storage-context";
import { IApiResponse } from "../types/api-type";
import { IPayloadJWT } from "../types/user-type";

export async function authMiddleware(req: FastifyRequest, rep: FastifyReply, next: (err?: Error) => void) {
  try {
    const tokenPayload: IPayloadJWT = await req.jwtVerify();

    pubStorage.set({
      currentEndpoint: req.url,
      tokenPayload
    });

    next();
  } catch (e) {
    return rep.status(401).send({ success: false, data: 'Invalid token!' } as IApiResponse);
  }
}