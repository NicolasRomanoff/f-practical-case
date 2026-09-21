import express from "express";
import {
  deleteDevice,
  getDevices,
  postDevices,
  putDevice,
} from "./devices.controller.js";

export const devicesRouter = express.Router();

devicesRouter.get("/", getDevices);
devicesRouter.post("/", postDevices);
devicesRouter.put("/:id", putDevice);
devicesRouter.delete("/:id", deleteDevice);
