export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // 1. إيلا كان المستخدم داخل للموقع، صيفط ليه صفحة HTML
    if (url.pathname === "/" || url.pathname === "/index.html") {
      // هاد السطر كيخلي الـ Worker يقرأ ملف index.html ويصيفطو
      // ملاحظة: خاص يكون عندك ملف index.html ف نفي الدليل
      return new Response(await fetch(new Request(url.origin + '/index.html')), {
        headers: { "content-type": "text/html;charset=UTF-8" },
      });
    }

    // 2. إيلا كان الكود كيعيط على الـ AI (API Endpoint)
    if (request.method === "POST" && url.pathname === "/api/chat") {
      const body = await request.json();
      
      // هنا فين كتحط الخدمة ديال الـ AI (مثلاً OpenAI أو Workers AI)
      // هاد الجزء كيحمي الـ API Key ديالك
      const aiResponse = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": env.ANTHROPIC_API_KEY, // الساروت مخبي ف الإعدادات
          "anthropic-version": "2023-06-01"
        },
        body: JSON.stringify(body)
      });

      return aiResponse;
    }

    return new Response("Not Found", { status: 404 });
  }
};
