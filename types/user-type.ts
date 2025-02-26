import { Static } from "@sinclair/typebox";
import { UserAuth } from "../schemas/user/user-auth-schema";

export interface IUserRepository {
  userExists(username: string, password: string): Promise<boolean>;
};

export type UserAuthType = Static<typeof UserAuth>;