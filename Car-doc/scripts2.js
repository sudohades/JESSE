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
        toggleBtn.style.top = '20px';
        toggleBtn.style.right = '20px';
        toggleBtn.style.zIndex = '1000';
        toggleBtn.style.borderRadius = '50%';
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
            document.body.classList.add('light-theme');
            toggleBtn.querySelector('.toggle-icon').textContent = '☀️';
        }
        
        // Add event listener for theme toggle
        toggleBtn.addEventListener('click', function() {
            document.body.classList.toggle('light-theme');
            
            // Update icon based on current theme
            const isDarkTheme = !document.body.classList.contains('light-theme');
            this.querySelector('.toggle-icon').textContent = isDarkTheme ? '🌙' : '☀️';
            
            // Save preference to localStorage
            localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
            
            // Refresh animations after theme change
            refreshAnimations();
        });
    }
}

// Background Animation
function createBackgroundAnimation() {
    const bgCanvas = document.createElement('canvas');
    bgCanvas.id = 'background-animation';
    bgCanvas.style.position = 'fixed';
    bgCanvas.style.top = '0';
    bgCanvas.style.left = '0';
    bgCanvas.style.width = '100%';
    bgCanvas.style.height = '100%';
    bgCanvas.style.zIndex = '-1';
    bgCanvas.style.opacity = '0.05';
    bgCanvas.style.pointerEvents = 'none';
    document.body.prepend(bgCanvas);
    
    const ctx = bgCanvas.getContext('2d');
    let particles = [];
    const isDarkTheme = !document.body.classList.contains('light-theme');
    
    // Responsive canvas
    function resizeCanvas() {
        bgCanvas.width = window.innerWidth;
        bgCanvas.height = window.innerHeight;
    }
    
    // Initialize particles
    function initParticles() {
        particles = [];
        const particleCount = Math.min(Math.floor(window.innerWidth * 0.05), 100);
        
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * bgCanvas.width,
                y: Math.random() * bgCanvas.height,
                radius: Math.random() * 3 + 1,
                color: getRandomColor(),
                speedX: Math.random() * 0.5 - 0.25,
                speedY: Math.random() * 0.5 - 0.25,
                opacity: Math.random() * 0.5 + 0.1
            });
        }
    }
    
    // Get color based on current theme
    function getRandomColor() {
        const isDarkTheme = !document.body.classList.contains('light-theme');
        const colors = isDarkTheme ? 
            ['#415A77', '#778DA9', '#E0E1DD'] : 
            ['#0D1B2A', '#1B263B', '#415A77'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    // Animation loop
    function animateBackground() {
        ctx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
        
        particles.forEach(particle => {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.globalAlpha = particle.opacity;
            ctx.fill();
            
            // Move particles
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Wrap around edges
            if (particle.x < 0) particle.x = bgCanvas.width;
            if (particle.x > bgCanvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = bgCanvas.height;
            if (particle.y > bgCanvas.height) particle.y = 0;
        });
        
        requestAnimationFrame(animateBackground);
    }
    
    // Initialize canvas and animation
    resizeCanvas();
    initParticles();
    animateBackground();
    
    // Handle window resize
    window.addEventListener('resize', function() {
        resizeCanvas();
        initParticles();
    });
}

// Setup Interactive Animations
function setupInteractiveAnimations() {
    // Feature card hover effects
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const randomColor = getRandomAccentColor();
            this.style.borderTop = `3px solid ${randomColor}`;
            this.style.transition = 'all 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.borderTop = '';
        });
    });
    
    // Button hover effects with color change
    const buttons = document.querySelectorAll('button, .cta-button, .action-button, .submit-button, .search-button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            const originalBg = getComputedStyle(this).backgroundColor;
            this.dataset.originalBg = originalBg;
            this.style.backgroundColor = getRandomAccentColor();
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.backgroundColor = this.dataset.originalBg || '';
        });
    });
    
    // Nav link hover effects
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.color = getRandomAccentColor();
            }
        });
        
        link.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.color = '';
            }
        });
    });
    
    // Add ripple effect to buttons
    buttons.forEach(button => {
        button.addEventListener('click', createRippleEffect);
    });
}

