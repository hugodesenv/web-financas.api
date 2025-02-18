import fastifyJwt from "@fastify/jwt";
import fastify from "fastify";
import { userRoute } from "./routes/user-route";
import { JWT_SECRET } from "./utils/lib/env-utils";

const app = fastify();

app.register(fastifyJwt, { secret: JWT_SECRET });
app.register(userRoute, { prefix: '/user' });

app.get('/', () => { return 'Hello World' });

app.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
})