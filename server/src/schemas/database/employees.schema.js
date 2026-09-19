import z from "zod";

export const employeesSchema = z.object({
  id: z.number().int().positive(),
  name: z.string(),
  role: z.string(),
  create_at: z.coerce.date(),
});