// Get random accent color based on current theme
function getRandomAccentColor() {
    const isDarkTheme = !document.body.classList.contains('light-theme');
    // Use CSS variables to get colors
    const style = getComputedStyle(document.documentElement);
    const accentPrimary = style.getPropertyValue('--accent-primary');
    const accentSecondary = style.getPropertyValue('--accent-secondary');
    
    // Generate some variation
    const colors = [
        accentPrimary,
        accentSecondary,
        '#5a7b98', // Light variation
        '#364e68'  // Dark variation
    ];
    
    return colors[Math.floor(Math.random() * colors.length)];
}

// Create ripple effect on button click
function createRippleEffect(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.className = 'ripple';
    
    // Add necessary styling for the ripple effect
    const style = document.createElement('style');
    style.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background-color: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    button.style.position = button.style.position || 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Page-specific initializations
function initializeCurrentPage() {
    const path = window.location.pathname;
    
    // Home page specific
    if (path.includes('index.html') || path.endsWith('/')) {
        // Animate the hero section
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            heroSection.style.opacity = '0';
            heroSection.style.transform = 'translateY(20px)';
            heroSection.style.transition = 'opacity 1s ease, transform 1s ease';
            
            setTimeout(() => {
                heroSection.style.opacity = '1';
                heroSection.style.transform = 'translateY(0)';
            }, 200);
        }
        
        // Animate feature cards with staggered delay
        const featureCards = document.querySelectorAll('.feature-card');
        featureCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 500 + (index * 200));
        });
    }
    
    // Diagnose page specific
    if (path.includes('diagnose.html')) {
        setupChatInteractions();
    }
    
    // Contact page specific
    if (path.includes('contact.html')) {
        setupLocationForm();
    }
    
    // Sign up page specific
    if (path.includes('signup.html')) {
        setupFormValidation();
    }
}

// Handle chat interactions on diagnose page
function setupChatInteractions() {
    const chatInput = document.getElementById('chat-input');
    const sendButton = document.getElementById('send-message');
    const chatMessages = document.getElementById('chat-messages');
    
    if (chatInput && sendButton && chatMessages) {
        sendButton.addEventListener('click', function() {
            const message = chatInput.value.trim();
            if (message) {
                // Add user message
                addChatMessage(message, 'user-message');
                
                // Simulate response (in a real app, this would call your AI backend)
                simulateResponse(message);
                
                // Clear input
                chatInput.value = '';
            }
        });
        
        // Allow Enter key to send message
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendButton.click();
            }
        });
    }
}

