import Fastify, { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";
import userRoutes from "./routes/usersRoutes";
import categoriesRoutes from "./routes/categoriesRoutes";
import itemRoutes from "./routes/itemsRoutes";
import subcategoryRoutes from "./routes/subCategoriesRoutes";

const fastify: FastifyInstance = Fastify({ logger: true });
fastify
  .register(fastifyJwt, {
    secret: process.env.SECRET_KEY || "defaultSecret",
  })
  .then(() => {
    fastify.decorate("authenticate", async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        await request.jwtVerify();
      } catch (err) {
        reply.send(err);
      }
    });
    // fastify.addHook("preHandler", (req, res, next) => {
    //   req.jwt = fastify.jwt;
    //   return next();
    // });
    fastify.register(fastifyCookie);
    fastify.register(userRoutes);
    fastify.register(categoriesRoutes);
    fastify.register(subcategoryRoutes);
    fastify.register(itemRoutes);

    const start = async () => {
      try {
        await fastify.listen({ port: 3000, host: "0.0.0.0" });
        fastify.log.info(`Server is running at http://localhost:3000`);
      } catch (err) {
        fastify.log.error(err);
        process.exit(1);
      }
    };

    start();
  });

export default fastify;
