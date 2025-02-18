import { Static, Type } from "@sinclair/typebox";

export const ApiResponse = Type.Object({
  success: Type.Boolean(),
  message: Type.String(),
  data: Type.Any()
});

export type ApiResponseType = Static<typeof ApiResponse>;

export interface IApiResponse {
  success: boolean,
  message: string,
  data: any
}