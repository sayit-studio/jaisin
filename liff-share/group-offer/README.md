# 團購方案 LIFF 工具

本資料夾是獨立新增的團購方案工具，不會取代或修改原始專案根目錄的 `index.html`。

## GitHub Pages 路徑

上傳到 `sayit-studio/jaisin` 後，本工具的 HTTPS 預期網址是：

```text
https://sayit-studio.github.io/jaisin/liff-share/group-offer/
```

LINE Developers 的 LIFF Endpoint URL 請填上方網址。

目前 LIFF ID：

```text
2010234607-r7RfEvrr
```

## 檔案

```text
liff-share/group-offer/index.html
liff-share/group-offer/styles.css
liff-share/group-offer/flex-menu-preview.json
liff-share/group-offer/README.md
```

`flex-menu-preview.json` 是主選單 Flex 的可讀版預覽。正式 n8n workflow 內會用 Code 節點動態塞入 `GROUP_OFFER_LIFF_URL`。
