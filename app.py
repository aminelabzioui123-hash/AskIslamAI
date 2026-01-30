import os
import gradio as gr
import google.generativeai as genai

# قراءة مفتاح Gemini من Environment Variables
api_key = os.getenv("GOOGLE_API_KEY")
if not api_key:
    raise RuntimeError("GOOGLE_API_KEY is not set")

genai.configure(api_key=api_key)

def ask_islam(message, history):
    model = genai.GenerativeModel("gemini-1.5-flash")

    prompt = (
        "أنت باحث إسلامي متخصص وموثوق. "
        "أجب عن السؤال التالي اعتماداً على أمهات كتب أهل السنة والجماعة "
        "بأسلوب مختصر وواضح:\n\n"
        f"{message}"
    )

    response = model.generate_content(prompt)
    return response.text

# واجهة الدردشة
demo = gr.ChatInterface(
    fn=ask_islam,
    title="🌙 AskIslamAI",
    description="اسأل عن أي مسألة في علوم الدين الإسلامي"
)

# تشغيل التطبيق (متوافق مع Render)
if __name__ == "__main__":
    demo.launch(
        server_name="0.0.0.0",
        server_port=int(os.environ.get("PORT", 10000))
    )
