/**
 * Venkatesh Portfolio - Standalone JS Chat Engine
 * Powered by Google Gemini AI
 */

document.addEventListener('DOMContentLoaded', () => {

    // CONFIGURATION
    const GEMINI_API_KEY = "AIzaSyAMQ3_alta4YudNBP-j8Rgsex5UOnzn2r4";
    
    // List of models to try in order of priority (Latest 2026 models first)
    const MODELS_TO_TRY = [
        "gemini-3.1-flash-preview", 
        "gemini-2.5-flash", 
        "gemini-2.5-pro", 
        "gemini-1.5-flash", 
        "gemini-pro"
    ];
    const VERSIONS_TO_TRY = ["v1beta", "v1"];

    // This prompt "grounds" the AI with Venkatesh's career data
    const SYSTEM_PROMPT = `
        You are the personal AI Assistant for Venkatesh Bottupalli. 
        Your goal is to answer questions about his career, projects, and skills professionally.
        
        IDENTITY: 
        - Name: Venkatesh Bottupalli
        - Title: Full Stack Java Developer (2+ Years Experience)
        - Current Role: Java Full Stack Developer at Alladi Cloud Solutions (Feb 2023 - Present)
        
        KEY PROJECTS:
        1. Hisaab Book: Solo built a production SaaS ledger app for small businesses. Tech: Spring Boot, Angular, AWS EC2, CI/CD.
        2. ActNow: Student portal with practice tests and JWT security.
        3. LocalTaxi: Online cab booking with real-time dashboards and fare logic.
        4. CloudBus: Transportation management system for drivers and bookings.
        5. Simulation Engine: High-concurrency Java multi-threading project handling 1000+ requests.

        TECHNICAL SKILLS:
        - Java (8, 11, 17), Spring Boot, Hibernate, JPA, REST APIs, Microservices.
        - Angular, AngularJS, TypeScript, JavaScript, HTML5, CSS3.
        - AWS (EC2, RDS), CI/CD, Maven, Git, Docker.
        - Database: MySQL, PostgreSQL.

        ACCOLADES:
        - Improved API speed by 30%.
        - Increased user engagement by 40%.
        - Reduced deployment time by 25%.

        INSTRUCTIONS:
        - Be professional, technical, and enthusiastic.
        - If someone asks for contact info: venkateshbottupalli960@gmail.com, linkedin.com/in/venkatesh-bottupalli-79692a253
        - If they ask something unrelated to Venkatesh, politely redirect them to his professional work.
    `;

    // --- 2. THE DYNAMIC AI ENGINE (With Fallbacks) ---
    async function askGemini(userInput) {
        let lastError = "";

        for (const version of VERSIONS_TO_TRY) {
            for (const model of MODELS_TO_TRY) {
                const url = `https://generativelanguage.googleapis.com/${version}/models/${model}:generateContent?key=${GEMINI_API_KEY}`;
                
                try {
                    console.log(`Trying model: ${model} on version: ${version}...`);
                    const response = await fetch(url, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            contents: [{ parts: [{ text: `${SYSTEM_PROMPT}\n\nUser Question: ${userInput}` }] }]
                        })
                    });

                    const data = await response.json();
                    
                    if (response.ok && data.candidates && data.candidates[0].content.parts[0].text) {
                        console.log(`Success with: ${model}`);
                        return data.candidates[0].content.parts[0].text;
                    } else if (response.status !== 404) {
                        // If it's not a 404, it might be a real error (like 429 quota or 400 bad request)
                        lastError = data.error?.message || "Error from Google";
                        break; // Exit model loop for this version
                    }
                } catch (error) {
                    console.error(`Failed ${model}:`, error);
                    lastError = error.message;
                }
            }
        }
        
        return `I'm currently adjusting my neural pathways! (Last Error: ${lastError}). Please contact Venkatesh directly at venkateshbottupalli960@gmail.com if this persists.`;
    }

    // --- 3. UI LOGIC (Chat & Interactions) ---
    const chatFab = document.getElementById('chatFab');
    const chatWindow = document.getElementById('chatWindow');
    const chatBody = document.getElementById('chatBody');
    const chatInput = document.getElementById('chatInput');
    const chatSend = document.getElementById('chatSend');
    const closeChat = document.getElementById('closeChat');

    // Toggle Chat
    chatFab.addEventListener('click', () => {
        chatWindow.classList.toggle('active');
        chatInput.focus();
    });

    closeChat.addEventListener('click', () => chatWindow.classList.remove('active'));

    // Send Message
    async function handleChat() {
        const query = chatInput.value.trim();
        if (!query) return;

        // User message
        appendMessage(query, 'user');
        chatInput.value = '';

        // Bot thinking
        const thinkingDiv = appendMessage("Thinking...", 'bot');
        
        // Call Real AI
        const response = await askGemini(query);
        
        // Replace thinking with real response
        thinkingDiv.innerText = response;
    }

    function appendMessage(text, sender) {
        const div = document.createElement('div');
        div.className = `message ${sender}`;
        div.innerText = text;
        chatBody.appendChild(div);
        chatBody.scrollTop = chatBody.scrollHeight;
        return div;
    }

    chatSend.addEventListener('click', handleChat);
    chatInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleChat(); });

    // --- 4. PORTFOLIO INTERACTIVITY ---
    
    // Reveal Animations on Scroll
    const revealElements = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
        revealElements.forEach(el => {
            const boxTop = el.getBoundingClientRect().top;
            if (boxTop < window.innerHeight * 0.8) {
                el.classList.add('active');
                if (el.id === 'stats') startCounters();
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check

    // Stats Counters
    let countersStarted = false;
    function startCounters() {
        if (countersStarted) return;
        countersStarted = true;
        document.querySelectorAll('.stat-number').forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const increment = target / 50;
            let current = 0;
            const update = () => {
                if (current < target) {
                    current = Math.ceil(current + increment);
                    counter.innerText = current + (counter.innerText.includes('%') ? '%' : '');
                    if (target >= 1000 && current >= target) counter.innerText = "1000+";
                    setTimeout(update, 30);
                } else {
                    counter.innerText = (target >= 1000 ? "1000+" : target) + (counter.innerText.includes('%') ? '%' : '');
                }
            };
            update();
        });
    }

    // Modal Management (Case Studies)
    const projectData = {
        hisaab: {
            title: "Hisaab Book (Digital Ledger)",
            problem: "Small businesses struggle with manual credit tracking, leading to revenue loss and disputes.",
            strategy: "Solo built using Spring Boot & Angular. Deployed on AWS EC2 with CI/CD pipelines.",
            impact: "Successfully handling real-world transactions for micro-businesses in India."
        },
        actnow: {
            title: "ActNow Student Portal",
            problem: "Low engagement in student practice modules due to poor UX and security.",
            strategy: "Implemented JWT session management and modular Angular dashboards for instant updates.",
            impact: "Secured user sessions and centralized education content for multiple student personas."
        },
        localtaxi: {
            title: "LocalTaxi Booking",
            problem: "Latency in fare calculation during concurrent bookings.",
            strategy: "Optimized SQL queries and backend service logic in Spring Boot.",
            impact: "Achieved zero-delay response for trip matches and fare adjustments."
        }
    };

    const modalOverlay = document.getElementById('modalOverlay');
    const modalBody = document.getElementById('modalBody');
    const closeModal = document.getElementById('closeModal');

    document.querySelectorAll('.open-case-study').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const key = e.target.getAttribute('data-project');
            const data = projectData[key];
            if (!data) return;
            modalBody.innerHTML = `
                <h2 style="color:var(--accent-color); margin-bottom:1.5rem;">${data.title}</h2>
                <h4 style="margin-bottom:0.5rem; color:#fff;">Challenge</h4>
                <p style="color:var(--text-dim); margin-bottom:1.5rem;">${data.problem}</p>
                <h4 style="margin-bottom:0.5rem; color:#fff;">Strategy</h4>
                <p style="color:var(--text-dim); margin-bottom:1.5rem;">${data.strategy}</p>
                <h4 style="margin-bottom:0.5rem; color:#fff;">Impact</h4>
                <p style="color:var(--text-dim);">${data.impact}</p>
            `;
            modalOverlay.classList.add('active');
        });
    });

    closeModal.addEventListener('click', () => modalOverlay.classList.remove('active'));
    modalOverlay.addEventListener('click', (e) => { if(e.target === modalOverlay) modalOverlay.classList.remove('active'); });

    // Custom Cursor
    const cursor = document.getElementById('customCursor');
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        cursor.style.display = 'block';
    });

    document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.style.transform = 'translate(-50%, -50%) scale(2)');
        el.addEventListener('mouseleave', () => cursor.style.transform = 'translate(-50%, -50%) scale(1)');
    });
});
