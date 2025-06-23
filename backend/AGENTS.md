# 後端程式碼庫說明（Agents）

以下說明 NBA Real-Time 專案後端程式碼的各模組角色與主要職責：

## 專案結構總覽
```text
backend
├── src/main/java/com/nba/realtime
│   ├── config        設定與 Bean 定義
│   ├── controller    REST 控制器層 (API 端點)
│   ├── dto           資料傳輸物件 (Game / Player 等)
│   ├── interceptor   全域例外處理與錯誤攔截
│   ├── misc          工具類 (RapidAPI 客戶端、屬性綁定)
│   └── service       業務邏輯介面與實作
└── src/main/resources/application.yml     配置檔 (RapidAPI 金鑰、CORS、安全白名單等)
```

## 模組說明

### config
- `RapidApiConfig`：建立 OkHttpClient 與 RapidApiClient Bean，注入 RapidAPI 呼叫設定。
- `SecurityConfig`：設定 CORS、CSRF、無狀態認證與安全白名單 API 路徑。
- `SwaggerConfig`：設定 OpenAPI/Swagger UI API 文件。

### controller
- `GameController`：`/games/{date}` 端點，查詢指定日期的比賽清單。
- `PlayerController`：`/players/statistics/{gameId}` 端點，查詢指定比賽的球員數據。

### service
- `GameService` & `PlayersService`：定義業務邏輯接口。
- `GameServiceImpl` & `PlayersServiceImpl`：實作調用 RapidApiClient 取得資料、反序列化為 DTO。

### dto
- `dto/game`：封裝比賽相關的 Request/Response 資料物件。
- `dto/players`：封裝球員數據相關的 Request/Response 資料物件。
- `ErrorResponse`：自訂全域例外處理回傳格式。

### interceptor
- `RestControllerErrorHandler`：攔截並處理 JSON 解析錯誤、參數驗證失敗、ResponseStatusException 及其他例外，回傳統一格式的 `ErrorResponse`。

### misc
- `RapidApiClient`：使用 OkHttpClient 建構並執行對 RapidAPI 的 HTTP 請求。
- `RapidProperties`：透過 `application.yml` 綁定 `rapidapi.url`、`rapidapi.host`、`rapidapi.key`。

### 其他說明
- `NbaRealtimeApplication`：Spring Boot 啟動類別 (Entry Point)。
- `application.yml`：服務埠號、日誌設定、CORS 與安全白名單、RapidAPI 金鑰等。

## 技術棧
- Java 17 / Spring Boot
- OkHttp / Jackson / Spring Security / Swagger-UI

-- 以上 --
