import z from "zod";
import { orderItemsSchema } from "../database/index.js";

export const cartSchema = z.array(
  z.object({
    product_id: orderItemsSchema.shape.product_id,
    product_variant_id: orderItemsSchema.shape.product_variant_id,
    quantity: orderItemsSchema.shape.quantity,
  }),
);
