import { Type } from "@sinclair/typebox";

const CreateAlterPersonCommomSchema = Type.Object({
  name: Type.String(),
  nickname: Type.String()
});

export const CreatePersonSchema = CreateAlterPersonCommomSchema;