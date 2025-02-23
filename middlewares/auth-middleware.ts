import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from "fastify";
import { IApiResponse } from "../utils/api-types";

export async function authMiddleware(req: FastifyRequest, rep: FastifyReply) {
  try {
    const payload = await req.jwtVerify();
    console.log('Valid token, lets continue!');
  } catch (e) {
    return rep.status(401).send({ success: false, data: 'Invalid token!' } as IApiResponse);
  }
}