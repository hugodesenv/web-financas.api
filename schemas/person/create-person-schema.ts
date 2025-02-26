import { Type } from "@sinclair/typebox";

export const CreatePersonSchema = Type.Object({
  name: Type.String(),
  nickbame: Type.String()
});