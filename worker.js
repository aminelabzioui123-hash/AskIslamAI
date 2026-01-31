export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // إعدادات الـ CORS
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    // 1. التعامل مع طلبات الـ API (ارسال الأسئلة لـ Claude)
    if (url.pathname === "/api/chat" || url.pathname === "/chat") {
      if (request.method === 'OPTIONS') {
        return new Response(null, { headers: corsHeaders });
      }

      if (request.method === 'POST') {
        try {
          const requestBody = await request.json();
          const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-api-key': env.ANTHROPIC_API_KEY, // سيقرأه من الـ Variables في Cloudflare
              'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify(requestBody)
          });

          const data = await response.json();
          return new Response(JSON.stringify(data), {
            headers: { 'Content-Type': 'application/json', ...corsHeaders }
          });
        } catch (error) {
          return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: corsHeaders
          });
        }
      }
    }

    // 2. إذا دخل المستخدم للرابط الرئيسي، نعرض له الواجهة (HTML)
    // ملاحظة: قمت بدمج الـ HTML الأساسي هنا لضمان عمله فوراً
    return new Response(this.getHTML(), {
      headers: { 'Content-Type': 'text/html;charset=UTF-8' }
    });
  },

  getHTML() {
    return `
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AskIslamAI - مساعدك الإسلامي الذكي</title>
    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;700&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'IBM Plex Sans Arabic', sans-serif; background: #0a5f4f; color: white; text-align: center; padding: 50px; }
        .container { max-width: 600px; margin: auto; background: rgba(255,255,255,0.1); padding: 30px; border-radius: 20px; backdrop-filter: blur(10px); }
        button { background: #d4a574; border: none; padding: 10px 20px; border-radius: 10px; cursor: pointer; font-weight: bold; }
        input { width: 80%; padding: 10px; border-radius: 10px; border: none; margin-bottom: 10px; }
        #response { margin-top: 20px; text-align: right; background: rgba(0,0,0,0.2); padding: 15px; border-radius: 10px; min-height: 50px; }
    </style>
</head>
<body>
    <div class="container">
        <h1>AskIslamAI</h1>
        <p>اسأل عن أي مسألة شرعية من المصادر الموثوقة</p>
        <input type="text" id="question" placeholder="اكتب سؤالك هنا...">
        <button onclick="ask()">اسأل الآن</button>
        <div id="response">الإجابة ستظهر هنا...</div>
    </div>

    <script>
        async function ask() {
            const q = document.getElementById('question').value;
            const resDiv = document.getElementById('response');
            resDiv.innerText = "جاري البحث في المصادر...";
            
            try {
                const response = await fetch('/api/chat', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        model: "claude-3-7-sonnet-20250219",
                        max_tokens: 1024,
                        messages: [{ role: "user", content: q }],
                        system: "أنت مساعد إسلامي تجيب من القرآن والسنة فقط."
                    })
                });
                const data = await response.json();
                resDiv.innerText = data.content[0].text;
            } catch (e) {
                resDiv.innerText = "حدث خطأ، تأكد من إعداد API Key في Cloudflare.";
            }
        }
    </script>
</body>
</html>`;
  }
};
