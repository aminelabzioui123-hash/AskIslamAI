import os
import gradio as gr
import google.generativeai as genai

# ===============================
# إعداد مفتاح Gemini
# ===============================
API_KEY = os.getenv("GOOGLE_API_KEY")
if not API_KEY:
    raise RuntimeError("GOOGLE_API_KEY غير موجود في Environment Variables")

genai.configure(api_key=API_KEY)

# ===============================
# دالة الإجابة الشرعية
# ===============================
def ask_islam(message, history):
    model = genai.GenerativeModel("gemini-1.5-flash")
    
    strict_prompt = f"""
أنت باحث إسلامي سُنّي ملتزم بمنهج أهل السنة والجماعة.
التزم بالقواعد التالية حرفياً:
1- لا تجب إلا بدليل من:
   - القرآن الكريم
   - السنة الصحيحة
   - أقوال أئمة أهل السنة المعتمدين
     (مثل: البخاري، مسلم، النووي، ابن تيمية، ابن القيم، الطبري).
2- اذكر الدليل أو المرجع باختصار.
3- إن لم يوجد دليل صريح، فقل فقط: "لا أعلم".
4- يمنع الرأي الشخصي أو الكلام المعاصر بلا أصل.
5- لا تُصدر فتوى، بل بيان علمي فقط.

السؤال:
{message}
"""
    
    try:
        response = model.generate_content(strict_prompt)
        return response.text
    except Exception as e:
        print(f"خطأ: {e}")
        return "حدث خطأ تقني. يرجى المحاولة لاحقاً."

# ===============================
# تصميم إسلامي مخصص
# ===============================
custom_css = """
@import url('https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Cairo:wght@400;600;700&display=swap');

* {
    font-family: 'Cairo', 'Amiri', sans-serif !important;
}

body {
    background: linear-gradient(135deg, #1a472a 0%, #0d2818 100%);
}

.gradio-container {
    max-width: 900px !important;
    margin: auto !important;
    background: rgba(255, 255, 255, 0.98) !important;
    border-radius: 20px !important;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3) !important;
    padding: 2rem !important;
}

/* Header styling */
.header-container {
    text-align: center;
    padding: 2rem 1rem;
    background: linear-gradient(135deg, #1a472a 0%, #2d5a3d 100%);
    border-radius: 15px;
    margin-bottom: 2rem;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.header-title {
    font-family: 'Amiri', serif !important;
    font-size: 2.5rem !important;
    font-weight: 700 !important;
    color: #ffd700 !important;
    margin: 0 !important;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.header-subtitle {
    font-family: 'Cairo', sans-serif !important;
    font-size: 1.1rem !important;
    color: #e8f5e9 !important;
    margin-top: 0.5rem !important;
    line-height: 1.8 !important;
}

/* Chat messages */
.message-row {
    margin: 1rem 0 !important;
}

.user.message {
    background: linear-gradient(135deg, #2d5a3d 0%, #1a472a 100%) !important;
    color: white !important;
    border-radius: 15px 15px 5px 15px !important;
    padding: 1rem 1.2rem !important;
    font-size: 1.05rem !important;
    line-height: 1.8 !important;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15) !important;
}

.bot.message {
    background: #f5f5f5 !important;
    color: #2d5a3d !important;
    border-radius: 15px 15px 15px 5px !important;
    padding: 1rem 1.2rem !important;
    font-size: 1.05rem !important;
    line-height: 1.9 !important;
    border-right: 4px solid #1a472a !important;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1) !important;
}

/* Input box */
textarea {
    border: 2px solid #2d5a3d !important;
    border-radius: 12px !important;
    padding: 1rem !important;
    font-size: 1.05rem !important;
    background: white !important;
    direction: rtl !important;
    text-align: right !important;
}

textarea:focus {
    border-color: #1a472a !important;
    box-shadow: 0 0 0 3px rgba(29, 71, 42, 0.1) !important;
}

/* Send button */
button.primary {
    background: linear-gradient(135deg, #1a472a 0%, #2d5a3d 100%) !important;
    color: white !important;
    border: none !important;
    border-radius: 10px !important;
    padding: 0.8rem 2rem !important;
    font-size: 1.1rem !important;
    font-weight: 600 !important;
    transition: all 0.3s ease !important;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2) !important;
}

button.primary:hover {
    transform: translateY(-2px) !important;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3) !important;
}

/* Examples */
button {
    background: white !important;
    border: 2px solid #2d5a3d !important;
    color: #1a472a !important;
    border-radius: 10px !important;
    padding: 0.7rem 1.2rem !important;
    font-size: 1rem !important;
    transition: all 0.3s ease !important;
    direction: rtl !important;
}

button:hover {
    background: #2d5a3d !important;
    color: white !important;
    transform: translateY(-2px) !important;
}

/* Footer */
.footer-note {
    text-align: center;
    padding: 1.5rem;
    background: #fff8dc;
    border-radius: 10px;
    margin-top: 2rem;
    border: 2px solid #ffd700;
}

.footer-text {
    font-family: 'Cairo', sans-serif !important;
    font-size: 0.95rem !important;
    color: #8b4513 !important;
    line-height: 1.8 !important;
}

/* Scrollbar */
::-webkit-scrollbar {
    width: 10px;
}

::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
}

::-webkit-scrollbar-thumb {
    background: #2d5a3d;
    border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
    background: #1a472a;
}
"""

# ===============================
# واجهة Gradio
# ===============================
with gr.Blocks(css=custom_css, theme=gr.themes.Soft(), title="🌙 AskIslamAI") as demo:
    
    # Header
    gr.HTML("""
        <div class="header-container">
            <h1 class="header-title">🌙 اسأل الإسلام AI</h1>
            <p class="header-subtitle">
                مساعدك الذكي للإجابة على الأسئلة الشرعية وفق منهج أهل السنة والجماعة<br>
                الإجابات مبنية على القرآن الكريم والسنة النبوية وأقوال العلماء المعتبرين
            </p>
        </div>
    """)
    
    # Chatbot
    gr.ChatInterface(
        fn=ask_islam,
        examples=[
            "ما حكم صلاة الجماعة؟",
            "كيف أتوضأ بشكل صحيح؟",
            "ما هي شروط الصيام؟",
            "كيف أحسب زكاة المال؟"
        ],
        cache_examples=False
    )
    
    # Footer
    gr.HTML("""
        <div class="footer-note">
            <p class="footer-text">
                ⚠️ <strong>تنبيه هام:</strong> هذه الإجابات للاستئناس العلمي فقط<br>
                وليست بديلاً عن استشارة العلماء المختصين في القضايا الخاصة والفتاوى الشخصية<br>
                📚 يُنصح بمراجعة المصادر الأصلية والرجوع إلى أهل العلم الثقات
            </p>
        </div>
    """)

# ===============================
# تشغيل التطبيق
# ===============================
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 7860))
    print(f"🚀 Starting AskIslamAI on port {port}")
    demo.launch(
        server_name="0.0.0.0",
        server_port=port,
        share=False
    )
```

---

## **📄 الملف 2: requirements.txt**
```
gradio==4.44.0
google-generativeai
