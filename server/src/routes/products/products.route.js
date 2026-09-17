import express from "express";
import { getProducts } from "./products.controller.js";

export const productsRouter = express.Router();

productsRouter.get("/", getProducts);
