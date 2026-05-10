import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, 'db', 'sqlite.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    
    // Create product_cpi table if it doesn't exist
    db.run(`CREATE TABLE IF NOT EXISTS product_cpi (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT NOT NULL,
      product_name TEXT NOT NULL,
      price REAL NOT NULL
    )`, (createErr) => {
      if (createErr) {
        console.error('Error creating table:', createErr.message);
      } else {
        console.log('Table "product_cpi" is ready.');

        // Insert initial data
        const initialData = [
          ['2011-10-17', '麥香紅茶', 16],
          ['2012-06-01', '麥香紅茶', 20],
          ['2014-01-15', '麥香紅茶', 20],
          ['2016-07-10', '麥香紅茶', 22],
          ['2018-03-22', '麥香紅茶', 22],
          ['2020-09-05', '麥香紅茶', 25],
          ['2022-04-18', '麥香紅茶', 25],
          ['2023-11-30', '麥香紅茶', 28],
          ['2025-02-14', '麥香紅茶', 30],
          ['2026-05-10', '麥香紅茶', 32]
        ];

        const checkSql = `SELECT COUNT(*) as count FROM product_cpi`;
        db.get(checkSql, [], (err, row) => {
          if (err) {
            console.error('Error checking row count:', err.message);
          } else if (row.count === 0) {
            const insertSql = `INSERT INTO product_cpi (date, product_name, price) VALUES (?, ?, ?)`;
            const stmt = db.prepare(insertSql);
            initialData.forEach((data) => {
              stmt.run(data, (err) => {
                if (err) console.error('Error inserting data:', err.message);
              });
            });
            stmt.finalize(() => {
              console.log('Initial data inserted into "product_cpi".');
            });
          }
        });
      }
    });
  }
});

export default db;
