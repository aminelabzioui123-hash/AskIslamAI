import gradio as gr
import google.generativeai as genai
import os

# إعداد مفتاح جوجل (سنتعلمه في الخطوة القادمة)
api_key = os.getenv("GOOGLE_API_KEY")
genai.configure(api_key=api_key)

def respond(message, history):
    try:
        model = genai.GenerativeModel("gemini-1.5-flash")
        prompt = f"أنت باحث إسلامي متخصص. أجب بدقة من كتب التراث على: {message}"
        response = model.generate_content(prompt)
        return response.text
    except:
        return "أهلاً بك! يرجى التأكد من تفعيل مفتاح الـ API Key لكي أتمكن من إجابتك."

# تصميم الواجهة
with gr.Blocks(theme=gr.themes.Soft(primary_hue="green")) as demo:
    gr.Markdown("# 🌙 AskIslamAI")
    chat = gr.ChatInterface(fn=respond)

demo.launch()
