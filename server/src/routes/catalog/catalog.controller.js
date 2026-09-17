import { db } from "../../sqlite.js";

export const getCatalog = (req, res) => {
  let sql = `
    SELECT
      MIN(d.id) AS id,
      d.name,
      d.type,
      COUNT(*) as quantity
    FROM devices d
    WHERE d.owner_id IS NULL
    GROUP BY d.name, d.type
  `;

  db.all(sql, [], (err, rows) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Failed to fetch catalog", detail: err.message });
    }
    res.json(rows);
  });
};
