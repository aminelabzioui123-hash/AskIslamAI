<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AskIslamAI - المساعد الإسلامي الذكي</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Katibeh&family=Tajawal:wght@300;400;500;700&family=Amiri:wght@400;700&display=swap" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        :root {
            --primary-green: #0d7377;
            --secondary-green: #14a085;
            --gold: #d4af37;
            --light-bg: #f8f9fa;
            --dark-text: #2c3e50;
            --border-color: #e0e0e0;
            --hover-bg: #f0fffe;
        }

        body {
            font-family: 'Tajawal', sans-serif;
            background: #ffffff;
            min-height: 100vh;
            direction: rtl;
        }

        .katibeh {
            font-family: "Katibeh", serif;
            font-weight: 400;
            font-style: normal;
        }

        .amiri {
            font-family: 'Amiri', serif;
        }

        /* Sidebar */
        .sidebar {
            position: fixed;
            right: 0;
            top: 0;
            width: 280px;
            height: 100vh;
            background: #f8f9fa;
            border-left: 1px solid var(--border-color);
            display: flex;
            flex-direction: column;
            z-index: 100;
            transition: transform 0.3s ease;
        }

        .sidebar.hidden {
            transform: translateX(280px);
        }

        .sidebar-header {
            padding: 1.5rem;
            border-bottom: 1px solid var(--border-color);
        }

        .new-chat-btn {
            width: 100%;
            padding: 1rem;
            background: linear-gradient(135deg, var(--primary-green), var(--secondary-green));
            color: white;
            border: none;
            border-radius: 10px;
            cursor: pointer;
            font-family: 'Tajawal', sans-serif;
            font-weight: 600;
            font-size: 1rem;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            transition: transform 0.2s;
        }

        .new-chat-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(13, 115, 119, 0.3);
        }

        .chat-history {
            flex: 1;
            overflow-y: auto;
            padding: 1rem;
        }

        .chat-history-item {
            padding: 0.8rem 1rem;
            margin-bottom: 0.5rem;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.2s;
            background: white;
            border: 1px solid transparent;
        }

        .chat-history-item:hover {
            background: var(--hover-bg);
            border-color: var(--secondary-green);
        }

        .chat-history-item.active {
            background: var(--hover-bg);
            border-color: var(--secondary-green);
        }

        .chat-title {
            font-weight: 500;
            margin-bottom: 0.3rem;
            color: var(--dark-text);
            font-size: 0.9rem;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }

        .chat-time {
            font-size: 0.75rem;
            color: #888;
        }

        .sidebar-footer {
            padding: 1rem 1.5rem;
            border-top: 1px solid var(--border-color);
        }

        .user-profile {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 0.8rem;
            border-radius: 8px;
            cursor: pointer;
            transition: background 0.2s;
        }

        .user-profile:hover {
            background: white;
        }

        .user-avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            border: 2px solid var(--gold);
        }

        .user-name {
            font-weight: 500;
            color: var(--dark-text);
        }

        /* Main Content */
        .main-content {
            margin-right: 280px;
            height: 100vh;
            display: flex;
            flex-direction: column;
            transition: margin 0.3s ease;
        }

        .main-content.expanded {
            margin-right: 0;
        }

        /* Header */
        .header {
            padding: 1rem 2rem;
            border-bottom: 1px solid var(--border-color);
            background: white;
            display: flex;
            align-items: center;
            justify-content: space-between;
            position: sticky;
            top: 0;
            z-index: 50;
        }

        .header-left {
            display: flex;
            align-items: center;
            gap: 1rem;
        }

        .toggle-sidebar {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0.5rem;
            border-radius: 8px;
            transition: background 0.2s;
        }

        .toggle-sidebar:hover {
            background: var(--light-bg);
        }

        .logo-compact {
            display: flex;
            align-items: center;
            gap: 0.8rem;
        }

        .logo-icon {
            font-size: 1.8rem;
        }

        .logo-text {
            font-size: 1.5rem;
            background: linear-gradient(135deg, var(--primary-green), var(--secondary-green));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .header-right {
            display: flex;
            align-items: center;
            gap: 1rem;
        }

        .login-btn {
            background: linear-gradient(135deg, var(--primary-green), var(--secondary-green));
            color: white;
            border: none;
            padding: 0.7rem 1.5rem;
            border-radius: 8px;
            cursor: pointer;
            font-family: 'Tajawal', sans-serif;
            font-weight: 500;
            transition: transform 0.2s;
        }

        .login-btn:hover {
            transform: translateY(-2px);
        }

        /* Chat Area */
        .chat-area {
            flex: 1;
            overflow-y: auto;
            padding: 2rem;
            background: white;
        }

        .chat-container {
            max-width: 900px;
            margin: 0 auto;
        }

        /* Welcome Screen */
        .welcome-screen {
            text-align: center;
            padding: 4rem 2rem;
        }

        .welcome-icon {
            font-size: 4rem;
            margin-bottom: 1.5rem;
        }

        .welcome-title {
            font-size: 2.5rem;
            color: var(--primary-green);
            margin-bottom: 1rem;
        }

        .welcome-subtitle {
            font-size: 1.1rem;
            color: #666;
            margin-bottom: 0.5rem;
        }

        .bismillah-welcome {
            font-size: 2rem;
            color: var(--gold);
            margin: 2rem 0;
        }

        /* Messages */
        .message {
            margin-bottom: 2rem;
            animation: fadeIn 0.4s ease-in;
        }

        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .message-header {
            display: flex;
            align-items: center;
            gap: 0.8rem;
            margin-bottom: 0.8rem;
        }

        .message-avatar {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.1rem;
            flex-shrink: 0;
        }

        .user-message .message-avatar {
            background: linear-gradient(135deg, var(--gold), #f0d68a);
        }

        .ai-message .message-avatar {
            background: linear-gradient(135deg, var(--primary-green), var(--secondary-green));
        }

        .message-name {
            font-weight: 600;
            color: var(--dark-text);
            font-size: 0.95rem;
        }

        .message-content {
            padding-right: 44px;
            line-height: 1.8;
            color: #2c3e50;
            font-size: 1rem;
        }

        .ai-message .message-content {
            color: #1a1a1a;
        }

        /* Related Questions */
        .related-questions {
            margin-top: 1.5rem;
            padding: 1.5rem;
            background: #f8f9fa;
            border-radius: 12px;
            border: 1px solid var(--border-color);
            animation: fadeIn 0.5s ease-in;
        }

        .related-questions-title {
            font-weight: 600;
            color: var(--primary-green);
            margin-bottom: 1rem;
            font-size: 0.95rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .related-question-btn {
            display: block;
            width: 100%;
            text-align: right;
            padding: 1rem;
            margin-bottom: 0.8rem;
            background: white;
            border: 1px solid var(--border-color);
            border-radius: 8px;
            cursor: pointer;
            font-family: 'Tajawal', sans-serif;
            color: var(--dark-text);
            transition: all 0.2s;
            font-size: 0.95rem;
            line-height: 1.5;
        }

        .related-question-btn:hover {
            border-color: var(--secondary-green);
            background: var(--hover-bg);
            transform: translateX(-4px);
        }

        .related-question-btn:last-child {
            margin-bottom: 0;
        }

        /* Input Area */
        .input-area {
            padding: 1.5rem 2rem 2rem;
            background: white;
            border-top: 1px solid var(--border-color);
        }

        .input-container {
            max-width: 900px;
            margin: 0 auto;
            position: relative;
        }

        .input-wrapper {
            display: flex;
            align-items: flex-end;
            gap: 1rem;
            background: white;
            border: 2px solid var(--border-color);
            border-radius: 16px;
            padding: 1rem;
            transition: border-color 0.2s;
            box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }

        .input-wrapper:focus-within {
            border-color: var(--secondary-green);
            box-shadow: 0 4px 12px rgba(13, 115, 119, 0.1);
        }

        #userInput {
            flex: 1;
            border: none;
            outline: none;
            font-family: 'Tajawal', sans-serif;
            font-size: 1rem;
            resize: none;
            min-height: 24px;
            max-height: 200px;
            line-height: 1.5;
        }

        .input-actions {
            display: flex;
            gap: 0.5rem;
            align-items: center;
        }

        .attach-btn, .send-btn {
            background: none;
            border: none;
            cursor: pointer;
            font-size: 1.3rem;
            padding: 0.5rem;
            border-radius: 8px;
            transition: all 0.2s;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .attach-btn:hover {
            background: var(--light-bg);
        }

        .send-btn {
            background: linear-gradient(135deg, var(--primary-green), var(--secondary-green));
            color: white;
            width: 40px;
            height: 40px;
        }

        .send-btn:hover:not(:disabled) {
            transform: scale(1.05);
            box-shadow: 0 4px 12px rgba(13, 115, 119, 0.3);
        }

        .send-btn:disabled {
            opacity: 0.4;
            cursor: not-allowed;
        }

        .input-hint {
            text-align: center;
            margin-top: 0.8rem;
            font-size: 0.85rem;
            color: #888;
        }

        /* Loading Indicator */
        .typing-indicator {
            display: none;
            padding-right: 44px;
            margin-bottom: 2rem;
        }

        .typing-indicator.active {
            display: block;
        }

        .typing-dots {
            display: flex;
            gap: 0.4rem;
            align-items: center;
        }

        .typing-dots span {
            width: 8px;
            height: 8px;
            background: var(--secondary-green);
            border-radius: 50%;
            animation: bounce 1.4s infinite;
        }

        .typing-dots span:nth-child(2) {
            animation-delay: 0.2s;
        }

        .typing-dots span:nth-child(3) {
            animation-delay: 0.4s;
        }

        @keyframes bounce {
            0%, 80%, 100% { transform: translateY(0); opacity: 0.6; }
            40% { transform: translateY(-10px); opacity: 1; }
        }

        /* Login Modal */
        .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.6);
            z-index: 1000;
            align-items: center;
            justify-content: center;
            backdrop-filter: blur(4px);
        }

        .modal.active {
            display: flex;
        }

        .modal-content {
            background: white;
            padding: 2.5rem;
            border-radius: 20px;
            max-width: 450px;
            width: 90%;
            text-align: center;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            animation: slideUp 0.3s ease-out;
        }

        @keyframes slideUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .modal-icon {
            font-size: 3rem;
            margin-bottom: 1rem;
        }

        .modal-title {
            color: var(--primary-green);
            margin-bottom: 0.5rem;
            font-size: 1.8rem;
        }

        .modal-subtitle {
            color: #666;
            margin-bottom: 2rem;
            font-size: 0.95rem;
        }

        .social-login-btn {
            width: 100%;
            padding: 1rem;
            margin: 0.6rem 0;
            border: 2px solid var(--border-color);
            border-radius: 10px;
            background: white;
            cursor: pointer;
            font-family: 'Tajawal', sans-serif;
            font-size: 1rem;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.8rem;
            transition: all 0.2s;
            font-weight: 500;
        }

        .social-login-btn:hover {
            border-color: var(--secondary-green);
            background: var(--hover-bg);
            transform: translateY(-2px);
        }

        .social-icon {
            font-size: 1.5rem;
        }

        .close-modal {
            background: #f0f0f0;
            border: none;
            padding: 0.8rem 2rem;
            border-radius: 10px;
            margin-top: 1rem;
            cursor: pointer;
            font-family: 'Tajawal', sans-serif;
            font-weight: 500;
            transition: background 0.2s;
        }

        .close-modal:hover {
            background: #e0e0e0;
        }

        /* Responsive */
        @media (max-width: 768px) {
            .sidebar {
                transform: translateX(280px);
            }

            .sidebar.active {
                transform: translateX(0);
            }

            .main-content {
                margin-right: 0;
            }

            .welcome-title {
                font-size: 1.8rem;
            }

            .bismillah-welcome {
                font-size: 1.5rem;
            }

            .chat-area {
                padding: 1rem;
            }

            .input-area {
                padding: 1rem;
            }
        }

        /* Scrollbar Styling */
        ::-webkit-scrollbar {
            width: 8px;
            height: 8px;
        }

        ::-webkit-scrollbar-track {
            background: #f1f1f1;
        }

        ::-webkit-scrollbar-thumb {
            background: #c1c1c1;
            border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
            background: #a8a8a8;
        }
    </style>
</head>
<body>
    <!-- Sidebar -->
    <aside class="sidebar" id="sidebar">
        <div class="sidebar-header">
            <button class="new-chat-btn" onclick="startNewChat()">
                <span>➕</span>
                <span>محادثة جديدة</span>
            </button>
        </div>

        <div class="chat-history" id="chatHistory">
            <!-- Chat history will be populated here -->
        </div>

        <div class="sidebar-footer">
            <div class="user-profile" id="userProfile" onclick="document.getElementById('loginModal').classList.add('active')">
                <div style="width: 40px; height: 40px; background: var(--light-bg); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.2rem;">
                    👤
                </div>
                <div class="user-name">تسجيل الدخول</div>
            </div>
        </div>
    </aside>

    <!-- Main Content -->
    <main class="main-content" id="mainContent">
        <!-- Header -->
        <header class="header">
            <div class="header-left">
                <button class="toggle-sidebar" onclick="toggleSidebar()">☰</button>
                <div class="logo-compact">
                    <div class="logo-icon">☪️</div>
                    <h1 class="logo-text katibeh">AskIslamAI</h1>
                </div>
            </div>
            <div class="header-right">
                <button class="login-btn" id="headerLoginBtn" onclick="document.getElementById('loginModal').classList.add('active')">
                    تسجيل الدخول
                </button>
            </div>
        </header>

        <!-- Chat Area -->
        <div class="chat-area" id="chatArea">
            <div class="chat-container" id="chatContainer">
                <div class="welcome-screen" id="welcomeScreen">
                    <div class="welcome-icon">☪️</div>
                    <h2 class="welcome-title katibeh">AskIslamAI</h2>
                    <p class="welcome-subtitle">المساعد الإسلامي الذكي</p>
                    <div class="bismillah-welcome katibeh">بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</div>
                    <p style="color: #888; font-size: 1rem;">اسأل أي سؤال عن الإسلام وسأجيبك من المصادر الإسلامية المعتمدة</p>
                </div>

                <div id="messagesContainer"></div>

                <div class="typing-indicator" id="typingIndicator">
                    <div class="typing-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Input Area -->
        <div class="input-area">
            <div class="input-container">
                <div class="input-wrapper">
                    <textarea 
                        id="userInput" 
                        placeholder="اكتب سؤالك هنا..."
                        rows="1"
                        onkeydown="handleKeyDown(event)"
                        oninput="autoResize(this)"
                    ></textarea>
                    <div class="input-actions">
                        <button class="attach-btn" title="إرفاق ملف">
                            📎
                        </button>
                        <button class="send-btn" id="sendBtn" onclick="sendMessage()" disabled>
                            ⬆️
                        </button>
                    </div>
                </div>
                <div class="input-hint">
                    AskIslamAI يجيب فقط من المصادر الإسلامية الموثوقة
                </div>
            </div>
        </div>
    </main>

    <!-- Login Modal -->
    <div class="modal" id="loginModal">
        <div class="modal-content">
            <div class="modal-icon">☪️</div>
            <h3 class="modal-title katibeh">مرحباً بك</h3>
            <p class="modal-subtitle">سجل دخولك للحصول على تجربة أفضل وحفظ محادثاتك</p>
            
            <button class="social-login-btn" onclick="loginWithGoogle()">
                <span class="social-icon">🔵</span>
                <span>تسجيل الدخول بحساب جوجل</span>
            </button>
            
            <button class="social-login-btn" onclick="loginWithFacebook()">
                <span class="social-icon">📘</span>
                <span>تسجيل الدخول بحساب فيسبوك</span>
            </button>
            
            <button class="social-login-btn" onclick="loginWithApple()">
                <span class="social-icon">🍎</span>
                <span>تسجيل الدخول بحساب أبل</span>
            </button>
            
            <button class="close-modal" onclick="closeModal()">إلغاء</button>
        </div>
    </div>

    <script>
        // State Management
        let currentUser = null;
        let currentChatId = null;
        let conversations = [];
        let messageHistory = [];

        // DOM Elements
        const sidebar = document.getElementById('sidebar');
        const mainContent = document.getElementById('mainContent');
        const chatArea = document.getElementById('chatArea');
        const chatContainer = document.getElementById('chatContainer');
        const messagesContainer = document.getElementById('messagesContainer');
        const welcomeScreen = document.getElementById('welcomeScreen');
        const userInput = document.getElementById('userInput');
        const sendBtn = document.getElementById('sendBtn');
        const typingIndicator = document.getElementById('typingIndicator');
        const loginModal = document.getElementById('loginModal');
        const chatHistory = document.getElementById('chatHistory');

        // Initialize
        window.addEventListener('load', () => {
            loadUserData();
            loadConversations();
            enableSendButton();
        });

        // Enable/disable send button based on input
        userInput.addEventListener('input', enableSendButton);

        function enableSendButton() {
            sendBtn.disabled = !userInput.value.trim();
        }

        // Auto-resize textarea
        function autoResize(textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px';
        }

        // Handle Enter key
        function handleKeyDown(event) {
            if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                if (!sendBtn.disabled) {
                    sendMessage();
                }
            }
        }

        // Toggle Sidebar
        function toggleSidebar() {
            sidebar.classList.toggle('hidden');
            if (window.innerWidth <= 768) {
                sidebar.classList.toggle('active');
            }
        }

        // Authentication Functions
        function loadUserData() {
            const savedUser = localStorage.getItem('askislam_user');
            if (savedUser) {
                currentUser = JSON.parse(savedUser);
                updateAuthUI();
            }
        }

        function loginWithGoogle() {
            simulateLogin('مستخدم جوجل', 'https://ui-avatars.com/api/?name=G&background=0d7377&color=fff', 'google');
        }

        function loginWithFacebook() {
            simulateLogin('مستخدم فيسبوك', 'https://ui-avatars.com/api/?name=F&background=1877f2&color=fff', 'facebook');
        }

        function loginWithApple() {
            simulateLogin('مستخدم أبل', 'https://ui-avatars.com/api/?name=A&background=000000&color=fff', 'apple');
        }

        function simulateLogin(name, avatar, provider) {
            currentUser = {
                name: name,
                email: `user@${provider}.com`,
                avatar: avatar,
                provider: provider
            };
            localStorage.setItem('askislam_user', JSON.stringify(currentUser));
            updateAuthUI();
            closeModal();
        }

        function updateAuthUI() {
            const userProfile = document.getElementById('userProfile');
            const headerLoginBtn = document.getElementById('headerLoginBtn');
            
            if (currentUser) {
                userProfile.innerHTML = `
                    <img src="${currentUser.avatar}" alt="User" class="user-avatar">
                    <div class="user-name">${currentUser.name}</div>
                `;
                userProfile.onclick = logout;
                headerLoginBtn.textContent = 'تسجيل الخروج';
                headerLoginBtn.onclick = logout;
            }
        }

        function logout() {
            if (confirm('هل تريد تسجيل الخروج؟')) {
                currentUser = null;
                localStorage.removeItem('askislam_user');
                location.reload();
            }
        }

        function closeModal() {
            loginModal.classList.remove('active');
        }

        // Chat Management
        function startNewChat() {
            currentChatId = Date.now().toString();
            messageHistory = [];
            messagesContainer.innerHTML = '';
            welcomeScreen.style.display = 'block';
            userInput.focus();
        }

        function loadConversations() {
            const saved = localStorage.getItem('askislam_conversations');
            if (saved) {
                conversations = JSON.parse(saved);
                renderChatHistory();
            }
        }

        function saveConversation() {
            const conversation = {
                id: currentChatId,
                title: messageHistory.length > 0 ? messageHistory[0].content.substring(0, 50) + '...' : 'محادثة جديدة',
                messages: messageHistory,
                timestamp: Date.now()
            };
            
            const index = conversations.findIndex(c => c.id === currentChatId);
            if (index >= 0) {
                conversations[index] = conversation;
            } else {
                conversations.unshift(conversation);
            }
            
            localStorage.setItem('askislam_conversations', JSON.stringify(conversations));
            renderChatHistory();
        }

        function renderChatHistory() {
            chatHistory.innerHTML = conversations.map(conv => {
                const date = new Date(conv.timestamp);
                const timeStr = formatDate(date);
                
                return `
                    <div class="chat-history-item ${conv.id === currentChatId ? 'active' : ''}" 
                         onclick="loadConversation('${conv.id}')">
                        <div class="chat-title">${conv.title}</div>
                        <div class="chat-time">${timeStr}</div>
                    </div>
                `;
            }).join('');
        }

        function formatDate(date) {
            const now = new Date();
            const diff = now - date;
            const hours = Math.floor(diff / (1000 * 60 * 60));
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            
            if (hours < 1) return 'الآن';
            if (hours < 24) return `منذ ${hours} ساعة`;
            if (days === 1) return 'أمس';
            if (days < 7) return `منذ ${days} أيام`;
            return date.toLocaleDateString('ar-SA');
        }

        function loadConversation(id) {
            const conv = conversations.find(c => c.id === id);
            if (!conv) return;
            
            currentChatId = id;
            messageHistory = conv.messages;
            welcomeScreen.style.display = 'none';
            
            messagesContainer.innerHTML = '';
            messageHistory.forEach(msg => {
                addMessageToUI(msg.content, msg.role);
            });
            
            renderChatHistory();
            chatArea.scrollTop = chatArea.scrollHeight;
        }

        // Send Message
        async function sendMessage() {
            const message = userInput.value.trim();
            if (!message) return;

            // Hide welcome screen on first message
            if (welcomeScreen.style.display !== 'none') {
                welcomeScreen.style.display = 'none';
                currentChatId = Date.now().toString();
            }

            // Add user message
            addMessageToUI(message, 'user');
            messageHistory.push({ role: 'user', content: message });

            // Clear input
            userInput.value = '';
            userInput.style.height = 'auto';
            sendBtn.disabled = true;

            // Show typing indicator
            typingIndicator.classList.add('active');
            chatArea.scrollTop = chatArea.scrollHeight;

            try {
                // Call AI API
                const response = await fetch('https://api.anthropic.com/v1/messages', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'anthropic-version': '2023-06-01'
                    },
                    body: JSON.stringify({
                        model: 'claude-sonnet-4-20250514',
                        max_tokens: 2048,
                        system: `أنت مساعد إسلامي ذكي ومتخصص في الإجابة على الأسئلة الإسلامية من المصادر الموثوقة فقط.

قواعد صارمة يجب اتباعها:
- أجب فقط من القرآن الكريم والسنة النبوية الصحيحة وأقوال العلماء المعتبرين
- استخدم اللغة العربية الفصحى الواضحة والمفهومة
- اذكر المصدر دائماً عند الاقتباس (سورة وآية من القرآن، أو الحديث ورقمه من الكتب الصحيحة)
- إذا كان السؤال خارج النطاق الإسلامي، وجه السائل بلطف للموضوع الإسلامي
- كن محترماً ومتواضعاً في الإجابة، وتذكر أنك تمثل الدين الإسلامي
- إذا لم تكن متأكداً من الإجابة، اعترف بذلك واقترح الرجوع لعالم متخصص
- ركز على الإجابة بطريقة واضحة ومباشرة دون إطالة غير ضرورية
- تجنب الخوض في الخلافات المذهبية واذكر الرأي الراجح مع احترام الآراء الأخرى`,
                        messages: messageHistory
                    })
                });

                const data = await response.json();
                
                if (data.content && data.content[0]) {
                    const aiResponse = data.content[0].text;
                    
                    // Hide typing indicator
                    typingIndicator.classList.remove('active');
                    
                    // Add AI message
                    addMessageToUI(aiResponse, 'assistant');
                    messageHistory.push({ role: 'assistant', content: aiResponse });
                    
                    // Generate and add related questions
                    await generateRelatedQuestions(message);
                    
                    // Save conversation
                    saveConversation();
                } else {
                    throw new Error('Invalid response');
                }
            } catch (error) {
                console.error('Error:', error);
                typingIndicator.classList.remove('active');
                addMessageToUI('عذراً، حدث خطأ في الاتصال. يرجى المحاولة مرة أخرى.', 'assistant');
            }

            userInput.focus();
        }

        function addMessageToUI(text, role) {
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${role === 'user' ? 'user-message' : 'ai-message'}`;
            
            messageDiv.innerHTML = `
                <div class="message-header">
                    <div class="message-avatar">${role === 'user' ? '👤' : '🤖'}</div>
                    <div class="message-name">${role === 'user' ? 'أنت' : 'المساعد الإسلامي'}</div>
                </div>
                <div class="message-content">${formatMessage(text)}</div>
            `;
            
            messagesContainer.appendChild(messageDiv);
            chatArea.scrollTop = chatArea.scrollHeight;
        }

        function formatMessage(text) {
            // Format message text (preserve line breaks, etc.)
            return text.replace(/\n/g, '<br>');
        }

        async function generateRelatedQuestions(userQuestion) {
            try {
                const response = await fetch('https://api.anthropic.com/v1/messages', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'anthropic-version': '2023-06-01'
                    },
                    body: JSON.stringify({
                        model: 'claude-sonnet-4-20250514',
                        max_tokens: 500,
                        messages: [{
                            role: 'user',
                            content: `بناءً على هذا السؤال الإسلامي: "${userQuestion}"

اقترح 4 أسئلة مشابهة أو متعلقة قد يرغب المستخدم في السؤال عنها.

الشروط:
- يجب أن تكون الأسئلة باللغة العربية الفصحى
- يجب أن تكون مرتبطة بالموضوع الإسلامي
- يجب أن تكون واضحة ومباشرة
- يجب أن تكون مختلفة عن السؤال الأصلي

أعطني الأسئلة فقط، كل سؤال في سطر جديد، بدون أرقام أو رموز.`
                        }]
                    })
                });

                const data = await response.json();
                
                if (data.content && data.content[0]) {
                    const questions = data.content[0].text
                        .split('\n')
                        .filter(q => q.trim() && !q.match(/^\d+[\.\-\)]/))
                        .map(q => q.replace(/^[-•*]\s*/, '').trim())
                        .filter(q => q.length > 10)
                        .slice(0, 4);
                    
                    if (questions.length > 0) {
                        addRelatedQuestions(questions);
                    }
                }
            } catch (error) {
                console.error('Error generating related questions:', error);
            }
        }

        function addRelatedQuestions(questions) {
            const relatedDiv = document.createElement('div');
            relatedDiv.className = 'related-questions';
            
            relatedDiv.innerHTML = `
                <div class="related-questions-title">
                    💡 أسئلة مشابهة قد تهمك
                </div>
                ${questions.map(q => `
                    <button class="related-question-btn" onclick="askRelatedQuestion('${q.replace(/'/g, "\\'")}')">
                        ${q}
                    </button>
                `).join('')}
            `;
            
            messagesContainer.appendChild(relatedDiv);
            chatArea.scrollTop = chatArea.scrollHeight;
        }

        function askRelatedQuestion(question) {
            userInput.value = question;
            sendMessage();
        }

        // Auto-focus on input
        userInput.focus();
    </script>
</body>
</html>
