import express from "express";
import { getOrders, postOrder } from "./orders.controller.js";

export const ordersRouter = express.Router();

ordersRouter.get("/", getOrders);
ordersRouter.post("/", postOrder);
