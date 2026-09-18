import { db } from "./../../sqlite.js";

export const getOrders = (_, res) => {
  const sql = `
    SELECT
      o.id AS id,
      total_amount,
      item_count,
      o.created_at AS orders_create_at,
      order_items.id AS item_id,
      product_id,
      product_variant_id,
      product_name,
      configuration,
      sku,
      unit_price,
      quantity,
      line_total,
      order_items.created_at AS order_items_create_at
    FROM orders AS o
    INNER JOIN order_items ON o.id == order_items.order_id
  `;

  db.all(sql, [], (err, rows) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Failed to fetch orders", detail: err.message });
    }

    const createItem = (row) => {
      return {
        id: row.item_id,
        product_id: row.product_id,
        product_variant_id: row.product_variant_id,
        product_name: row.product_name,
        configuration: row.configuration,
        sku: row.sku,
        unit_price: row.unit_price,
        quantity: row.quantity,
        line_total: row.line_total,
        create_at: row.order_items_create_at,
      };
    };

    const newRows = rows.reduce((orders, row) => {
      if (!orders.has(row.id)) {
        orders.set(row.id, {
          id: row.id,
          total_amount: row.total_amount,
          item_count: row.item_count,
          create_at: row.orders_create_at,
          items: [],
        });
      }
      const order = orders.get(row.id);
      order.items.push(createItem(row));
      return orders;
    }, new Map());

    res.json([...newRows.values()]);
  });
};
