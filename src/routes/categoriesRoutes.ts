import { FastifyInstance } from "fastify";
import {
  getCategories,
  getCategoryById,
  addCategory,
  updateCategory,
  deleteCategory,
  getFullCategoryData,
} from "../controllers/categoriesController";

const categoryRoutes = async (fastify: FastifyInstance) => {
  fastify.get("/categories", getCategories);
  fastify.get("/categories/:id", getCategoryById);
  fastify.get("/getFullData", getFullCategoryData);
  fastify.post("/categories", addCategory);
  fastify.put("/categories/:id", updateCategory);
  fastify.delete("/categories/:id", deleteCategory);
};

export default categoryRoutes;
