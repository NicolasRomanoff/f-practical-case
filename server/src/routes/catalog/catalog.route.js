import express from "express";
import { getCatalog } from "./catalog.controller.js";

export const catalogRouter = express.Router();

catalogRouter.get("/", getCatalog);
