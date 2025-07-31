(function() {
    // First define all helper functions that don't depend on config
    function getCurrentTime() {
        const now = new Date();
        return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    function scrollToBottom(element) {
        if (element) {
            element.scrollTop = element.scrollHeight;
        }
    }

    // function formatChatResponse(apiResponse) {
    //     return apiResponse
    //         .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    //         .replace(/\*(.*?)\*/g, '<em>$1</em>')
    //         .replace(/\n/g, '<br>')
    //         .replace(/\•/g, '•');
    // }

    function formatChatResponse(apiResponse) {
    // Convert markdown links to proper HTML links
    let formatted = apiResponse.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" style="color: ' + config.primaryColor + '; text-decoration: none; font-weight: 500;">$1</a>');
    
    // Other formatting replacements
    formatted = formatted
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/\n/g, '<br>')
        .replace(/\•/g, '•');
    
    return formatted;
}

function showPackageCategory(categoryName) {
    const category = config.packageCategories[categoryName];
    if (!category) return;

    // Create a nicely formatted package list
    let packageList = category.packages.map(p => 
        `<div style="margin-bottom: 8px;">
            <span style="color: ${config.primaryColor}; margin-right: 8px;">•</span>
            <a href="${p.url}" target="_blank" style="color: ${config.primaryColor}; text-decoration: none; font-weight: 500;">
                ${p.name}
            </a>
        </div>`
    ).join('');

    const response = `
        <div style="margin-bottom: 12px;">
            <strong style="color: ${config.primaryColor}; font-size: 16px;">${categoryName} Packages</strong>
        </div>
        <div style="margin-bottom: 16px;">
            ${packageList}
        </div>
        <div>Which package interests you?</div>
    `;

    addBotMessage(response, category.quickReplies);
}





    // Then define the config object
    const config = {
       // apiKey: '',
        primaryColor: '#3a86ff',
        secondaryColor: '#4cc9f0',
        botName: 'Ojas Travel Expert',
        botDescription: 'Your guide to spiritual and leisure journeys',
        welcomeMessage: 'Welcome to Divine Travels! I can help you find the perfect pilgrimage or vacation package.',
        initialGreeting: 'Namaste! I\'m your travel expert. How can I assist with your spiritual or leisure travel plans today?',
        avatarIcon: '🛕',
        position: 'right',
        companyInfo: {
            name: "Ojas Travel",
            phone: " +91 9971122441",
            email: "info@ojastravel.com",
            website: "www.ojastravel.com",
            address: "A-997- 2nd Floor, Old Pankha Rd, Uttam Nagar East, Delhi-59"
        },
        packageCategories: {
            'Domestic Tours': {
                packages: [
                    {name: 'North India Tour', url: '/tour-packages/north-india-tour'},
                    {name: 'South India Tour', url: '/tour-packages/south-india-tour'},
                    {name: 'North East India Tour', url: '/tour-packages/north-east-tour'},
                    {name: 'Rajasthan Tour', url: '/tour-packages/rajasthan-tour'},
                    {name: 'Himachal Pradesh Tour', url: '/tour-packages/himachal-tour'},
                    {name: 'Uttarakhand Tour', url: '/tour-packages/uttarakhand-tour'},
                    {name: 'Kashmir Tour', url: '/tour-packages/kashmir-tour'},
                    {name: 'Leh-Ladakh Tour', url: '/tour-packages/leh-ladakh-tour'},
                    {name: 'Kerala Tour', url: '/tour-packages/kerala-tour'},
                    {name: 'Andaman Island Tour', url: '/tour-packages/andaman-and-nicobar-islands'}
                ],
                quickReplies: ['North India Tour Guide', 'South India Tour Guide', 'Himachal Tour Guide', 'Kerala Tour Guide', 'Andaman Tour Guide','Rajasthan Tour Guide','Kashmir Tour Guide','Leh-Ladakh Tour Guide','North East Tour Guide']
            },
            'International Tours': {
                packages: [
                    {name: 'Malaysia Tour', url: '/tour-packages/malaysia-tour'},
                    {name: 'Thailand Tour', url: '/tour-packages/thailand-tour'},
                    {name: 'Dubai Tour', url: '/tour-packages/dubai-tour'},
                    {name: 'Singapore Tour', url: '/tour-packages/singapore-tour'},
                    {name: 'Cambodia Tour', url: '/tour-packages/cambodia-tour'},
                    {name: 'Bhutan Tour', url: '/tour-packages/bhutan-tour'},
                    {name: 'Australia Tour', url: '/tour-packages/australia-tour'}
                ],
                quickReplies: ['Dubai Tour Guide', 'Thailand Tour Guide', 'Singapore Tour Guide', 'Bhutan Tour Guide','Malaysia Tour Guide','Cambodia Tour Guide','Australia Tour Guide']
            },
            'Spiritual Tours': {
                packages: [
                    {name: 'Bada Chardham Yatra', url: '/tour-packages/chardham-yatra'},
                    {name: 'Varanasi Ayodhya Prayagraj Tour', url: '/tour-packages/varanasi-ayodhya-prayagraj-tour'},
                    {name: 'Jyotirlinga Tour', url: '/tour-packages/jyotirlinga-tour'},
                    {name: 'Amarnath Yatra', url: '/tour-packages/amarnath-tour'},
                    {name: 'Hindu Pilgrimage Tour', url: '/tour-packages/hindu-pilgrimage-tour'},
                    {name: 'Vaishno Devi Tour', url: '/tour-packages/vaishno-devi-tour'}
                ],
                quickReplies: ['Chardham Yatra Guide', 'Amarnath Yatra Guide', 'Vaishno Devi Yatra Guide', 'Jyotirlinga Yatra Guide',,'Varanasi Tour Guide',' Ayodhya Tour Guide','Prayagraj Tour Guide','Pilgrimage Tour Guide']
            },
            'Nepal Tours': {
                packages: [
                    {name: 'Nepal Tour Packages', url: '/tour-packages/nepal-tour'},
                    {name: 'Muktinath Yatra', url: '/tour-packages/muktinath-yatra'},
                    {name: 'Nepal Trekking Packages', url: '/tour-packages/nepal-trekking-packages'}
                ],
                quickReplies: ['Nepal Tour Guide', 'Muktinath Yatra Guide', 'Nepal Trekking Tour Guide']
            },
            'Kailash Yatra': {
                packages: [
                    {name: 'Kailash Mansarovar Yatra', url: '/tour-packages/kailash-mansarovar-yatra'},
                    {name: 'Adi Kailash Om Parvat Yatra', url: '/tour-packages/adi-kailash-om-parvat-yatra'},
                    {name: 'Kailash Manimahesh Yatra', url: '/tour-packages/kailash-manimahesh-yatra'},
                    {name: 'Kinner Kailash Yatra', url: '/tour-packages/kinner-kailash-yatra'},
                    {name: 'Shrikhand Kailash Yatra', url: '/tour-packages/shrikhand-kailash-yatra'}
                ],
                quickReplies: ['Kailash Mansarovar Yatra Guide ', 'Adi Kailash Yatra Guide', 'Kinner Kailash Yatra Guide','Shrikhand Kailash Yatra Guide']
            },
            'Resources': {
                packages: [
                    {name: 'Blogs', url: '/Blog'},
                    {name: 'Gallery', url: '/tour-package-gallery'},
                    {name: 'News', url: '/news'},
                    {name: 'Contact', url: '/contact'},
                    {name: 'Enquiry', url: '/enquiry'},
                    {name: 'About Us', url: '/about'}
                ],
                quickReplies: ['Blogs', 'Gallery', 'Contact Us','News','Enquiry','About']
            }
        },
        popularPackages: {
            'Chardham Yatra': {
                response: `🕉️ **Bada Chardham Yatra** 🕉️\n\nJourney to the four sacred abodes:\n\n1. **Yamunotri** - Source of Yamuna\n2. **Gangotri** - Origin of Ganga\n3. **Kedarnath** - Abode of Shiva\n4. **Badrinath** - Home of Vishnu\n\n📌 **Package Options**:\n\n• **Road Package (12 days)** - ₹35,000\n• **Helicopter Package (7 days)** - ₹75,000\n• **Luxury AC Coach (10 days)** - ₹55,000\n\n[View Details](/tour-packages/chardham-yatra)`,
                quickReplies: ["12-day itinerary", "Helicopter cost", "Best time", "Book now"]
            },
            'Amarnath Yatra': {
                response: `🚩 **Amarnath Yatra Packages** 🚩\n\nWe offer several options for this sacred journey:\n\n• **Standard Package (7 days)** - ₹25,000\n• **Deluxe Package (10 days)** - ₹45,000\n• **Helicopter Special (5 days)** - ₹35,000\n\n[View Details](/tour-packages/amarnath-tour)`,
                quickReplies: ["7-day package", "Helicopter package", "Requirements", "Book now"]
            },
            'Kailash Mansarovar': {
                response: `🙏 **Kailash Mansarovar Yatra** 🙏\n\nThis sacred journey includes:\n\n• **18-Day Group Tour** - ₹1,85,000\n• **Helicopter Option** - ₹2,75,000\n\n[View Details](/tour-packages/kailash-mansarovar-yatra)`,
                quickReplies: ["Documents needed", "Physical prep", "Booking process", "Group discounts"]
            },
            'Vaishno Devi': {
                response: `🔱 **Vaishno Devi Packages** 🔱\n\nChoose your spiritual journey:\n\n• **Basic Package (3 days)** - ₹5,500\n• **Helicopter Package (2 days)** - ₹8,500\n• **Family Package (4 days)** - ₹12,000\n\n[View Details](/tour-packages/vaishno-devi-tour)`,
                quickReplies: ["Helicopter booking", "Family package", "Combine tours", "Book now"]
            }
        },
        quickReplies: [
            'Chardham Yatra',
            'Amarnath Yatra',
            'Kailash Mansarovar',
            'Vaishno Devi',
            'Domestic Tours',
            'International Tours',
            'Nepal Tours',
            'Blogs',
            'Contact Us',
            'Enquiry'
        ]
    };

    // Chat functionality
    let conversationHistory = [
        {
            role: "system",
            content: `You are a helpful travel assistant for Divine Travels, specializing in pilgrimage tours across India and Nepal. 
                     Provide concise, friendly responses about travel destinations, tour packages, bookings, and travel advice. 
                     Focus particularly on spiritual journeys like Chardham Yatra, Amarnath Yatra, and Kailash Mansarovar.
                     When discussing tour packages, include key details like duration, highlights, and price range if available.`
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
        scrollToBottom(body);
        
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
                // Check if this is a package with URL
                let url = '';
                for (const category of Object.values(config.packageCategories)) {
                    const foundPackage = category.packages.find(p => p.name === reply);
                    if (foundPackage) {
                        url = foundPackage.url;
                        break;
                    }
                }
                
                if (url) {
                    quickRepliesHTML += `<button class="travel-chatbot-quick-reply-btn" data-reply="${reply}" data-url="${url}">${reply}</button>`;
                } else {
                    quickRepliesHTML += `<button class="travel-chatbot-quick-reply-btn" data-reply="${reply}">${reply}</button>`;
                }
            });
            quickRepliesHTML += '</div>';
        }
   
        messageElement.innerHTML = `
            ${formatChatResponse(message)}
                 ${quickRepliesHTML}
            <span class="travel-chatbot-message-time">${getCurrentTime()}</span>
        `;
        body.appendChild(messageElement);
        scrollToBottom(body);
        
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
        scrollToBottom(body);
    }

    async function callGeminiAPI(message) {


        if (!message.toLowerCase().includes("travel") && !message.toLowerCase().includes("tour")) {
    message += " Tour";
}
        try {
            const API_KEY = "AIzaSyCKZEG2ZxhI0Hahxoe78t_a3BZfQWdX9co";
            const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;
            
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
            return data.candidates[0]?.content?.parts[0]?.text || 
                   "I couldn't generate a response. Please try asking differently or check our website for more information.";

        } catch (error) {
            console.error("Gemini API Error:", error);
            return "Our AI assistant is currently unavailable. " + 
                   "Would you like to fill out our enquiry form for personalized assistance?";
        }
    }

    function handlePackageQuery(packageName) {
        // Check popular packages first
        if (config.popularPackages[packageName]) {
            const {response, quickReplies} = config.popularPackages[packageName];
            addBotMessage(response, quickReplies);
            return;
        }

        // Check all categories for the package
        for (const [category, data] of Object.entries(config.packageCategories)) {
            const foundPackage = data.packages.find(p => 
                p.name.toLowerCase().includes(packageName.toLowerCase()) || 
                packageName.toLowerCase().includes(p.name.toLowerCase())
            );

            if (foundPackage) {
                const response = `✅ **${foundPackage.name}**\n\nI found this package for you:\n\n[View ${foundPackage.name} Details](${foundPackage.url})\n\nWould you like more information or to book this package?`;
                addBotMessage(response, ["More info", "Book now", "Similar packages", "Main menu"]);
                return;
            }
        }

        // If not found, show category options
        addBotMessage(`I can help you with these tour categories:`, 
            Object.keys(config.packageCategories));
    }

    async function processUserMessage(message) {
        const lowerMsg = message.toLowerCase();
        
        // Check if asking for a specific category
        for (const [category, data] of Object.entries(config.packageCategories)) {

// if (lowerMsg.includes(category.toLowerCase())) {
//     showPackageCategory(category);
//     return;
// }

            if (lowerMsg.includes(category.toLowerCase())) {
                const packageList = data.packages.map(p => 
                    `• [${p.name}](${p.url})`
                ).join('\n');
                
                addBotMessage(
                    `🛤️ **${category} Packages** 🛤️\n\n${packageList}\n\nWhich package interests you?`,
                    data.quickReplies
                );
                return;
            }
        }

        // Check popular packages
        for (const [pkg, details] of Object.entries(config.popularPackages)) {
            if (lowerMsg.includes(pkg.toLowerCase())) {
                handlePackageQuery(pkg);
                return;
            }
        }

        // Check other intents
        if (lowerMsg.includes('book') || lowerMsg.includes('reserve')) {
            addBotMessage("You can book packages through:\n\n1. [Online Booking Form](/enquiry)\n2. Phone: " + config.companyInfo.phone + "\n3. WhatsApp: " + config.companyInfo.phone + "\n\nWould you like to book a specific package?", 
                ["Chardham Booking", "Amarnath Booking", "Kailash Booking", "Contact Agent"]);
            return;
        }

        if (lowerMsg.includes('contact') || lowerMsg.includes('call')) {
            addBotMessage(`📞 **Contact Us**\n\nPhone: ${config.companyInfo.phone}\nWhatsApp: ${config.companyInfo.phone}\nEmail: ${config.companyInfo.email}\nAddress: ${config.companyInfo.address}\n\n[Visit Website](${config.companyInfo.website})`, 
                ["Call Now", "WhatsApp", "Email Us", "Main Menu"]);
            return;
        }

        if (lowerMsg.includes('blog') || lowerMsg.includes('article')) {
            addBotMessage("You can find travel blogs and articles here:\n\n[Visit Our Blog](/Blog)\n\nTopics include:\n• Pilgrimage guides\n• Travel tips\n• Destination highlights\n• Spiritual journeys", 
                ["Recent Blogs", "Pilgrimage Guides", "Travel Tips", "Back"]);
            return;
        }

        // If no specific intent found, use AI or default
        try {
            const response = await callGeminiAPI(message);
            addBotMessage(response);
        } catch (error) {
            addBotMessage("I can help with:\n\n1. Tour packages information\n2. Booking assistance\n3. Travel recommendations\n\nWhat would you like?", 
                ["Tour options", "Help booking", "Get a quote"]);
        }
    }

    function createChatWidget() {
        const positionClass = config.position === 'left' ? 'left-30' : 'right-30';
        const buttonPosition = config.position === 'left' ? 'left: 30px' : 'right: 30px';
        const containerPosition = config.position === 'left' ? 'left: 30px' : 'right: 30px';

        // Style element
        const style = document.createElement('style');
        style.textContent = `
            @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap');
            
            * {
                font-family: 'Poppins', sans-serif;
                box-sizing: border-box;
            }
            
            .travel-chatbot-button {
                position: fixed;
                bottom: 30px;
                ${buttonPosition};
                width: 70px;
                height: 70px;
                border-radius: 50%;
                background: linear-gradient(135deg, ${config.primaryColor}, ${config.secondaryColor});
                color: white;
                border: none;
                cursor: pointer;
                box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 28px;
                z-index: 9999;
                transition: all 0.3s ease;
                animation: pulse 2s infinite;
            }
            
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.05); }
                100% { transform: scale(1); }
            }
            
            .travel-chatbot-button:hover {
                transform: scale(1.1) rotate(5deg);
                box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
            }
            
            .travel-chatbot-container {
                position: fixed;
                bottom: 110px;
                ${containerPosition};
                width: 400px;
                max-width: calc(100% - 40px);
                height: 550px;
                max-height: 70vh;
                background-color: white;
                border-radius: 12px;
                box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
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
                    ${containerPosition}: 20px;
                    bottom: 90px;
                    width: calc(100% - 40px);
                    height: 65vh;
                }
                .travel-chatbot-button {
                    ${buttonPosition}: 20px;
                    bottom: 20px;
                    width: 60px;
                    height: 60px;
                    font-size: 24px;
                }
            }
        `;
        document.head.appendChild(style);

        // Create button
        const button = document.createElement('button');
        button.className = 'travel-chatbot-button';
        button.innerHTML = config.avatarIcon;
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
                    ${config.avatarIcon}
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
                <p>Ask about our pilgrimage packages or any travel needs</p>
            </div>
        `;

        // Input area
        const inputArea = document.createElement('div');
        inputArea.className = 'travel-chatbot-input-area';
        inputArea.innerHTML = `
            <input type="text" class="travel-chatbot-input" id="travel-chatbot-input" placeholder="Ask about tours, packages, or bookings..." autocomplete="off">
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
                
                // Check if it has a URL to open
                const url = e.target.getAttribute('data-url');
                if (url) {
                    window.open(url, '_blank');
                } else {
                    processUserMessage(replyText);
                }
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