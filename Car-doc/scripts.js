document.addEventListener('DOMContentLoaded', function() {
    // Theme toggling functionality
    setupThemeToggle();
    
    // Background animations
    createBackgroundAnimation();
    
    // Interactive animations
    setupInteractiveAnimations();
    
    // Page-specific initializations
    initializeCurrentPage();
});

// Theme Toggle Setup
function setupThemeToggle() {
    // Create toggle button if it doesn't exist
    if (!document.getElementById('theme-toggle')) {
        const toggleBtn = document.createElement('button');
        toggleBtn.id = 'theme-toggle';
        toggleBtn.className = 'theme-toggle-btn';
        toggleBtn.innerHTML = '<span class="toggle-icon">🌙</span>';
        toggleBtn.setAttribute('aria-label', 'Toggle light/dark theme');
        
        // Position the toggle button
        toggleBtn.style.position = 'fixed';
        toggleBtn.style.top = '680px';
        toggleBtn.style.right = '20px';
        toggleBtn.style.zIndex = '1000';
        toggleBtn.style.borderRadius = '30%';
        toggleBtn.style.width = '40px';
        toggleBtn.style.height = '40px';
        toggleBtn.style.display = 'flex';
        toggleBtn.style.justifyContent = 'center';
        toggleBtn.style.alignItems = 'center';
        toggleBtn.style.cursor = 'pointer';
        toggleBtn.style.transition = 'all 0.3s ease';
        toggleBtn.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
        
        document.body.appendChild(toggleBtn);
        
        // Set initial theme based on user preference or default
        const currentTheme = localStorage.getItem('theme') || 'dark';
        if (currentTheme === 'light') {
            document.documentElement.style.setProperty('--bg-primary', 'var(--light-bg-primary)');
            document.documentElement.style.setProperty('--bg-secondary', 'var(--light-bg-secondary)');
            document.documentElement.style.setProperty('--text-primary', 'var(--light-text-primary)');
            document.documentElement.style.setProperty('--text-secondary', 'var(--light-text-secondary)');
            document.documentElement.style.setProperty('--accent-primary', 'var(--light-accent-primary)');
            document.documentElement.style.setProperty('--accent-secondary', 'var(--light-accent-secondary)');
            document.documentElement.style.setProperty('--border-color', 'var(--light-border)');
            toggleBtn.querySelector('.toggle-icon').textContent = '☀️';
        }
        
        // Add event listener for theme toggle
        toggleBtn.addEventListener('click', function() {
            const isDarkTheme = document.documentElement.style.getPropertyValue('--bg-primary') === 'var(--dark-bg-primary)';
            
            if (isDarkTheme) {
                // Switch to light theme
                document.documentElement.style.setProperty('--bg-primary', 'var(--light-bg-primary)');
                document.documentElement.style.setProperty('--bg-secondary', 'var(--light-bg-secondary)');
                document.documentElement.style.setProperty('--text-primary', 'var(--light-text-primary)');
                document.documentElement.style.setProperty('--text-secondary', 'var(--light-text-secondary)');
                document.documentElement.style.setProperty('--accent-primary', 'var(--light-accent-primary)');
                document.documentElement.style.setProperty('--accent-secondary', 'var(--light-accent-secondary)');
                document.documentElement.style.setProperty('--border-color', 'var(--light-border)');
                this.querySelector('.toggle-icon').textContent = '☀️';
                localStorage.setItem('theme', 'light');
            } else {
                // Switch to dark theme
                document.documentElement.style.setProperty('--bg-primary', 'var(--dark-bg-primary)');
                document.documentElement.style.setProperty('--bg-secondary', 'var(--dark-bg-secondary)');
                document.documentElement.style.setProperty('--text-primary', 'var(--dark-text-primary)');
                document.documentElement.style.setProperty('--text-secondary', 'var(--dark-text-secondary)');
                document.documentElement.style.setProperty('--accent-primary', 'var(--dark-accent-primary)');
                document.documentElement.style.setProperty('--accent-secondary', 'var(--dark-accent-secondary)');
                document.documentElement.style.setProperty('--border-color', 'var(--dark-border)');
                this.querySelector('.toggle-icon').textContent = '🌙';
                localStorage.setItem('theme', 'dark');
            }
            
            // Refresh animations after theme change
            refreshAnimations();
        });
    }
}

