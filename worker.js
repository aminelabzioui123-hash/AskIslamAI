export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    // 1. معالجة طلبات الـ API (المحادثة)
    if (url.pathname === '/api/chat' || request.method === 'POST') {
      if (request.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });
      
      try {
        const requestBody = await request.json();
        const response = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': env.ANTHROPIC_API_KEY,
            'anthropic-version': '2023-06-01'
          },
          body: JSON.stringify(requestBody)
        });
        const data = await response.json();
        return new Response(JSON.stringify(data), {
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        });
      } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: corsHeaders });
      }
    }

    // 2. الجزء الجديد: عرض الموقع (index.html أو chat.html)
    // هذا سيمنع ظهور خطأ "Method not allowed" عند فتح الرابط
    return new Response(`
      <!DOCTYPE html>
      <html lang="ar" dir="rtl">
      <head>
          <meta charset="UTF-8">
          <title>AskIslamAI - Running</title>
          <style>
              body { background: #0a5f4f; color: white; font-family: sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; text-align: center; }
              .card { background: rgba(255,255,255,0.1); padding: 2rem; border-radius: 15px; backdrop-filter: blur(10px); }
              .status { color: #d4a574; font-weight: bold; }
          </style>
      </head>
      <body>
          <div class="card">
              <h1>AskIslamAI API</h1>
              <p class="status">● النظام يعمل بنجاح (2026)</p>
              <p>بإمكانك الآن استخدام واجهة الموقع لإرسال الأسئلة.</p>
          </div>
      </body>
      </html>
    `, {
      headers: { 'Content-Type': 'text/html;charset=UTF-8' }
    });
  }
};
