import { FastifyRequest } from "fastify";
import { JWT } from "@fastify/jwt";

declare module "fastify" {
  interface FastifyRequest {
    jwt: JWT;
  }
}
