import { FastifyRequest, FastifyReply } from "fastify";
import { Subcategory, Item } from "../types"; // Update this import based on your types

// Controller functions for subcategories
export const getSubcategories = async (request: FastifyRequest, reply: FastifyReply) => {
  // Fetch subcategories from the database based on user ID
  // Send subcategories in the response
};

export const getSubcategoryById = async (request: FastifyRequest, reply: FastifyReply) => {
  // Fetch a subcategory by ID from the database
  // Send the subcategory in the response
};

export const addSubcategory = async (request: FastifyRequest, reply: FastifyReply) => {
  // Parse subcategory data from the request body
  // Add the subcategory to the database
  // Send the added subcategory in the response
};

export const updateSubcategory = async (request: FastifyRequest, reply: FastifyReply) => {
  // Parse subcategory ID and updated data from the request body
  // Update the subcategory in the database
  // Send the updated subcategory in the response
};

export const deleteSubcategory = async (request: FastifyRequest, reply: FastifyReply) => {
  // Parse subcategory ID from the request parameters
  // Delete the subcategory from the database
  // Send a success message in the response
};
