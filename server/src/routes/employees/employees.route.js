import express from "express";
import {
  deleteEmployee,
  getEmployee,
  getEmployees,
  postEmployee,
  putEmployee,
} from "./employees.controller.js";

export const employeesRouter = express.Router();

employeesRouter.get("/", getEmployees);
employeesRouter.get("/:id", getEmployee);
employeesRouter.post("/", postEmployee);
employeesRouter.put("/:id", putEmployee);
employeesRouter.delete("/:id", deleteEmployee);
