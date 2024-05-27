import { FastifyInstance } from "fastify";
import {
  getSubcategories,
  getSubcategoryById,
  addSubcategory,
  updateSubcategory,
  deleteSubcategory,
} from "../controllers/subcategoriesController"; // Update this import

const subcategoryRoutes = async (fastify: FastifyInstance) => {
  fastify.get("/subcategories", getSubcategories);
  fastify.get("/subcategories/:id", getSubcategoryById);
  fastify.post("/subcategories", addSubcategory);
  fastify.put("/subcategories/:id", updateSubcategory);
  fastify.delete("/subcategories/:id", deleteSubcategory);
};

export default subcategoryRoutes;
