import { z } from "zod";
import { ConnectDbUseCase } from "../use-cases/db/connect-db-use-case";
import { IPayloadJWT } from "./user-type";

export const ApiResponse = z.object({
  success: z.boolean(),
  message: z.string().optional(),
  data: z.any().optional()
});

export type ApiResponseType = z.infer<typeof ApiResponse>;

export interface IApiResponse {
  success: boolean,
  message?: string,
  data?: any
}

export interface IPubStorage {
  currentEndpoint: string;
  tokenPayload: IPayloadJWT,
  db: ConnectDbUseCase
}

export enum EnStatusCode {
  OK = 200,
  CREATED = 201,
  NOT_MODIFIED = 304,
  NOT_FOUND = 404
}