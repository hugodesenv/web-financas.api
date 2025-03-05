import { PrismaClient } from "@prisma/client";
import { Static, Type } from "@sinclair/typebox";
import { IPayloadJWT } from "./user-type";
import { ConnectDbUseCase } from "../use-cases/db/connect.db.use.case";

export const ApiResponse = Type.Object({
  success: Type.Boolean(),
  message: Type.String(),
  data: Type.Optional(
    Type.Any()
  )
});

export type ApiResponseType = Static<typeof ApiResponse>;

export interface IApiResponse {
  success: boolean,
  message: string,
  data?: any
}

export interface IPubStorage {
  currentEndpoint: string;
  tokenPayload: IPayloadJWT,
  db: ConnectDbUseCase
}