# 始祖鳥喝咖啡 ☕

一個使用 Hugo + Netlify CMS 建立的咖啡店紀錄網站,具備視覺化編輯器、SEO 優化和高安全性。

## ✨ 特色功能

- 📝 **Netlify CMS 視覺化編輯器** - 類似 WordPress 的後台,支援即時預覽
- 🗺️ **互動式地圖** - 使用 Leaflet.js 顯示咖啡店位置
- 🔍 **即時搜尋** - 快速搜尋咖啡店
- 🏷️ **智慧篩選** - 依地區、風格、價格、評分篩選
- 📱 **響應式設計** - 完美支援手機、平板、電腦
- 🚀 **SEO 優化** - 自動生成 sitemap、結構化資料、meta tags
- 🔒 **高安全性** - 靜態網站,無資料庫漏洞
- 📷 **圖片優化** - 自動 lazy loading
- ⭐ **評分系統** - 視覺化星級評分
- 🎨 **Instagram 風格** - 精美的圖片展示

## 🚀 快速開始

### 方法一:部署到 Netlify(推薦)

1. **Fork 這個專案到你的 GitHub**

2. **在 Netlify 建立新網站**
   - 登入 [Netlify](https://app.netlify.com/)
   - 點擊 "New site from Git"
   - 選擇你的 GitHub repo
   - Build settings 會自動讀取 `netlify.toml`
   - 點擊 "Deploy site"

3. **啟用 Netlify Identity(用於 CMS 登入)**
   - 進入 Site settings > Identity
   - 點擊 "Enable Identity"
   - 在 Registration preferences 選擇 "Invite only"
   - 在 External providers 可以啟用 Google/GitHub 登入

4. **啟用 Git Gateway**
   - 在 Identity 頁面,點擊 "Services" > "Git Gateway"
   - 點擊 "Enable Git Gateway"

5. **邀請自己成為編輯者**
   - 在 Identity 頁面,點擊 "Invite users"
   - 輸入你的 email
   - 檢查信箱並完成註冊

6. **開始使用 CMS**
   - 訪問 `https://你的網站.netlify.app/admin`
   - 使用你註冊的帳號登入
   - 開始新增咖啡店文章!

### 方法二:本地開發

```bash
# 1. Clone 專案
git clone https://github.com/your-username/coffee-journey.git
cd coffee-journey

# 2. 安裝 Hugo(Mac)
brew install hugo

# 或下載 Hugo Extended 版本
# https://github.com/gohugoio/hugo/releases

# 3. 啟動本地伺服器
hugo server -D

# 4. 在瀏覽器開啟
# http://localhost:1313
```

## 📝 使用 Netlify CMS 編輯器

### 登入後台
訪問 `https://你的網站.netlify.app/admin`

### 新增咖啡店文章

1. 點擊 "咖啡店" > "New 咖啡店"
2. 填寫表單:
   - **標題**: 咖啡店名稱
   - **地區**: 選擇城市
   - **評分**: 拖拉星星評分
   - **價格區間**: $, $$, $$$, $$$$
   - **地址、電話、營業時間**
   - **座標**: 用於地圖顯示
   - **上傳照片**: 拖拉圖片即可
   - **撰寫內容**: 使用 Markdown 或富文本編輯器
3. 點擊右上角 "預覽" 查看實際效果
4. 點擊 "Publish" 發布

文章會自動推送到 GitHub,Netlify 會自動部署更新!

## 🗂️ 專案結構

```
coffee-journey/
├── config.toml              # 網站配置
├── netlify.toml            # Netlify 部署配置
├── content/
│   ├── cafes/              # 咖啡店文章
│   └── about/              # 關於頁面
├── themes/
│   └── coffee-theme/       # 自訂主題
│       ├── layouts/        # HTML 模板
│       ├── static/
│       │   ├── css/       # 樣式表
│       │   └── js/        # JavaScript
│       └── assets/
├── static/
│   ├── admin/             # Netlify CMS 後台
│   └── images/            # 圖片資源
└── public/                # 建置後的網站(自動生成)
```

## 🎨 自訂設定

### 修改網站資訊
編輯 `config.toml`:
```toml
baseURL = "https://你的域名.com/"
title = "你的網站名稱"
[params]
  description = "你的網站描述"
  instagram = "你的IG帳號"
```

### 修改主題顏色
編輯 `themes/coffee-theme/static/css/style.css`:
```css
:root {
  --primary-color: #6b4423;    /* 主色調 */
  --secondary-color: #d4a574;  /* 次要色 */
  --accent-color: #c9895d;     /* 強調色 */
}
```

### 新增選單項目
編輯 `config.toml`:
```toml
[[menu.main]]
  name = "新頁面"
  url = "/new-page/"
  weight = 5
```

## 📊 SEO 功能

網站自動生成:
- ✅ Sitemap.xml
- ✅ Robots.txt
- ✅ RSS Feed
- ✅ Open Graph tags
- ✅ Twitter Card tags
- ✅ Schema.org 結構化資料
- ✅ 語義化 HTML
- ✅ 麵包屑導航

### 🔧 SEO 工具整合
支援透過 CMS 後台輕鬆設定:
- ✅ Ahrefs Webmaster Tools 驗證
- ✅ Google Analytics 4 追蹤
- ✅ Google Search Console 驗證
- ✅ Bing Webmaster Tools 驗證

詳細設定教學請看: [SEO-INTEGRATION.md](SEO-INTEGRATION.md)

## 🔒 安全性優勢

- 靜態網站,無資料庫
- HTTPS 加密(Netlify 自動提供)
- 無 SQL 注入風險
- 無後端漏洞
- GitHub OAuth 認證
- 自動防 DDoS

## 🌐 綁定自訂域名

1. 在 Netlify Dashboard:
   - Site settings > Domain management
   - Add custom domain
2. 在你的域名註冊商設定 DNS:
   - 新增 CNAME 記錄指向 `你的網站.netlify.app`
   - 或使用 Netlify DNS

## 📷 圖片最佳化建議

- 使用 Cloudinary 或 imgix 作為圖床(免費額度充足)
- 上傳前建議壓縮圖片(推薦工具:TinyPNG)
- 建議尺寸:
  - 特色圖片:1200x800px
  - 相簿圖片:800x600px
  - 縮圖:400x300px

## 🆘 常見問題

### Q: 如何新增地圖座標?
A: 到 [Google Maps](https://www.google.com/maps) 找到咖啡店,右鍵點擊位置,複製座標即可。

### Q: 可以多人協作嗎?
A: 可以!在 Netlify Identity 邀請其他成員即可。

### Q: 如何備份內容?
A: 所有內容都在 GitHub,自動版本控制和備份。

### Q: 可以匯入舊文章嗎?
A: 可以!將 Markdown 文件放入 `content/cafes/` 即可。

### Q: 支援多語言嗎?
A: 目前是繁體中文,如需多語言可修改 config.toml 設定。

## 📚 技術細節

- **框架**: Hugo v0.122.0 (Extended)
- **CMS**: Netlify CMS v2.0
- **地圖**: Leaflet.js v1.9.4
- **字體**: Noto Sans TC, Playfair Display
- **圖標**: Emoji (無需額外載入)
- **託管**: Netlify (免費方案)

## 🤝 貢獻

歡迎提交 Issue 或 Pull Request!

## 📄 授權

MIT License

## 💬 聯絡

有問題或建議?歡迎開 Issue 或聯絡:
- Email: hello@coffee-journey.com
- Instagram: [@your_instagram](https://instagram.com/your_instagram)

---

用 ❤️ 和 ☕ 製作
