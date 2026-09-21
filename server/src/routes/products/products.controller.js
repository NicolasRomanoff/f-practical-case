import { db } from "./../../sqlite.js";

export const getProducts = (_, res) => {
  const sql = `
    SELECT
      product_id,
      p.id AS product_variant_id,
      name,
      configuration,
      sku,
      status,
      stock,
      SUM(base_price + price_delta) AS price,
      p.created_at AS product_variant_created_at,
      products.created_at AS product_create_at
    FROM product_variants AS p
    INNER JOIN products ON p.product_id == products.id
    GROUP BY p.id
  `;

  db.all(sql, [], (err, rows) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Failed to fetch products", detail: err.message });
    }
    res.json(rows);
  });
};
