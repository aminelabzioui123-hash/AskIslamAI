# 🚀 دليل النشر الكامل - AskIslamAI

## المحتويات
1. [إعداد الدومين في Cloudflare](#1-إعداد-الدومين)
2. [رفع الموقع على Namecheap](#2-رفع-الموقع)
3. [إعداد Cloudflare Worker](#3-cloudflare-worker)
4. [الحصول على API Key](#4-api-key)
5. [اختبار الموقع](#5-اختبار)

---

## 1. إعداد الدومين في Cloudflare

### ✅ خطوات ربط الدومين (كنتي بديتيها):

1. **امشي ل Namecheap Dashboard**
   - Domain List → Manage حدا askislamai.com

2. **بدل Nameservers:**
   ```
   الناميسيرفرز القديمة (حيدهم):
   - dns1.registrar-servers.com
   - dns2.registrar-servers.com
   
   الناميسيرفرز الجديدة (زيدهم):
   - cash.ns.cloudflare.com
   - tessa.ns.cloudflare.com
   ```

3. **احفظ التغييرات**
   - انتظر من 2-24 ساعة (عادة كيكون سريع)

4. **تأكد من التفعيل:**
   - Cloudflare غايبعتلك إيميل فاش يتفعل
   - أو امشي ل Cloudflare Dashboard و شوف الإشعارات

---

## 2. رفع الموقع على Namecheap Hosting

### الطريقة 1: عبر cPanel (موصى بها)

1. **دخل لـ cPanel:**
   - امشي ل Namecheap → Hosting List
   - كليكي على "Manage" أو "Go to cPanel"

2. **افتح File Manager:**
   - شوف "Files" في cPanel
   - كليكي على "File Manager"

3. **امشي ل public_html:**
   - هنا فين خاصك ترفع الملفات ديالك

4. **ارفع الملفات:**
   - كليكي على "Upload" فوق
   - اختار الملفات:
     * `index.html`
     * `chat.html`
   - استنى حتى يكمل التحميل

5. **تحقق من الهيكل:**
   ```
   public_html/
   ├── index.html    ← الصفحة الرئيسية
   └── chat.html     ← صفحة المحادثة
   ```

### الطريقة 2: عبر FTP

1. **جيب بيانات FTP:**
   - من Namecheap cPanel → FTP Accounts
   - أو من Account Details

2. **استخدم FileZilla:**
   - Host: `ftp.askislamai.com` أو IP الهوستينغ
   - Username: من cPanel
   - Password: من cPanel
   - Port: 21

3. **اتصل و ارفع الملفات:**
   - امشي ل `/public_html` على الجهة اليمين
   - اسحب الملفات من جهازك لليمين

---

## 3. إعداد Cloudflare Worker للـ API

### خطوة بخطوة:

#### أ. إنشاء Worker

1. **امشي ل Cloudflare Dashboard:**
   ```
   https://dash.cloudflare.com
   ```

2. **اختار Workers & Pages:**
   - من القائمة اليسرى
   - أو من الصفحة الرئيسية

3. **Create Application:**
   - كليكي "Create application"
   - اختار "Create Worker"
   - سمّيه: `askislamai-api`
   - كليكي "Deploy"

#### ب. تعديل الكود

1. **كليكي "Edit code"**

2. **امسح الكود القديم كاملاً**

3. **الصق هذا الكود:**

```javascript
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }

  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  try {
    const requestBody = await request.json()
    
    // استبدل هنا بالـ API Key ديالك
    const ANTHROPIC_API_KEY = 'sk-ant-YOUR-KEY-HERE'
    
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify(requestBody)
    })

    const data = await response.json()
    
    return new Response(JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders
      }
    })
  } catch (error) {
    return new Response(JSON.stringify({ 
      error: error.message,
      details: 'تحقق من الـ API Key والاتصال'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders
      }
    })
  }
}
```

4. **احفظ و انشر:**
   - كليكي "Save and Deploy"
   - انسخ الـ URL (مثال: `https://askislamai-api.your-name.workers.dev`)

#### ج. إضافة API Key بشكل آمن (اختياري لكن موصى به)

بدل ما تحط الـ API Key في الكود مباشرة:

1. **امشي ل Settings:**
   - في صفحة الـ Worker
   - اختار "Variables"

2. **Environment Variables:**
   - كليكي "Add variable"
   - Name: `ANTHROPIC_API_KEY`
   - Value: الـ key ديالك
   - Type: Secret (حتى يكون مشفر)
   - Save

3. **عدل الكود:**
   بدل هذا السطر:
   ```javascript
   const ANTHROPIC_API_KEY = 'sk-ant-YOUR-KEY-HERE'
   ```
   بـ:
   ```javascript
   const ANTHROPIC_API_KEY = env.ANTHROPIC_API_KEY
   ```
   و بدل function signature لـ:
   ```javascript
   async function handleRequest(request, env) {
   ```

---

## 4. الحصول على Anthropic API Key

### الخطوات:

1. **امشي ل:**
   ```
   https://console.anthropic.com
   ```

2. **سجل دخول / أنشئ حساب:**
   - استخدم Gmail أو GitHub

3. **امشي ل API Keys:**
   - من القائمة اليسرى
   - أو الصفحة الرئيسية

4. **Create Key:**
   - كليكي "+ Create Key"
   - سمّيها "AskIslamAI Production"
   - كليكي "Create"

5. **انسخ الـ Key:**
   - **مهم جداً:** انسخها فوراً
   - ماغاتظهرش مرة أخرى!
   - احفظها في مكان آمن

⚠️ **الـ Key كتبدا بـ:** `sk-ant-api03-...`

---

## 5. ربط الـ Worker بالموقع

### تعديل chat.html:

1. **افتح `chat.html` للتعديل**

2. **شوف السطر 521 تقريباً:**
   ```javascript
   const response = await fetch('/api/chat', {
   ```

3. **بدلو بـ URL الـ Worker:**
   ```javascript
   const response = await fetch('https://askislamai-api.your-name.workers.dev', {
   ```

4. **احفظ و ارفع للهوستينغ من جديد**

---

## 6. إعدادات DNS في Cloudflare

### بعد ما تتفعل الناميسيرفرز:

1. **امشي ل Cloudflare Dashboard:**
   - اختار الدومين ديالك `askislamai.com`
   - امشي ل "DNS" → "Records"

2. **تأكد من الريكوردز:**

   **A Record:**
   ```
   Type: A
   Name: @
   Content: [IP الهوستينغ ديالك من Namecheap]
   Proxy: Proxied (السحابة البرتقالية)
   TTL: Auto
   ```

   **CNAME Record:**
   ```
   Type: CNAME
   Name: www
   Content: askislamai.com
   Proxy: Proxied
   TTL: Auto
   ```

3. **جيب IP الهوستينغ:**
   - من Namecheap cPanel
   - Server Information → Shared IP Address
   - أو Account Details

---

## 7. اختبار الموقع

### اختبارات مهمة:

#### أ. اختبار DNS:
```bash
# في Terminal أو CMD
nslookup askislamai.com
```
خاص يظهرلك IP الهوستينغ

#### ب. اختبار الموقع:
1. امشي ل: `https://askislamai.com`
2. خاص تظهر الصفحة الرئيسية
3. كليكي "ابدأ المحادثة"
4. جرب تسأل سؤال

#### ج. اختبار الـ API:
افتح Developer Console (F12):
```javascript
fetch('https://your-worker.workers.dev', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    model: 'claude-3-5-sonnet-20240620',
    max_tokens: 100,
    messages: [{ role: 'user', content: 'السلام عليكم' }]
  })
}).then(r => r.json()).then(console.log)
```

---

## 8. حل المشاكل الشائعة

### المشكلة 1: الموقع ما كيظهرش
**الحل:**
- تحقق من الناميسيرفرز في Namecheap
- استنى 24 ساعة للـ propagation
- جرب في Incognito/Private mode
- امسح الـ cache ديال المتصفح

### المشكلة 2: API ما كتخدمش
**الحل:**
- تحقق من الـ API Key في الـ Worker
- شوف Console (F12) للـ errors:
  ```javascript
  // إذا ظهر CORS error:
  → تحقق من corsHeaders في الـ Worker
  
  // إذا ظهر 401 Unauthorized:
  → الـ API Key غالط أو منتهية
  
  // إذا ظهر 500 Internal Server Error:
  → شوف الـ logs في Cloudflare Workers
  ```

### المشكلة 3: التصميم مكسور
**الحل:**
- تأكد من Google Fonts كتحمل (شوف Network tab)
- تأكد من CSS ما فيهش أخطاء
- جرب امسح cache: Ctrl+Shift+R

### المشكلة 4: بطيء
**الحل:**
- فعّل Cloudflare Caching
- استخدم CDN للـ fonts
- صغّر الصور (لو كاين)

---

## 9. تحسينات إضافية (اختيارية)

### أ. تفعيل HTTPS:
- Cloudflare كيفعلها تلقائياً
- لكن تحقق: SSL/TLS → Full

### ب. Page Rules:
```
Always Use HTTPS
Browser Cache TTL: 4 hours
```

### ج. Caching:
```
امشي ل Caching → Configuration
Caching Level: Standard
```

### د. Security:
```
Security → Settings
Security Level: Medium
Challenge Passage: 30 minutes
```

---

## 10. Checklist النهائي ✅

قبل ما تنشر رسمياً:

- [ ] الناميسيرفرز متبدلة و مفعلة
- [ ] الموقع مرفوع على الهوستينغ
- [ ] DNS Records صحيحة
- [ ] Worker منشور و مختبر
- [ ] API Key صحيحة و محفوظة بشكل آمن
- [ ] الموقع كيفتح على askislamai.com
- [ ] المحادثة كتخدم
- [ ] متجاوب على الموبايل
- [ ] HTTPS مفعل
- [ ] اختبرت على متصفحات مختلفة

---

## 📞 محتاج مساعدة؟

**إذا عطاك مشكل:**
1. شوف قسم "حل المشاكل" فوق
2. افتح Developer Console (F12) و شوف الـ errors
3. تحقق من Cloudflare Analytics للأخطاء

**أدوات مفيدة:**
- [DNS Checker](https://dnschecker.org) - تحقق من DNS propagation
- [SSL Checker](https://www.sslshopper.com/ssl-checker.html) - تحقق من HTTPS
- [PageSpeed Insights](https://pagespeed.web.dev) - سرعة الموقع

---

**بالتوفيق! 🚀**

بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
