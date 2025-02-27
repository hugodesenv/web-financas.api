import { Static, Type } from "@sinclair/typebox";
import { IPayloadJWT } from "./user-type";

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
  tokenPayload: IPayloadJWT
}