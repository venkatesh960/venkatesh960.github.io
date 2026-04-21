/**
 * Venkatesh Portfolio - Standalone JS Chat Engine
 * Powered by a local portfolio knowledge base
 */

document.addEventListener('DOMContentLoaded', () => {
    const quickQuestions = [
        "Tell me about Venkatesh",
        "What are his Java skills?",
        "Explain Hisaab Book",
        "How can I contact him?"
    ];

    const portfolioData = {
        name: "Venkatesh Bottupalli",
        title: "Full Stack Java Developer",
        experience: "2+ years of experience building scalable web applications",
        currentRole: "Java Full Stack Developer at Alladi Cloud Solutions since February 2023",
        contact: {
            email: "venkateshbottupalli960@gmail.com",
            linkedin: "linkedin.com/in/venkatesh-bottupalli-79692a253",
            github: "github.com/venkatesh960"
        },
        skills: {
            backend: ["Java 8/11/17", "Spring Boot", "Spring MVC", "Hibernate", "JPA", "REST APIs", "Microservices"],
            frontend: ["Angular", "AngularJS", "TypeScript", "JavaScript", "HTML5", "CSS3", "Responsive UI"],
            devops: ["AWS EC2", "AWS RDS", "CI/CD", "Docker", "Maven", "Git", "SSL/TLS"]
        },
        strengths: [
            "scalable backend architecture",
            "end-to-end product ownership",
            "performance optimization",
            "full-stack delivery across Java, Angular, and AWS"
        ],
        growthAreas: [
            "balancing perfectionism with delivery speed",
            "keeping communication concise in fast-paced meetings"
        ],
        projects: {
            hisaab: {
                name: "Hisaab Book",
                aliases: ["hisaab", "hisaab book", "ledger", "saas"],
                summary: "a production SaaS ledger app for small businesses in India",
                stack: "Spring Boot, Angular, AWS EC2, and CI/CD",
                impact: "It shows strong end-to-end product ownership from database design to deployment."
            },
            actnow: {
                name: "ActNow Portal",
                aliases: ["actnow", "act now", "student portal"],
                summary: "a student engagement portal with practice tests and secure membership management",
                stack: "Angular, JWT, and modular dashboards",
                impact: "It highlights secure frontend architecture and better student engagement flows."
            },
            localtaxi: {
                name: "LocalTaxi",
                aliases: ["localtaxi", "local taxi", "taxi", "cab booking"],
                summary: "an online cab booking system with fare calculation and real-time trip reporting",
                stack: "Spring Boot, SQL, and backend optimization",
                impact: "It reflects backend tuning for faster response under concurrent booking load."
            }
        }
    };

    const responseLibrary = {
        greeting: [
            "Hi! I can walk you through Venkatesh's profile, skills, and featured projects.",
            "Hello! Ask me about Venkatesh's experience, Java stack, projects, or contact details.",
            "Hey! I can help with Venkatesh's background, strengths, and portfolio work."
        ],
        fallback: [
            "I can help with Venkatesh's experience, skills, projects, and contact details. Try asking about Hisaab Book, his Java stack, or his current role.",
            "I am best at portfolio questions about Venkatesh, his featured projects, and his technical strengths. You can also tap one of the suggested prompts.",
            "Try asking me about Venkatesh's work experience, Java and Angular skills, project highlights, or how to contact him."
        ]
    };

    function normalizeText(text) {
        return text.toLowerCase().replace(/[^\w\s]/g, " ").replace(/\s+/g, " ").trim();
    }

    function includesAny(text, terms) {
        return terms.some(term => text.includes(term));
    }

    function pickOne(options) {
        return options[Math.floor(Math.random() * options.length)];
    }

    function getProjectResponse(query) {
        const projects = Object.values(portfolioData.projects);
        const matchedProject = projects.find(project => includesAny(query, project.aliases));

        if (!matchedProject) {
            return null;
        }

        return `${matchedProject.name} is ${matchedProject.summary}. The main stack includes ${matchedProject.stack}. ${matchedProject.impact}`;
    }

    function getPortfolioAnswer(userInput) {
        const query = normalizeText(userInput);

        if (!query) {
            return "Ask me something about Venkatesh's experience, skills, or projects.";
        }

        const projectResponse = getProjectResponse(query);
        if (projectResponse) return projectResponse;

        if (includesAny(query, ["hello", "hi", "hey", "good morning", "good evening"])) {
            return pickOne(responseLibrary.greeting);
        }

        if (includesAny(query, ["about venkatesh", "who is venkatesh", "tell me about venkatesh", "introduce venkatesh", "profile"])) {
            return `${portfolioData.name} is a ${portfolioData.title} with ${portfolioData.experience}. He is currently working as ${portfolioData.currentRole}.`;
        }

        if (includesAny(query, ["experience", "career", "current role", "job", "work"])) {
            return `${portfolioData.name} has ${portfolioData.experience}. In his current role at Alladi Cloud Solutions, he works on backend APIs, frontend delivery, and production-ready application development.`;
        }

        if (includesAny(query, ["skills", "skill", "tech stack", "stack", "technologies", "tools"])) {
            return `Venkatesh works across the full stack. Backend: ${portfolioData.skills.backend.join(", ")}. Frontend: ${portfolioData.skills.frontend.join(", ")}. Cloud and DevOps: ${portfolioData.skills.devops.join(", ")}.`;
        }

        if (includesAny(query, ["java", "spring", "backend", "api", "microservices", "hibernate", "jpa"])) {
            return `Venkatesh's backend strengths include ${portfolioData.skills.backend.join(", ")}. He has hands-on experience building REST APIs, improving performance, and designing scalable service flows.`;
        }

        if (includesAny(query, ["angular", "frontend", "ui", "javascript", "typescript", "html", "css"])) {
            return `On the frontend side, Venkatesh works with ${portfolioData.skills.frontend.join(", ")}. He focuses on responsive UI development and clean modular structure.`;
        }

        if (includesAny(query, ["aws", "cloud", "docker", "deployment", "devops", "ci cd", "cicd"])) {
            return `For cloud and delivery, Venkatesh uses ${portfolioData.skills.devops.join(", ")}. He has experience deploying applications and improving release workflows.`;
        }

        if (includesAny(query, ["projects", "project", "portfolio", "featured work"])) {
            return "Venkatesh's highlighted projects are Hisaab Book, ActNow Portal, and LocalTaxi. Ask me about any of them and I will explain the stack and impact.";
        }

        if (includesAny(query, ["strength", "strengths", "best at"])) {
            return `Venkatesh stands out in ${portfolioData.strengths.join(", ")}.`;
        }

        if (includesAny(query, ["weakness", "weaknesses", "growth area", "improve"])) {
            return `A couple of growth areas are ${portfolioData.growthAreas.join(" and ")}. He works on both while maintaining strong delivery standards.`;
        }

        if (includesAny(query, ["contact", "email", "linkedin", "github", "hire", "reach", "connect"])) {
            return `You can reach Venkatesh at ${portfolioData.contact.email}. LinkedIn: ${portfolioData.contact.linkedin}. GitHub: ${portfolioData.contact.github}.`;
        }

        return pickOne(responseLibrary.fallback);
    }

    // --- 3. UI LOGIC (Chat & Interactions) ---
    const chatFab = document.getElementById('chatFab');
    const chatWindow = document.getElementById('chatWindow');
    const chatBody = document.getElementById('chatBody');
    const chatInput = document.getElementById('chatInput');
    const chatSend = document.getElementById('chatSend');
    const closeChat = document.getElementById('closeChat');
    const chatSuggestions = document.getElementById('chatSuggestions');

    function renderQuickQuestions() {
        if (!chatSuggestions) return;

        chatSuggestions.innerHTML = "";
        quickQuestions.forEach(question => {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'chat-suggestion';
            button.innerText = question;
            button.addEventListener('click', () => {
                chatInput.value = question;
                handleChat();
            });
            chatSuggestions.appendChild(button);
        });
    }

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
        const thinkingDiv = appendTypingMessage();

        // Answer from the local portfolio assistant
        const response = getPortfolioAnswer(query);

        window.setTimeout(() => {
            thinkingDiv.innerHTML = "";
            thinkingDiv.classList.remove('typing');
            thinkingDiv.appendChild(createMessageBadge('AI'));
            thinkingDiv.appendChild(createMessageContent(response));
            chatBody.scrollTop = chatBody.scrollHeight;
        }, 450);
    }

    function createMessageBadge(label) {
        const badge = document.createElement('span');
        badge.className = 'message-badge';
        badge.innerText = label;
        return badge;
    }

    function createMessageContent(text) {
        const content = document.createElement('div');
        content.className = 'message-content';
        content.innerText = text;
        return content;
    }

    function appendTypingMessage() {
        const div = document.createElement('div');
        div.className = 'message bot typing';
        div.appendChild(createMessageBadge('AI'));

        const indicator = document.createElement('div');
        indicator.className = 'typing-indicator';
        indicator.innerHTML = '<span></span><span></span><span></span>';
        div.appendChild(indicator);

        chatBody.appendChild(div);
        chatBody.scrollTop = chatBody.scrollHeight;
        return div;
    }

    function appendMessage(text, sender) {
        const div = document.createElement('div');
        div.className = `message ${sender}`;

        if (sender === 'bot') {
            div.appendChild(createMessageBadge('AI'));
            div.appendChild(createMessageContent(text));
        } else {
            div.appendChild(createMessageContent(text));
        }

        chatBody.appendChild(div);
        chatBody.scrollTop = chatBody.scrollHeight;
        return div;
    }

    chatSend.addEventListener('click', handleChat);
    chatInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleChat(); });
    renderQuickQuestions();

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
            problem: "Small businesses in India struggle with manual credit tracking, often leading to calculation errors and data loss in paper ledgers.",
            strategy: "Engineered a full-stack SaaS solution using Spring Boot (Backend) and Angular (Frontend). Implemented multi-tenant architecture and secure REST APIs for transaction management.",
            impact: "Successfully handles 1000+ simulated requests with zero latency. Improved financial tracking efficiency for micro-businesses by 30%."
        },
        actnow: {
            title: "ActNow Student Portal",
            problem: "Low engagement in student practice modules due to lack of real-time feedback and secure member dashboards.",
            strategy: "Built a modular Angular application with JWT-based session management. Developed real-time performance tracking dashboards and automated practice tests.",
            impact: "Increased user session duration by 40%. Delivered a secure, centralized education portal for multiple student personas."
        },
        localtaxi: {
            title: "LocalTaxi Booking",
            problem: "Legacy taxi systems faced high latency during peak booking hours and inaccurate fare estimations.",
            strategy: "Developed a Spring Boot application with optimized SQL queries and JPA for data persistence. Implemented real-time fare calculation logic based on distance and demand.",
            impact: "Reduced fare calculation time by 30%. Achieved high concurrent booking capacity without performance degradation."
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
