import express from 'express';
import db from '../db.js';
var router = express.Router();

/* GET 顯示所有產品資料 */
router.get('/quotes', function(req, res) {
  const sql = "SELECT * FROM product_cpi ORDER BY date DESC";
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

/* GET 插入新產品資料 */
router.get('/insert', function(req, res) {
  const { date, product_name, price } = req.query;
  const sql = `INSERT INTO product_cpi (date, product_name, price) VALUES (?, ?, ?)`;
  
  db.run(sql, [date, product_name, price], function(err) {
    if (err) {
      res.status(500).json({ message: "新增失敗", error: err.message });
      return;
    }
    res.json({ message: "新增成功", id: this.lastID });
  });
});

export default router;
