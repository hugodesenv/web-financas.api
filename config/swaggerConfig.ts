import { SwaggerOptions } from "@fastify/swagger";
import { jsonSchemaTransform } from "fastify-type-provider-zod";
import { FastifyRegisterOptions } from "fastify/types/register";

export const swaggerConfig: FastifyRegisterOptions<SwaggerOptions> = {
  openapi: {
    info: {
      title: "WEB Finanças",
      description: "API oficial do sistema",
      contact: {
        name: "Hugo Souza",
        url: "https://www.linkedin.com/in/hugo-souza-591a891a4/",
      },
      version: "2025.03.09"
    },
  },
  transform: jsonSchemaTransform
}

export const swaggerUIConfig = { routePrefix: "/documentation" };