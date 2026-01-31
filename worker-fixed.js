// Cloudflare Worker - AskIslamAI API Proxy
// نسخة محسّنة بدون أخطاء

export default {
  async fetch(request, env) {
    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    // Handle preflight requests
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: corsHeaders,
        status: 204
      });
    }

    // Only allow POST
    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ 
        error: 'Method not allowed',
        message: 'يُسمح فقط بطلبات POST'
      }), {
        status: 405,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      });
    }

    try {
      // Parse request body
      const requestBody = await request.json();
      
      // Get API key from environment variable
      const ANTHROPIC_API_KEY = env.ANTHROPIC_API_KEY;
      
      if (!ANTHROPIC_API_KEY) {
        return new Response(JSON.stringify({
          error: 'API key not configured',
          message: 'الـ API Key غير مضاف في Environment Variables'
        }), {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders
          }
        });
      }

      // Call Anthropic API
      const anthropicResponse = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify(requestBody)
      });

      // Get response
      const data = await anthropicResponse.json();
      
      // Return response
      return new Response(JSON.stringify(data), {
        status: anthropicResponse.status,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      });

    } catch (error) {
      // Handle errors
      console.error('Worker error:', error);
      
      return new Response(JSON.stringify({
        error: error.message || 'Internal server error',
        message: 'حدث خطأ في معالجة الطلب',
        details: error.toString()
      }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      });
    }
  }
};