// Add a message to the chat
function addChatMessage(text, className) {
    const chatMessages = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${className}`;
    messageDiv.innerHTML = `<p>${text}</p>`;
    
    // Animation for the message
    messageDiv.style.opacity = '0';
    messageDiv.style.transform = 'translateY(10px)';
    messageDiv.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    
    chatMessages.appendChild(messageDiv);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Animate the message appearing
    setTimeout(() => {
        messageDiv.style.opacity = '1';
        messageDiv.style.transform = 'translateY(0)';
    }, 100);
}

// Simulate a response from the AI
function simulateResponse(userMessage) {
    // Show typing indicator
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot-message typing-indicator';
    typingDiv.innerHTML = '<p>Analyzing vehicle issue...</p>';
    document.getElementById('chat-messages').appendChild(typingDiv);
    
    // Sample responses based on keywords (in a real app, this would be your AI)
    setTimeout(() => {
        typingDiv.remove();
        
        let response = "I need more information about your vehicle issue to provide a diagnosis.";
        
        if (userMessage.toLowerCase().includes('noise')) {
            response = "Based on the noise description, this could be related to your brakes or wheel bearings. Can you describe when exactly you hear this noise?";
        } else if (userMessage.toLowerCase().includes('brake')) {
            response = "Issues with braking could indicate worn brake pads, low brake fluid, or air in the brake lines. When did you last have your brakes serviced?";
        } else if (userMessage.toLowerCase().includes('start')) {
            response = "Starting problems often relate to your battery, starter motor, or fuel system. Does the engine turn over at all when you try to start it?";
        } else if (userMessage.toLowerCase().includes('overheat')) {
            response = "Overheating can be caused by low coolant, a faulty thermostat, or issues with your radiator or water pump. Have you checked your coolant level recently?";
        }
        
        addChatMessage(response, 'bot-message');
        
        // Update the results section with a simple diagnosis
        const resultContainer = document.getElementById('result-container');
        if (resultContainer) {
            resultContainer.innerHTML = `
                <h3>Preliminary Diagnosis</h3>
                <p>${response}</p>
                <p>For a complete diagnosis, please continue the conversation or consult with a mechanic.</p>
            `;
            
            // Animate the results container
            resultContainer.style.animation = 'pulse 1s ease';
        }
    }, 1500);
}

// Setup location form for mechanic search
function setupLocationForm() {
    const locationForm = document.getElementById('location-form');
    const resultsContainer = document.getElementById('results-container');
    
    if (locationForm && resultsContainer) {
        locationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const zipCode = document.getElementById('zip-code').value;
            const radius = document.getElementById('search-radius').value;
            
            // Simulate mechanic search (in a real app, this would call your API)
            resultsContainer.innerHTML = '<p class="loading-text">Searching for mechanics...</p>';
            
            setTimeout(() => {
                // Mock data - in a real app this would come from your backend
                const mechanics = [
                    { name: 'Premier Auto Care', rating: 4.8, distance: 2.3, specialties: ['Brakes', 'Engine'] },
                    { name: 'Expert Mechanics Inc', rating: 4.5, distance: 3.7, specialties: ['Transmission', 'Electrical'] },
                    { name: 'Fast Fix Auto Shop', rating: 4.2, distance: 5.1, specialties: ['Engine', 'Diagnostics'] }
                ];
                
                let resultsHTML = '<div class="mechanics-list">';
                
                mechanics.forEach(mechanic => {
                    resultsHTML += `
                        <div class="mechanic-card">
                            <h3>${mechanic.name}</h3>
                            <div class="mechanic-details">
                                <p><strong>Rating:</strong> ${mechanic.rating}/5</p>
                                <p><strong>Distance:</strong> ${mechanic.distance} miles</p>
                                <p><strong>Specialties:</strong> ${mechanic.specialties.join(', ')}</p>
                            </div>
                            <button class="contact-mechanic-btn">Contact</button>
                        </div>
                    `;
                });
                
                resultsHTML += '</div>';
                resultsContainer.innerHTML = resultsHTML;
                
                // Add animation to the results
                const mechanicCards = document.querySelectorAll('.mechanic-card');
                mechanicCards.forEach((card, index) => {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100 + (index * 150));
                    
                    // Add hover effect
                    card.addEventListener('mouseenter', function() {
                        this.style.transform = 'translateY(-5px)';
                        this.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
                        this.style.borderColor = getRandomAccentColor();
                    });
                    
                    card.addEventListener('mouseleave', function() {
                        this.style.transform = 'translateY(0)';
                        this.style.boxShadow = '';
                        this.style.borderColor = '';
                    });
                });
                
                // Add CSS for mechanic cards
                const style = document.createElement('style');
                style.textContent = `
                    .mechanics-list {
                        display: grid;
                        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                        gap: 20px;
                    }
                    
                    .mechanic-card {
                        background-color: var(--bg-secondary);
                        border-radius: 8px;
                        padding: 20px;
                        box-shadow: 0 4px 10px rgba(0,0,0,0.1);
                        border-left: 4px solid var(--accent-primary);
                        transition: all 0.3s ease;
                    }
                    
                    .mechanic-details {
                        margin: 15px 0;
                    }
                    
                    .contact-mechanic-btn {
                        width: 100%;
                    }
                    
                    .loading-text {
                        text-align: center;
                        padding: 20px;
                        font-style: italic;
                    }
                `;
                document.head.appendChild(style);
            }, 1500);
        });
    }
}

// Form validation for signup page
function setupFormValidation() {
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        const password = document.getElementById('password');
        const confirmPassword = document.getElementById('confirm-password');
        
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            let isValid = true;
            
            // Check required fields
            const requiredFields = signupForm.querySelectorAll('[required]');
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    highlightInvalidField(field);
                } else {
                    removeInvalidHighlight(field);
                }
            });
            
            // Check password match
            if (password.value !== confirmPassword.value) {
                isValid = false;
                highlightInvalidField(password);
                highlightInvalidField(confirmPassword);
                showValidationMessage(confirmPassword, "Passwords don't match");
            }
            
            // Check password strength (simple check)
            const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
            if (!passwordRegex.test(password.value)) {
                isValid = false;
                highlightInvalidField(password);
                showValidationMessage(password, "Password must be at least 8 characters with a number and special character");
            }
            
            // Submit if valid
            if (isValid) {
                // Show success message (in a real app, this would submit the form)
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = 'Account created successfully!';
                successMessage.style.backgroundColor = '#4CAF50';
                successMessage.style.color = 'white';
                successMessage.style.padding = '10px';
                successMessage.style.borderRadius = '4px';
                successMessage.style.marginTop = '20px';
                successMessage.style.textAlign = 'center';
                
                signupForm.appendChild(successMessage);
                
                // Animate success message
                successMessage.style.opacity = '0';
                successMessage.style.transform = 'translateY(-10px)';
                successMessage.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                
                setTimeout(() => {
                    successMessage.style.opacity = '1';
                    successMessage.style.transform = 'translateY(0)';
                }, 100);
                
                // Reset form after successful submission
                setTimeout(() => {
                    signupForm.reset();
                    successMessage.remove();
                }, 3000);
            }
        });
        
        // Real-time password match validation
        confirmPassword.addEventListener('input', function() {
            if (password.value !== this.value) {
                showValidationMessage(this, "Passwords don't match");
            } else {
                removeValidationMessage(this);
            }
        });
    }
}

// Highlight invalid field with animation
function highlightInvalidField(field) {
    field.style.borderColor = '#ff3860';
    field.style.animation = 'shake 0.5s ease';
    
    // Add shake animation if not already present
    const styleSheet = document.styleSheets[0];
    let shakeKeyframes = false;
    
    for (let i = 0; i < styleSheet.cssRules.length; i++) {
        if (styleSheet.cssRules[i].name === 'shake') {
            shakeKeyframes = true;
            break;
        }
    }
    
    if (!shakeKeyframes) {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                20%, 60% { transform: translateX(-5px); }
                40%, 80% { transform: translateX(5px); }
            }
        `;
        document.head.appendChild(style);
    }
}

// Remove invalid highlight
function removeInvalidHighlight(field) {
    field.style.borderColor = '';
    field.style.animation = '';
}

// Show validation message
function showValidationMessage(field, message) {
    // Remove existing message
    removeValidationMessage(field);
    
    const messageElement = document.createElement('p');
    messageElement.className = 'validation-message';
    messageElement.textContent = message;
    messageElement.style.color = '#ff3860';
    messageElement.style.fontSize = '0.8rem';
    messageElement.style.marginTop = '5px';
    
    field.parentNode.appendChild(messageElement);
}

// Remove validation message
function removeValidationMessage(field) {
    const existingMessage = field.parentNode.querySelector('.validation-message');
    if (existingMessage) {
        existingMessage.remove();
    }
}

// Refresh animations after theme change
function refreshAnimations() {
    // Re-initialize the background animation
    const bgCanvas = document.getElementById('background-animation');
    if (bgCanvas) {
        bgCanvas.remove();
        createBackgroundAnimation();
    }
    
    // Update interactive elements with new theme colors
    setupInteractiveAnimations();
}