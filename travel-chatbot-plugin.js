(function() {
    // Configuration - customize these values
    const config = {
        apiKey: 'sk-6576b6c321cb47a3a101418b6b607df4', // Replace with your DeepSeek API key
        primaryColor: '#3a86ff',
        secondaryColor: '#4cc9f0',
        botName: 'Travel Assistant',
        botDescription: 'How can I help you today?',
        welcomeMessage: 'Welcome to Travel Assistant! I can help you find tour packages and answer travel questions.',
        initialGreeting: 'Hello! I\'m your travel assistant. How can I help with your travel plans today?',
        quickReplies: ['Tour Packages', 'Booking Help', 'Best Deals'],
        avatarIcon: '✈️', // Can use emoji or Font Awesome class like 'fas fa-plane'
        position: 'right' // 'left' or 'right'
    };

    // Local knowledge base for fallback responses
    const localKnowledge = {
        'tour': [
            "We offer these tour packages:\n\n1. Tropical Getaway (7 days, $1200)\n2. European Explorer (14 days, $2500)\n3. Asian Adventure (10 days, $1800)",
            ["Tropical details", "Europe info", "Asia package"]
        ],
        'book': [
            "You can book online at our website or call 1-800-TOUR-NOW. Need help with a specific package?",
            ["Visit website", "Call now", "Email us"]
        ],
        'deal': [
            "Current deals:\n\n- 20% off Bali packages\n- Family discount for Europe\n- Last-minute Thailand specials",
            ["Bali offer", "Europe deal", "Thailand special"]
        ],
        'default': [
            "I can help with:\n\n1. Tour packages\n2. Booking assistance\n3. Travel recommendations\n\nWhat would you like?",
            ["Tour options", "Help booking", "Destinations"]
        ]
    };

    // Create the plugin HTML structure
    function createChatWidget() {
        const positionClass = config.position === 'left' ? 'left-30' : 'right-30';
        const buttonPosition = config.position === 'left' ? 'left: 30px' : 'right: 30px';
        const containerPosition = config.position === 'left' ? 'left: 30px' : 'right: 30px';

        // Style element
        const style = document.createElement('style');
        style.textContent = `
            .travel-chatbot-button {
                position: fixed;
                bottom: 30px;
                ${buttonPosition};
                width: 60px;
                height: 60px;
                border-radius: 50%;
                background-color: ${config.primaryColor};
                color: white;
                border: none;
                cursor: pointer;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 24px;
                z-index: 9999;
                transition: all 0.3s ease;
            }
            .travel-chatbot-button:hover {
                background-color: ${config.secondaryColor};
                transform: scale(1.1);
            }
            .travel-chatbot-container {
                position: fixed;
                bottom: 100px;
                ${containerPosition};
                width: 380px;
                max-width: calc(100% - 60px);
                height: 500px;
                max-height: 70vh;
                background-color: white;
                border-radius: 8px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                display: flex;
                flex-direction: column;
                overflow: hidden;
                z-index: 9998;
                transform: translateY(20px);
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
            }
            .travel-chatbot-container.active {
                transform: translateY(0);
                opacity: 1;
                visibility: visible;
            }
            .travel-chatbot-header {
                background: linear-gradient(135deg, ${config.primaryColor}, ${config.secondaryColor});
                color: white;
                padding: 15px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .travel-chatbot-header-content {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            .travel-chatbot-avatar {
                width: 40px;
                height: 40px;
                background-color: rgba(255, 255, 255, 0.2);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 18px;
            }
            .travel-chatbot-title h3 {
                font-size: 16px;
                font-weight: 600;
                margin-bottom: 2px;
            }
            .travel-chatbot-title p {
                font-size: 12px;
                opacity: 0.8;
            }
            .travel-chatbot-close-btn {
                background: none;
                border: none;
                color: white;
                font-size: 16px;
                cursor: pointer;
                opacity: 0.8;
                transition: opacity 0.2s;
            }
            .travel-chatbot-close-btn:hover {
                opacity: 1;
            }
            .travel-chatbot-body {
                flex: 1;
                padding: 15px;
                overflow-y: auto;
                background-color: #f5f7fb;
                display: flex;
                flex-direction: column;
                gap: 12px;
            }
            .travel-chatbot-message {
                max-width: 80%;
                padding: 10px 15px;
                border-radius: 18px;
                font-size: 14px;
                line-height: 1.4;
                position: relative;
                animation: fadeIn 0.3s ease;
            }
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .travel-chatbot-bot-message {
                background-color: white;
                border-bottom-left-radius: 4px;
                align-self: flex-start;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
                color: #333;
            }
            .travel-chatbot-user-message {
                background-color: ${config.primaryColor};
                color: white;
                border-bottom-right-radius: 4px;
                align-self: flex-end;
            }
            .travel-chatbot-message-time {
                font-size: 10px;
                opacity: 0.7;
                margin-top: 4px;
                display: block;
                text-align: right;
            }
            .travel-chatbot-quick-replies {
                display: flex;
                flex-wrap: wrap;
                gap: 8px;
                margin-top: 10px;
            }
            .travel-chatbot-quick-reply-btn {
                background-color: rgba(58, 134, 255, 0.1);
                color: ${config.primaryColor};
                border: 1px solid rgba(58, 134, 255, 0.3);
                border-radius: 20px;
                padding: 6px 12px;
                font-size: 12px;
                cursor: pointer;
                transition: all 0.2s;
            }
            .travel-chatbot-quick-reply-btn:hover {
                background-color: rgba(58, 134, 255, 0.2);
            }
            .travel-chatbot-input-area {
                padding: 15px;
                border-top: 1px solid #eee;
                background-color: white;
                display: flex;
                gap: 10px;
            }
            .travel-chatbot-input {
                flex: 1;
                border: 1px solid #ddd;
                border-radius: 20px;
                padding: 10px 15px;
                font-size: 14px;
                outline: none;
                transition: border 0.2s;
            }
            .travel-chatbot-input:focus {
                border-color: ${config.primaryColor};
            }
            .travel-chatbot-send-btn {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background-color: ${config.primaryColor};
                color: white;
                border: none;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: background-color 0.2s;
            }
            .travel-chatbot-send-btn:hover {
                background-color: ${config.secondaryColor};
            }
            .travel-chatbot-typing-indicator {
                display: flex;
                align-items: center;
                gap: 4px;
                margin-left: 10px;
            }
            .travel-chatbot-typing-dot {
                width: 8px;
                height: 8px;
                background-color: #aaa;
                border-radius: 50%;
                animation: travelChatbotTypingAnimation 1.4s infinite ease-in-out;
            }
            .travel-chatbot-typing-dot:nth-child(1) { animation-delay: 0s; }
            .travel-chatbot-typing-dot:nth-child(2) { animation-delay: 0.2s; }
            .travel-chatbot-typing-dot:nth-child(3) { animation-delay: 0.4s; }
            @keyframes travelChatbotTypingAnimation {
                0%, 60%, 100% { transform: translateY(0); }
                30% { transform: translateY(-5px); }
            }
            .travel-chatbot-welcome-message {
                text-align: center;
                padding: 15px;
                background-color: rgba(58, 134, 255, 0.1);
                border-radius: 8px;
                margin-bottom: 15px;
            }
            .travel-chatbot-welcome-message h4 {
                color: ${config.primaryColor};
                margin-bottom: 5px;
            }
            .travel-chatbot-welcome-message p {
                font-size: 12px;
                color: #666;
            }
            @media (max-width: 480px) {
                .travel-chatbot-container {
                    ${containerPosition}: 10px;
                    bottom: 80px;
                    width: calc(100% - 20px);
                    height: 65vh;
                }
                .travel-chatbot-button {
                    ${buttonPosition}: 20px;
                    bottom: 20px;
                    width: 50px;
                    height: 50px;
                    font-size: 20px;
                }
            }
        `;
        document.head.appendChild(style);

        // Create button
        const button = document.createElement('button');
        button.className = 'travel-chatbot-button';
        button.innerHTML = config.avatarIcon.includes('fa-') 
            ? `<i class="${config.avatarIcon}"></i>` 
            : config.avatarIcon;
        button.id = 'travel-chatbot-button';

        // Create container
        const container = document.createElement('div');
        container.className = 'travel-chatbot-container';
        container.id = 'travel-chatbot-container';

        // Header
        const header = document.createElement('div');
        header.className = 'travel-chatbot-header';
        header.innerHTML = `
            <div class="travel-chatbot-header-content">
                <div class="travel-chatbot-avatar">
                    ${config.avatarIcon.includes('fa-') 
                        ? `<i class="${config.avatarIcon}"></i>` 
                        : config.avatarIcon}
                </div>
                <div class="travel-chatbot-title">
                    <h3>${config.botName}</h3>
                    <p>${config.botDescription}</p>
                </div>
            </div>
            <button class="travel-chatbot-close-btn" id="travel-chatbot-close-btn">
                <i class="fas fa-times"></i>
            </button>
        `;

        // Body
        const body = document.createElement('div');
        body.className = 'travel-chatbot-body';
        body.id = 'travel-chatbot-body';
        body.innerHTML = `
            <div class="travel-chatbot-welcome-message">
                <h4>${config.welcomeMessage}</h4>
            </div>
        `;

        // Input area
        const inputArea = document.createElement('div');
        inputArea.className = 'travel-chatbot-input-area';
        inputArea.innerHTML = `
            <input type="text" class="travel-chatbot-input" id="travel-chatbot-input" placeholder="Type your message here..." autocomplete="off">
            <button class="travel-chatbot-send-btn" id="travel-chatbot-send-btn">
                <i class="fas fa-paper-plane"></i>
            </button>
        `;

        // Assemble container
        container.appendChild(header);
        container.appendChild(body);
        container.appendChild(inputArea);

        // Add to DOM
        document.body.appendChild(button);
        document.body.appendChild(container);

        // Initialize chat
        setTimeout(() => {
            addBotMessage(config.initialGreeting, config.quickReplies);
        }, 500);
    }

    // Chat functionality
    let conversationHistory = [
        {
            role: "system",
            content: `You are a helpful travel assistant for a tour packages website. 
                     Provide concise, friendly responses about travel destinations, tour packages, 
                     bookings, and travel advice. Ask clarifying questions when needed. 
                     When discussing tour packages, include key details like duration, highlights, 
                     and price range if available.`
        }
    ];

    function toggleChat() {
        const container = document.getElementById('travel-chatbot-container');
        container.classList.toggle('active');
        if (container.classList.contains('active')) {
            document.getElementById('travel-chatbot-input').focus();
        }
    }

    function addUserMessage(message) {
        if (!message.trim()) return;
        
        const body = document.getElementById('travel-chatbot-body');
        const messageElement = document.createElement('div');
        messageElement.className = 'travel-chatbot-message travel-chatbot-user-message';
        messageElement.innerHTML = `
            ${message}
            <span class="travel-chatbot-message-time">${getCurrentTime()}</span>
        `;
        body.appendChild(messageElement);
        document.getElementById('travel-chatbot-input').value = '';
        scrollToBottom();
        
        conversationHistory.push({
            role: "user",
            content: message
        });
        
        showTypingIndicator();
    }

    function addBotMessage(message, quickReplies = []) {
        const body = document.getElementById('travel-chatbot-body');
        const typingIndicator = document.querySelector('.travel-chatbot-typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
        
        const messageElement = document.createElement('div');
        messageElement.className = 'travel-chatbot-message travel-chatbot-bot-message';
        
        let quickRepliesHTML = '';
        if (quickReplies.length > 0) {
            quickRepliesHTML = '<div class="travel-chatbot-quick-replies">';
            quickReplies.forEach(reply => {
                quickRepliesHTML += `<button class="travel-chatbot-quick-reply-btn" data-reply="${reply}">${reply}</button>`;
            });
            quickRepliesHTML += '</div>';
        }
        
        messageElement.innerHTML = `
            ${message}
            ${quickRepliesHTML}
            <span class="travel-chatbot-message-time">${getCurrentTime()}</span>
        `;
        body.appendChild(messageElement);
        scrollToBottom();
        
        conversationHistory.push({
            role: "assistant",
            content: message
        });
    }

    function showTypingIndicator() {
        const body = document.getElementById('travel-chatbot-body');
        const typingElement = document.createElement('div');
        typingElement.className = 'travel-chatbot-message travel-chatbot-bot-message';
        typingElement.innerHTML = `
            <div class="travel-chatbot-typing-indicator">
                <div class="travel-chatbot-typing-dot"></div>
                <div class="travel-chatbot-typing-dot"></div>
                <div class="travel-chatbot-typing-dot"></div>
            </div>
        `;
        body.appendChild(typingElement);
        scrollToBottom();
    }
    function formatChatResponse(apiResponse) {
    // Convert markdown-like formatting to HTML
    let formatted = apiResponse
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
        .replace(/\*(.*?)\*/g, '<em>$1</em>') // Italics
        .replace(/\n/g, '<br>') // Line breaks
        .replace(/\•/g, '•'); // Bullet points
    
    // Add proper paragraph spacing
    formatted = formatted.replace(/(<br>\s*){2,}/g, '<p></p>');
    
    return formatted;
    
}
    async function callGeminiAPI(message) {
    try {
        const API_KEY = "AIzaSyCKZEG2ZxhI0Hahxoe78t_a3BZfQWdX9co"; // Replace with your actual API Key
        // *** IMPORTANT CHANGE: Using gemini-1.5-flash which is a current, stable model ***
        const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;
        
        // Format messages for Gemini
        // For a chatbot, you'll likely want to maintain a conversation history.
        // This example is still single-turn. For multi-turn, you'd send an array of {role, parts}
        const contents = [{
            role: "user",
            parts: [{ text: message }]
        }];

        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contents: contents,
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 500,
                    topP: 0.9
                }
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error?.message || `API request failed with status ${response.status}`);
        }

        const data = await response.json();
        const rawResponse = data.candidates[0]?.content?.parts[0]?.text || "";
return formatChatResponse(rawResponse);
        //return formatChatResponse(data.candidates[0]?.content?.parts[0])?.text || 
             //  "I couldn't generate a response. Please try again.";

    } catch (error) {
        console.error("Gemini API Error:", error);
        // Fallback response. Ensure getLocalResponse is defined if you use it.
        return "Our AI assistant is currently unavailable. " + 
               (typeof getLocalResponse === 'function' ? getLocalResponse(message)[0] : "Please try again later.");
    }
}
    async function callDeepSeekAPI(message) {
        try {
            const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${config.apiKey}`
                },
                body: JSON.stringify({
                    model: "deepseek-chat",
                    messages: conversationHistory,
                    temperature: 0.7,
                    max_tokens: 500
                })
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                if (response.status === 402) {
                    throw new Error("Payment required");
                } else if (response.status === 401) {
                    throw new Error("Invalid API key");
                } else {
                    throw new Error(`API request failed with status ${response.status}`);
                }
            }
            
            return data.choices[0].message.content;
            
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    function getLocalResponse(message) {
        const lowerMsg = message.toLowerCase();
        for (const [key, value] of Object.entries(localKnowledge)) {
            if (lowerMsg.includes(key)) {
                return value;
            }
        }
        return localKnowledge['default'];
    }

    async function processUserMessage(message) {
        try {
            const response = await callGeminiAPI(message);
            addBotMessage(response);
        } catch (error) {
            console.error('Error:', error);
            const [localResponse, quickReplies] = getLocalResponse(message);
            addBotMessage(localResponse, quickReplies);
        }
    }

    function scrollToBottom() {
        const body = document.getElementById('travel-chatbot-body');
        body.scrollTop = body.scrollHeight;
    }

    function getCurrentTime() {
        const now = new Date();
        return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    // Initialize the plugin
    function init() {
        // Load Font Awesome if not already loaded
        if (!document.querySelector('link[href*="font-awesome"]')) {
            const faLink = document.createElement('link');
            faLink.rel = 'stylesheet';
            faLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
            document.head.appendChild(faLink);
        }

        createChatWidget();

        // Event listeners
        document.getElementById('travel-chatbot-button').addEventListener('click', toggleChat);
        document.getElementById('travel-chatbot-close-btn').addEventListener('click', toggleChat);
        
        document.getElementById('travel-chatbot-send-btn').addEventListener('click', function() {
            const message = document.getElementById('travel-chatbot-input').value.trim();
            if (message) {
                addUserMessage(message);
                processUserMessage(message);
            }
        });
        
        document.getElementById('travel-chatbot-input').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const message = this.value.trim();
                if (message) {
                    addUserMessage(message);
                    processUserMessage(message);
                }
            }
        });
        
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('travel-chatbot-quick-reply-btn')) {
                const replyText = e.target.getAttribute('data-reply');
                addUserMessage(replyText);
                processUserMessage(replyText);
            }
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();