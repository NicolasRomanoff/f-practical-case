import z from "zod";

const productSchema = z.object({
  product_id: z.coerce.number(),
  product_variants_id: z.coerce.number(),
  name: z.string(),
  configuration: z.string(),
  sku: z.string(),
  status: z.string(),
  stock: z.coerce.number(),
  price: z.coerce.number(),
  product_variants_created_at: z.coerce.date(),
  products_create_at: z.coerce.date(),
});

export const cartSchema = z.array(
  z.object({
    product: productSchema,
    quantity: z.number(),
  }),
);
