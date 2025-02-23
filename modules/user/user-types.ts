import { Static, Type } from "@sinclair/typebox";

export const UserAuth = Type.Object({
  user: Type.String(),
  password: Type.String()
});

export type UserAuthType = Static<typeof UserAuth>;