import { z } from "zod";
import { UserAuth } from "../schemas/user-schema";

export interface IUserRepository {
  userExists(username: string, password: string): Promise<boolean>;
};

export interface IPayloadJWT {
  username: string,
  createdAt: Date
}

export type UserAuthType = z.infer<typeof UserAuth>;