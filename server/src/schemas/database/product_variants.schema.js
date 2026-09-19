import z from "zod";
import { productsSchema } from "./products.schema.js";

export const productVariantsSchema = z.object({
  id: z.number().int().positive(),
  product_id: productsSchema.shape.id,
  configuration: z.string(),
  sku: z.string(),
  price_delta: z.number().positive(),
  stock: z.number().int().positive(),
  create_at: z.coerce.date(),
});
