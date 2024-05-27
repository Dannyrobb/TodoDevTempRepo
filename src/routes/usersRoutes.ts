import { FastifyInstance } from "fastify";
import { register, login, getUsers, getUserById, getGoogleUserData, authUrl, htmlAuth } from "../controllers/usersController";

const userRoutes = async (fastify: FastifyInstance) => {
  fastify.post("/register", register);
  fastify.post("/login", login);
  fastify.get("/users", { onRequest: [fastify.authenticate] }, getUsers);
  fastify.get("/users/:id", getUserById);
  fastify.get("/oauth", getGoogleUserData);
  fastify.post("/request", authUrl);
  fastify.post("/htmlAuth", htmlAuth);
};

export default userRoutes;
