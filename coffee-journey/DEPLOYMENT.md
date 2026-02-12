# 部署指南 🚀

## 步驟 1: 準備 GitHub Repository

### 1.1 創建 GitHub 帳號
如果還沒有,到 [GitHub](https://github.com) 註冊一個免費帳號。

### 1.2 創建新的 Repository
1. 登入 GitHub
2. 點擊右上角 "+" > "New repository"
3. 填寫:
   - Repository name: `coffee-journey` (或你喜歡的名稱)
   - Description: "我的咖啡店紀錄網站"
   - 選擇 "Public" (免費帳號)
   - ❌ 不要勾選 "Initialize this repository with a README"
4. 點擊 "Create repository"

### 1.3 上傳專案到 GitHub

**方法一:使用 GitHub Desktop(推薦給新手)**
1. 下載並安裝 [GitHub Desktop](https://desktop.github.com/)
2. 登入你的 GitHub 帳號
3. File > Add Local Repository
4. 選擇 `coffee-journey` 資料夾
5. 如果提示 "not a git repository",點擊 "create a repository"
6. 填寫 commit message:"Initial commit"
7. 點擊 "Publish repository"

**方法二:使用命令列**
```bash
cd coffee-journey
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/你的帳號/coffee-journey.git
git push -u origin main
```

---

## 步驟 2: 部署到 Netlify

### 2.1 創建 Netlify 帳號
1. 到 [Netlify](https://app.netlify.com/signup)
2. 選擇 "Sign up with GitHub" 更方便

### 2.2 從 GitHub 部署網站
1. 登入後,點擊 "Add new site" > "Import an existing project"
2. 選擇 "Deploy with GitHub"
3. 授權 Netlify 存取你的 GitHub(選擇 "All repositories" 或指定 coffee-journey)
4. 選擇 `coffee-journey` repository
5. **部署設定**(應該會自動讀取 netlify.toml):
   ```
   Build command: hugo --gc --minify
   Publish directory: public
   ```
6. 點擊 "Deploy site"

等待 1-2 分鐘,你的網站就上線了!🎉

### 2.3 查看你的網站
部署完成後,你會看到一個網址,例如:
```
https://random-name-12345.netlify.app
```

點擊進去就能看到你的咖啡網站了!

---

## 步驟 3: 設定 Netlify CMS(視覺化編輯器)

### 3.1 啟用 Identity
1. 在 Netlify Dashboard,選擇你的網站
2. 點擊 "Site settings" > "Identity"
3. 點擊 "Enable Identity"

### 3.2 設定註冊權限
1. 在 Identity 頁面,找到 "Registration"
2. 選擇 "Invite only"(只有你邀請的人才能註冊)

### 3.3 啟用 Git Gateway
1. 在 Identity 頁面,點擊 "Services"
2. 找到 "Git Gateway",點擊 "Enable Git Gateway"

### 3.4 邀請自己
1. 在 Identity 頁面,點擊 "Invite users"
2. 輸入你的 email
3. 檢查信箱,點擊邀請連結
4. 設定你的密碼

### 3.5 登入 CMS 後台
訪問: `https://你的網站.netlify.app/admin`

使用剛剛設定的帳號密碼登入 🎊

---

## 步驟 4: 開始使用!

### 新增第一篇咖啡店文章
1. 登入 `/admin` 後台
2. 點擊 "咖啡店" > "New 咖啡店"
3. 填寫表單(標題、地區、評分等)
4. 上傳照片(直接拖拉圖片到編輯器)
5. 撰寫內容(可以用 Markdown 或富文本編輯器)
6. 點擊右上角 "Publish"

發布後,Netlify 會自動部署更新(約 1-2 分鐘)

### 查看成果
到你的網站首頁,就能看到新文章了!

---

## 步驟 5: 綁定自訂域名(選用)

如果你有自己的域名(例如 `mycoffee.com`):

### 5.1 在 Netlify 新增域名
1. Site settings > Domain management
2. 點擊 "Add custom domain"
3. 輸入你的域名,例如 `mycoffee.com`
4. Netlify 會給你 DNS 設定指示

### 5.2 在域名商設定 DNS
到你購買域名的網站(例如 GoDaddy、Namecheap):

**方法一:使用 CNAME(推薦)**
```
Type: CNAME
Name: www
Value: 你的網站.netlify.app
```

**方法二:使用 A Record**
```
Type: A
Name: @
Value: 75.2.60.5 (Netlify 的 IP)
```

### 5.3 等待 DNS 生效
通常需要 24-48 小時,快的話幾小時就好了。

### 5.4 啟用 HTTPS
Netlify 會自動為你的域名申請免費的 SSL 憑證,等待幾分鐘就會啟用 HTTPS!

---

## 常見問題解答

### Q1: 部署失敗怎麼辦?
A: 檢查 Netlify 的 "Deploys" 頁面,查看錯誤訊息。常見問題:
- Hugo 版本不符:確認 netlify.toml 中的 HUGO_VERSION
- 檔案路徑錯誤:確認所有檔案都正確上傳

### Q2: CMS 登入後看不到內容?
A: 確認:
- Git Gateway 已啟用
- 你的 GitHub 帳號有 repo 的寫入權限
- 檢查瀏覽器 console 是否有錯誤訊息

### Q3: 更新文章後網站沒變化?
A: 
- 確認文章已 publish(不是 draft)
- 等待 Netlify 部署完成(1-2分鐘)
- 清除瀏覽器快取(Ctrl+F5)

### Q4: 圖片上傳失敗?
A:
- 確認圖片大小不超過 5MB
- 圖片格式支援:jpg, png, gif, webp
- 檢查網路連線

### Q5: 如何新增更多編輯者?
A:
- 在 Netlify Identity 邀請新用戶
- 對方收到 email 後設定密碼
- 就可以登入 /admin 編輯了

### Q6: 如何備份內容?
A:
- 所有內容都在 GitHub,自動備份
- 可以隨時 clone repository 到本地
- Netlify 也會保留部署歷史

### Q7: 可以恢復舊版本嗎?
A:
- 在 GitHub 可以看到所有 commit 歷史
- 在 Netlify Deploys 可以 rollback 到任何版本
- 在 CMS 可以看到文章編輯歷史

---

## 進階功能

### Google Analytics
1. 到 [Google Analytics](https://analytics.google.com) 建立帳號
2. 取得追蹤 ID(例如 G-XXXXXXXXXX)
3. 在 `config.toml` 取消註解並填入:
   ```toml
   [params]
     googleAnalytics = "G-XXXXXXXXXX"
   ```
4. 推送到 GitHub,等待部署

### Google Search Console
1. 到 [Google Search Console](https://search.google.com/search-console)
2. 新增資源,輸入你的網站網址
3. 驗證所有權(選擇 HTML 標籤方式最簡單)
4. 提交 sitemap: `https://你的網站.com/sitemap.xml`

### 速度優化
- 使用 Cloudinary 或 imgix 作為圖床
- 壓縮圖片後再上傳
- 啟用 Netlify 的 Asset Optimization

---

## 獲取幫助

- 📚 [Hugo 官方文件](https://gohugo.io/documentation/)
- 📝 [Netlify CMS 文件](https://www.netlifycms.org/docs/)
- 💬 [Netlify 社群論壇](https://answers.netlify.com/)

---

祝你部署順利!☕✨
