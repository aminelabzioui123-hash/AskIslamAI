import gradio as gr
import google.generativeai as genai
import os

# جلب المفتاح السري من إعدادات Render للأمان
api_key = os.getenv("GOOGLE_API_KEY")
genai.configure(api_key=api_key)

def ask_islam(message, history):
    try:
        # إعداد نموذج Gemini
        model = genai.GenerativeModel("gemini-1.5-flash")
        
        # توجيه الذكاء الاصطناعي ليكون باحثاً شرعياً
        system_prompt = f"أنت باحث إسلامي متخصص وموثوق. أجب على السؤال التالي بناءً على أمهات كتب أهل السنة والجماعة باختصار ودقة: {message}"
        
        response = model.generate_content(system_prompt)
        return response.text
    except Exception as e:
        return f"عذراً، حدث خطأ: تأكد من إعداد GOOGLE_API_KEY بشكل صحيح في إعدادات Environment بـ Render."

# تصميم واجهة الموقع بألوان إسلامية
with gr.Blocks(theme=gr.themes.Soft(primary_hue="green")) as demo:
    gr.Markdown("# 🌙 AskIslamAI")
    gr.Markdown("### اسأل عن أي شيء في علوم الدين واستلم الإجابة من كتب التراث")
    
    chat = gr.ChatInterface(
        fn=ask_islam,
    )

# تصحيح الجزء الأخير (المسافات ضرورية جداً في Python)
if __name__ == "__main__":
    demo.launch(server_name="0.0.0.0", server_port=10000)
