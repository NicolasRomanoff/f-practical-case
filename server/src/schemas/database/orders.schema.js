import z from "zod";

export const ordersSchema = z.object({
  id: z.number().int().positive(),
  total_amount: z.number().positive(),
  item_count: z.number().int().positive(),
  create_at: z.coerce.date(),
});
