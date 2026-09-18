import express from "express";
import { getOrders } from "./orders.controller.js";

export const ordersRouter = express.Router();

ordersRouter.get("/", getOrders);
