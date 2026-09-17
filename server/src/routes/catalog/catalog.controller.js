import { db } from "../../sqlite.js";

export const getCatalog = (req, res) => {
  // const type = req.query.type || "";
  // const search = req.query.search || "";

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
  const params = [];

  // if (type) {
  //   sql += " AND d.type = ?";
  //   params.push(type);
  // }

  // if (search) {
  //   sql += " AND (LOWER(d.name) LIKE ? OR LOWER(d.type) LIKE ?)";
  //   params.push(`%${search.toLowerCase()}%`);
  //   params.push(`%${search.toLowerCase()}%`);
  // }

  // sql += " ORDER BY d.id DESC";

  db.all(sql, params, (err, rows) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Failed to fetch catalog", detail: err.message });
    }
    res.json(rows);
  });
};
