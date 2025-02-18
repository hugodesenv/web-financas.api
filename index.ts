import fastifyJwt from "@fastify/jwt";
import fastify, { FastifyInstance } from "fastify";
import { authMiddleware } from "./middlewares/auth-middleware";
import { userRoute } from "./routes/user-route";
import { API_CONFIG, JWT_SECRET } from "./utils/lib/env-utils";

const app = fastify();

app.register(fastifyJwt, { secret: JWT_SECRET() });

// Private routes
const privateRoutes = async (fastify: FastifyInstance, _opts: any) => {
  fastify.addHook('preHandler', authMiddleware);
  fastify.register(userRoute, { prefix: '/user' });
};

// Public routes
const publicRoutes = (fastify: FastifyInstance, _opts: any) => {
  fastify.get('/', () => { return 'Hello World' });
};

// Scope routes
app.register(privateRoutes);
app.register(publicRoutes);

// Starting api
app.listen({ port: API_CONFIG().port }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
})
