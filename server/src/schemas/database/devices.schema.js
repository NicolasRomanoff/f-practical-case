import z from "zod";
import { employeesSchema } from "./employees.schema.js";

export const devicesSchema = z.object({
  id: z.number().int().positive(),
  name: z.string(),
  type: z.string(),
  owner_id: employeesSchema.shape.id,
  create_at: z.coerce.date(),
});
