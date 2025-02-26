import { FastifyReply, FastifyRequest } from "fastify";
import { IApiResponse } from "../types/api-type";
import { pubStorage } from "../context/async-storage-context";

export async function authMiddleware(req: FastifyRequest, rep: FastifyReply) {
  try {
    const payload = await req.jwtVerify();
    pubStorage.set({ createdAt: new Date() });
    console.log('pos set', pubStorage.get());
  } catch (e) {
    return rep.status(401).send({ success: false, data: 'Invalid token!' } as IApiResponse);
  }
}