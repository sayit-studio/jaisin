# 團購方案報價單 HTML 模板

這個模板用來把 Notion 建案DB與驗屋報價DB的資料渲染成固定尺寸圖片。

輸出畫布尺寸：

```text
1415 x 2000
```

本機預覽：

```text
offer-template/index.html?sample=shengmei
offer-template/index.html?sample=aipue
```

`offer-template/assets/` 已放入從你提供範例裁出的建案圖、Logo 與 QR，供本機範例預覽使用。正式自動化時，n8n 會改用 Notion 欄位中的圖片 URL。

## n8n 套資料方式

n8n 從 Notion 讀到建案與報價後，組成以下資料：

```json
{
  "projectName": "鉑金愛悅專屬",
  "projectImage": "https://example.com/project.jpg",
  "brandLogo": "https://example.com/logo.png",
  "qrImage": "https://example.com/qr.png",
  "thresholds": ["開團優惠價", "預約滿5戶", "預約滿20戶"],
  "prices": [
    {
      "room": "三房",
      "values": [9800, 9300, 8800]
    },
    {
      "room": "四房",
      "values": [11800, 11300, 10800]
    }
  ],
  "notes": [
    "備註1：費用內已含驗屋電子報告，假日驗屋不加價。",
    "備註2：詳細檢驗項目可加官方 LINE 索取。",
    "備註3：透天及中古屋另有專案報價。"
  ],
  "phone": "0971-866797",
  "lineId": "@301thssm"
}
```

`notes` 對應 Notion 欄位 `備註1`、`備註2`、`備註3`，新版 A/B/C/D 海報最多顯示三則。

渲染方式有兩種：

1. n8n 產生 HTML 時，在載入 `template.js` 前插入：

```html
<script>
  window.OFFER_DATA = { ... };
</script>
```

2. 或把 JSON encode 後放進網址：

```text
offer-template/index.html?data=ENCODED_JSON
```

## 建議自動化流程

```text
Notion 建案DB
→ n8n 讀建案圖片、建案名稱
→ n8n 讀關聯驗屋報價DB
→ 套入 offer-template
→ 用瀏覽器截圖產 PNG
→ 上傳 Cloudflare R2
→ 圖片 URL 寫回 Notion
→ Flex JSON 使用這張圖作為 hero image
```

Flex 內主圖可直接使用產出的圖片 URL：

```json
{
  "type": "image",
  "url": "https://你的圖床/offer.png",
  "size": "full",
  "aspectRatio": "1415:2000",
  "aspectMode": "cover"
}
```