// Background Animation
function createBackgroundAnimation() {
    // Create animated background elements
    const bgElements = document.createElement('div');
    bgElements.className = 'bg-animation';
    bgElements.style.position = 'fixed';
    bgElements.style.top = '0';
    bgElements.style.left = '0';
    bgElements.style.width = '100%';
    bgElements.style.height = '100%';
    bgElements.style.zIndex = '-1';
    bgElements.style.overflow = 'hidden';
    bgElements.style.pointerEvents = 'none';
    
    // Add animated elements to background
    for (let i = 0; i < 20; i++) {
        const element = document.createElement('div');
        element.style.position = 'absolute';
        element.style.width = '2px';
        element.style.height = '2px';
        element.style.borderRadius = '50%';
        element.style.backgroundColor = 'var(--accent-primary)';
        element.style.opacity = '0.2';
        element.style.animation = `float ${5 + Math.random() * 10}s linear infinite`;
        element.style.animationDelay = `${Math.random() * 5}s`;
        element.style.left = `${Math.random() * 100}%`;
        element.style.top = `${Math.random() * 100}%`;
        bgElements.appendChild(element);
    }
    
    document.body.appendChild(bgElements);
    
    // Add keyframes for animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% {
                transform: translateY(0) translateX(0);
                opacity: 0.2;
            }
            50% {
                opacity: 0.5;
            }
            100% {
                transform: translateY(-100vh) translateX(20px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Interactive Animations
function setupInteractiveAnimations() {
    // Add hover effects to all buttons
    const buttons = document.querySelectorAll('button, .cta-button, .action-button, .submit-button, .search-button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = 'var(--shadow-md)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'var(--shadow-sm)';
        });
    });
    
    // Add hover effects to cards
    const cards = document.querySelectorAll('.feature-card, .testimonial');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = 'var(--shadow-lg)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'var(--shadow-md)';
        });
    });
}

// Page Initialization
function initializeCurrentPage() {
    const path = window.location.pathname;
    const page = path.split('/').pop();
    
    switch(page) {
        case 'car-doc-home.html':
            initHomePage();
            break;
        case 'diagnose-car.html':
            initDiagnosePage();
            break;
        case 'contact-mech.html':
            initContactPage();
            break;
        case 'sign-up-page.html':
            initSignupPage();
            break;
    }
}

function initHomePage() {
    // Add any home page specific JS here
}

function initDiagnosePage() {
    // Initialize diagnosis chat functionality
    const chatInput = document.querySelector('.chat-input');
    const sendButton = document.querySelector('.send-button');
    
    if (chatInput && sendButton) {
        sendButton.addEventListener('click', function() {
            const message = chatInput.value.trim();
            if (message) {
                addMessageToChat('user', message);
                chatInput.value = '';
                // Simulate bot response
                setTimeout(() => {
                    addMessageToChat('bot', 'I received your message about your vehicle. Let me analyze that...');
                }, 1000);
            }
        });
    }
}

function addMessageToChat(type, text) {
    const chatMessages = document.querySelector('.chat-messages');
    if (chatMessages) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}-message`;
        messageDiv.textContent = text;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}

function initContactPage() {
    // Initialize mechanic search functionality
    const searchButton = document.querySelector('.search-button');
    
    if (searchButton) {
        searchButton.addEventListener('click', function() {
            // Simulate search results
            const resultsContainer = document.querySelector('.results-container');
            if (resultsContainer) {
                resultsContainer.innerHTML = `
                    <div class="mechanic-result">
                        <h3>Mechanic Name</h3>
                        <p>Specialty: Engine, Transmission</p>
                        <p>Distance: 2.5 miles away</p>
                        <button class="action-button">Contact</button>
                    </div>
                `;
            }
        });
    }
}

function initSignupPage() {
    // Initialize form validation
    const signupForm = document.querySelector('.signup-form');
    
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add form validation logic here
            alert('Signup form submitted! (This is a demo)');
        });
    }
}

// Refresh animations when theme changes
function refreshAnimations() {
    // Remove existing animations
    const bgAnimation = document.querySelector('.bg-animation');
    if (bgAnimation) {
        bgAnimation.remove();
    }
    
    // Recreate animations with new theme colors
    createBackgroundAnimation();
    // Update interactive elements with new theme colors
  setupInteractiveAnimations();
}
  
