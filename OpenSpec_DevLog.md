# OpenSpec 開發紀錄文件 - 麥香指數：個人化 CPI 物價追蹤網站

## 一、專題目標
建立一個可以記錄商品價格的網站，讓使用者能夠輸入商品價格、查看歷史價格變化，並觀察生活中的物價波動。本專題以「麥香紅茶」作為主要追蹤商品，模擬個人化 CPI 的概念。

## 二、系統需求
### 前端
- HTML
- CSS
- JavaScript

### 後端
- Node.js
- Express.js

### 資料庫
- SQLite

### 測試工具
- Thunder Client

## 三、資料庫設計
### Table: `product_cpi`
| 欄位名稱 | 型態 | 說明 |
|---|---|---|
| id | INTEGER | 主鍵 (PRIMARY KEY, AUTOINCREMENT) |
| date | TEXT | 日期 (YYYY-MM-DD) |
| product_name | TEXT | 商品名稱 |
| price | REAL | 商品價格 |

## 四、API 設計

### 1. 取得所有商品價格
- **Endpoint**: `GET /api/quotes`
- **用途**: 取得所有錄入的商品價格資料（依日期降序排列）。
- **回傳格式**:
  ```json
  [
    {
      "id": 1,
      "date": "2026-05-10",
      "product_name": "麥香紅茶",
      "price": 32
    }
  ]
  ```

### 2. 新增商品價格
- **Endpoint**: `GET /api/insert`
- **參數 (Query String)**: `date`, `product_name`, `price`
- **用途**: 記錄新的商品價格。
- **範例 URL**: `/api/insert?date=2026-05-10&product_name=麥香紅茶&price=32`
- **回傳格式**:
  ```json
  {
    "message": "新增成功",
    "id": 11
  }
  ```

## 五、開發進度紀錄
- [2026-05-10] 初始化專案環境 (Express Generator)
- [2026-05-10] 完成 SQLite 資料庫連接設定
- [2026-05-10] 完成 `products` 資料表建立
- [2026-05-10] 完成 API 路由開發與測試 (Thunder Client)
- [2026-05-10] 撰寫 OpenSpec 開發紀錄文件
