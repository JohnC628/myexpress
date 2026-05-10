# OpenSpec 麥香指數實作過程筆記

這份筆記根據 [OpenSpec_DevLog.md](OpenSpec_DevLog.md) 的規格要求，記錄了「麥香指數：個人化 CPI 物價追蹤網站」的後端實作細節。

## 1. 專案初始化與結構
使用 `express-generator` 初始化專案，並配置為使用 ES Modules (ESM)。

- **核心架構**：Node.js + Express.js
- **主要路徑**：
  - [app.js](app.js)：應用程式進入點，掛載路由。
  - [db.js](db.js)：資料庫連線與初期化。
  - [routes/api.js](routes/api.js)：Backend API 控制核心。

## 2. 資料庫實作 (SQLite)
在 [db.js](db.js) 中實作了自動化的資料表建立流程。

- **資料庫檔案**：`db/sqlite.db`
- **資料表結構** (`product_cpi`)：
  - `id`: INTEGER PRIMARY KEY
  - `date`: TEXT (格式：YYYY-MM-DD)
  - `product_name`: TEXT
  - `price`: REAL
- **初始化邏輯**：程式啟動時會檢查 `CREATE TABLE IF NOT EXISTS`，確保環境正確。

## 3. API 路由開發
在 [routes/api.js](routes/api.js) 中根據規格設計了兩個核心 Endpoint。

### A. 取得所有歷史價格 (`GET /api/quotes`)
- **SQL 指令**：`SELECT * FROM product_cpi ORDER BY date DESC`
- **實作重點**：依據日期降序排列，方便使用者優先看到最新的價格波動。

### B. 新增價格紀錄 (`GET /api/insert`)
- **參數獲取**：透過 `req.query` (Query String) 取得資料。
- **SQL 指令**：使用參數化查詢 `INSERT INTO product_cpi ... VALUES (?, ?, ?)` 避免 SQL Injection。
- **回傳**：回傳操作狀態及新產生的 ID。

## 4. 系統配置
在 [app.js](app.js) 中將 API 模組掛載至 `/api` 路徑：
```javascript
import apiRouter from './routes/api.js';
// ...
app.use('/api', apiRouter);
```

## 5. 前端實作與圖表功能
在 [public/index.html](public/index.html) 中實作了使用者界面與動態功能。

- **數據呈現**：使用 HTML Table 展示歷史價格。
- **動態圖表**：整合 [Chart.js](https://www.chartjs.org/) 展示價格隨時間變化的連通曲線圖。
- **年份篩選**：實作了隱藏/顯示邏輯，允許使用者依年份過濾資料，且圖表會同步反應過濾後的數據。
- **價格預測模組**：根據使用者提供的媒體報導數據（漲幅 25% 與 47%），實作了預測算法，基於資料庫中最新價格生成未來預期價格。

## 6. 未來擴展方向 (待辦清單)
- [x] **前端頁面**：建立 [public/index.html](public/index.html) 與後端 API 連接。
- [x] **圖表呈現**：使用 Chart.js 展示物價走勢。
- [ ] **安全性調整**：將 `/insert` 從 `GET` 修改為 `POST` 以符合 RESTful 規範。
- [ ] **用戶認證**：增加登入功能，區分不同使用者的記錄。
