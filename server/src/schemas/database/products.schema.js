import z from "zod";

export const productsSchema = z.object({
  id: z.number().int().positive(),
  name: z.string(),
  status: z.string(),
  base_price: z.number().positive(),
  create_at: z.coerce.date(),
});
