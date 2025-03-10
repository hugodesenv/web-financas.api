import fastifyJwt from "@fastify/jwt";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastify, { FastifyInstance } from "fastify";
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import { swaggerConfig, swaggerUIConfig } from "./config/swaggerConfig";
import { pubStorage } from "./context/async-storage-context";
import { authMiddleware } from "./middlewares/auth-middleware";
import { updatePersonRoute } from "./routes/person/update-person-route";
import { createPersonRoute } from "./routes/person/create-person-route";
import { authenticationUserRoute } from "./routes/user/authentication-user-route";
import { API_CONFIG, JWT_SECRET } from "./utils/env-util";
import { deletePersonRoute } from "./routes/person/delete-person-route";
import { createCategoryRoute } from "./routes/category/create-category-route";
import { updateCategoryRoute } from "./routes/category/update-category-route";
import { deleteCategoryRoute } from "./routes/category/delete-category-route";
const { port } = API_CONFIG();

const app = fastify();

// Zod
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

// Json Web Token
app.register(fastifyJwt, { secret: JWT_SECRET() });

// Swagger
app.register(fastifySwagger, swaggerConfig)
app.register(fastifySwaggerUi, swaggerUIConfig);

// Setting OpenAI
//const openai = new OpenAI({ apiKey: openai_key });

// Global context
app.addHook('onRequest', (_, __, next) => {
  pubStorage.run({}, async () => next())
});

// Private routes
const privateRoutes = async (fastify: FastifyInstance, _opts: any) => {
  fastify.addHook('preHandler', (req: any, res: any, next: any) => { authMiddleware(req, res, next) });

  fastify.register(createCategoryRoute, { prefix: '/category' });
  fastify.register(updateCategoryRoute, { prefix: '/category' });
  fastify.register(deleteCategoryRoute, { prefix: '/category' });

  fastify.register(createPersonRoute, { prefix: '/person' });
  fastify.register(updatePersonRoute, { prefix: '/person' });
  fastify.register(deletePersonRoute, { prefix: '/person' });
};

// Public routes
const publicRoutes = (fastify: FastifyInstance, _opts: any) => {
  fastify.register(authenticationUserRoute, { prefix: '/user' });
  //--> routes here.
};

// Scope routes
app.register(privateRoutes);
app.register(publicRoutes);

// Starting
app.listen({ port }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
})
