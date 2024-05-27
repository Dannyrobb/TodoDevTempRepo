import { FastifyInstance } from "fastify";
import { getItems, getItemById, addItem, updateItem, deleteItem } from "../controllers/itemsController"; // Update this import

const itemRoutes = async (fastify: FastifyInstance) => {
  fastify.get("/items", getItems);
  fastify.get("/items/:id", getItemById);
  fastify.post("/items", addItem);
  fastify.put("/items/:id", updateItem);
  fastify.delete("/items/:id", deleteItem);
};

export default itemRoutes;
