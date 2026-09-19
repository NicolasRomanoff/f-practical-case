import z from "zod";
import { ordersSchema } from "./orders.schema.js";
import { productVariantsSchema } from "./product_variants.schema.js";
import { productsSchema } from "./products.schema.js";

export const orderItemsSchema = z.object({
  id: z.number().int().positive(),
  order_id: ordersSchema.shape.id,
  product_id: productsSchema.shape.id,
  product_variant_id: productVariantsSchema.shape.id,
  product_name: z.string(),
  configuration: z.string(),
  sku: z.string(),
  unit_price: z.number().positive(),
  quantity: z.number().int().positive(),
  line_total: z.string(),
  create_at: z.coerce.date(),
});
