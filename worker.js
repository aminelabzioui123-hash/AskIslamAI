// ============================================
// Cloudflare Worker - AskIslamAI with Hadith Integration
// ============================================

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  // CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  }

  // Handle preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  const url = new URL(request.url)
  
  // ============================================
  // Route 1: Hadith API Proxy
  // ============================================
  if (url.pathname.startsWith('/hadith/')) {
    return handleHadithRequest(url, corsHeaders)
  }
  
  // ============================================
  // Route 2: Chat API (Claude/Groq)
  // ============================================
  if (url.pathname === '/api/chat' && request.method === 'POST') {
    return handleChatRequest(request, corsHeaders)
  }

  // Default response
  return new Response('AskIslamAI API - Routes: /hadith/* or /api/chat', {
    headers: { 'Content-Type': 'text/plain', ...corsHeaders }
  })
}

// ============================================
// معالج طلبات الأحاديث
// ============================================
async function handleHadithRequest(url, corsHeaders) {
  try {
    // استخراج اسم الكتاب من المسار
    // مثال: /hadith/bukhari أو /hadith/muslim
    const pathParts = url.pathname.split('/')
    const bookName = pathParts[2] || 'bukhari'
    
    // GitHub CDN للأحاديث
    const hadithApiUrl = `https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/ara-${bookName}.json`
    
    console.log(`Fetching hadiths from: ${hadithApiUrl}`)
    
    const response = await fetch(hadithApiUrl, {
      cf: {
        // Cache for 1 hour
        cacheTtl: 3600,
        cacheEverything: true
      }
    })
    
    if (!response.ok) {
      throw new Error(`Failed to fetch hadiths: ${response.status}`)
    }
    
    const data = await response.json()
    
    return new Response(JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600',
        ...corsHeaders
      }
    })
  } catch (error) {
    console.error('Hadith API Error:', error)
    return new Response(JSON.stringify({ 
      error: 'Failed to fetch hadiths',
      message: error.message 
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders
      }
    })
  }
}

// ============================================
// معالج طلبات المحادثة
// ============================================
async function handleChatRequest(request, corsHeaders) {
  try {
    const requestBody = await request.json()
    
    // يمكنك استخدام Claude API أو Groq API
    // لتغيير الـ API، عدل الـ URL والـ headers
    
    // الخيار 1: استخدام Claude API (إذا كان عندك API Key)
    // const ANTHROPIC_API_KEY = 'sk-ant-YOUR-KEY-HERE' // من Environment Variables
    // const apiUrl = 'https://api.anthropic.com/v1/messages'
    
    // الخيار 2: استخدام Groq API (مجاني ولكن محدود)
    const GROQ_API_KEY = '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'
    const apiUrl = 'https://api.groq.com/openai/v1/chat/completions'
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`
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
    console.error('Chat API Error:', error)
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

// ============================================
// معالج بحث في الأحاديث (اختياري)
// ============================================
async function searchHadithsInWorker(query, maxResults = 3) {
  const books = ['bukhari', 'muslim', 'abudawud', 'tirmidhi']
  const results = []
  
  try {
    for (const book of books) {
      if (results.length >= maxResults) break
      
      const url = `https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/ara-${book}.json`
      const response = await fetch(url, {
        cf: { cacheTtl: 3600, cacheEverything: true }
      })
      
      if (response.ok) {
        const data = await response.json()
        const hadiths = data.hadiths || []
        
        // البحث البسيط في النصوص
        const matches = hadiths.filter(h => 
          h.text && h.text.includes(query)
        ).slice(0, maxResults - results.length)
        
        results.push(...matches)
      }
    }
    
    return results
  } catch (error) {
    console.error('Search error:', error)
    return []
  }
}

// ============================================
// تصدير للاختبار المحلي (اختياري)
// ============================================
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { handleRequest }
}
