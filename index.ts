import fastifyJwt from "@fastify/jwt";
import fastify, { FastifyInstance } from "fastify";
import OpenAI from "openai";
import { authMiddleware } from "./middlewares/auth-middleware";
import { createPersonRoute } from "./routes/person/create-person-route";
import { authenticationUserRoute } from "./routes/user/authentication-user-route";
import { rules_system } from "./types/openAI-type";
import { API_CONFIG, JWT_SECRET } from "./utils/env-util";
import { pubStorage } from "./context/async-storage-context";

const app = fastify();
const { openai_key, port } = API_CONFIG();

app.register(fastifyJwt, { secret: JWT_SECRET() });

// Setting OpenAI
const openai = new OpenAI({ apiKey: openai_key });

// Global context
app.addHook('onRequest', (_, __, next) => {
  pubStorage.run({}, async () => next())
});

// Private routes
const privateRoutes = async (fastify: FastifyInstance, _opts: any) => {
  fastify.addHook('preHandler', (req: any, res: any, next: any) => { authMiddleware(req, res, next) });
  fastify.register(createPersonRoute, { prefix: '/person' });
};

// Public routes
const publicRoutes = (fastify: FastifyInstance, _opts: any) => {
  fastify.register(authenticationUserRoute, { prefix: '/user' });

  /** By HUGO SOUZA - Studying about openAI API.
   * In this case, the user pass a rule to the API to create a SQL of clients.
   * This event will returning to the owner.
   */
  fastify.post('/openai-example', async (request) => {
    const { text } = request.body as { text: string };
    const openai_completion = openai.chat.completions.create({
      model: "gpt-4o-mini",
      store: true,
      messages: [
        ...rules_system,
        {
          role: "user",
          content: [
            {
              type: "text",
              text
            }
          ]
        }
      ],
    });

    const api_result = await openai_completion;
    return api_result.choices[0].message;
  });
};

// Scope routes
app.register(privateRoutes);
app.register(publicRoutes);

// Starting api
app.listen({ port }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
})
