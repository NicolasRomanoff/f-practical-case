import z from "zod";
import { cartSchema } from "../../schemas/orders.schema.js";
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

export const postOrder = (req, res) => {
  const cart = z.safeParse(cartSchema, req.body?.cart);
  if (!cart.success) {
    return res.status(400).json({
      message: "Invalid cart",
      detail: cart.error.message,
    });
  }

  const order = cart.data.reduce(
    (total, { product, quantity }) => {
      total.total_amount += product.price * quantity;
      total.item_count += quantity;
      return total;
    },
    {
      total_amount: 0,
      item_count: 0,
    },
  );

  db.serialize(() => {
    db.run("BEGIN", (err) => {
      if (err) {
        return res.status(500).json({
          message: "Failed to begin order",
          detail: err.message,
        });
      }
    });

    db.run(
      `
      INSERT INTO orders (total_amount, item_count)
      VALUES (?, ?)
      `,
      [order.total_amount, order.item_count],
      function onInsert(err) {
        if (err) {
          db.run("ROLLBACK");
          return res.status(500).json({
            message: "Failed to create order",
            detail: err.message,
          });
        }
        const orderId = this.lastID;
        const values = cart.data.map(() => "(?, ?, ?)").join(", ");
        const params = cart.data.flatMap(({ product, quantity }) => [
          product.product_id,
          product.product_variants_id,
          quantity,
        ]);

        db.run(
          `
        INSERT INTO order_items (
          order_id,
          product_id,
          product_variant_id,
          product_name,
          configuration,
          sku,
          unit_price,
          quantity,
          line_total
          )
          SELECT
          ?,
          p.id,
          pv.id,
          p.name,
          pv.configuration,
          pv.sku,
          p.base_price + pv.price_delta,
          cart.quantity,
          (p.base_price + pv.price_delta) * cart.quantity
          FROM (
            VALUES ${values}
            ) AS cart(
              product_id,
              product_variant_id,
              quantity
              )
              JOIN products AS p
              ON p.id == cart.product_id
              JOIN product_variants AS pv
              ON pv.id == cart.product_variant_id
              AND pv.product_id == p.id
              `,
          [orderId, ...params],
          (err) => {
            if (err) {
              db.run("ROLLBACK");
              return res.status(500).json({
                message: `Failed to insert products of order ${orderId}`,
                detail: err.message,
              });
            }

            db.run("COMMIT", (err) => {
              if (err) {
                db.run("ROLLBACK");
                return res.status(500).json({
                  message: "Failed to create order",
                  detail: err.message,
                });
              }
              return res.status(201).json({
                message: "Order created",
                orderId,
              });
            });
          },
        );
      },
    );
  });
};
