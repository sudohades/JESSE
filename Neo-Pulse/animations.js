// Neo-Pulse Animations - Cyberpunk Music Player Effects

// 1. Loading Animation
function initLoader() {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.display = 'block';
        loader.style.width = '100%';
        loader.style.height = '3px';
        loader.style.backgroundColor = '#00ffff';
        loader.style.position = 'fixed';
        loader.style.top = '0';
        loader.style.left = '0';
        loader.style.zIndex = '1000';
        
        // Animation
        loader.animate(
            [
                { width: '0%', opacity: 0 },
                { width: '50%', opacity: 1 },
                { width: '100%', opacity: 0 }
            ],
            {
                duration: 2000,
                iterations: Infinity,
                easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
            }
        );
    }
}

// 2. Navigation Link Effects
function setupNavEffects() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        // Hover effect
        link.addEventListener('mouseenter', () => {
            link.animate(
                [
                    { color: '#ff00ff' },
                    { color: '#00ffff' },
                    { color: '#ff00ff' }
                ],
                {
                    duration: 1000,
                    iterations: Infinity,
                    easing: 'ease-in-out'
                }
            );
        });
        
        // Remove animation when not hovering
        link.addEventListener('mouseleave', () => {
            link.getAnimations().forEach(anim => anim.cancel());
            link.style.color = '';
        });
    });
}

// 3. Enhanced Playlist Card Effects
function enhancePlaylistCards() {
    const cards = document.querySelectorAll('.playlist-card');
    
    cards.forEach(card => {
        // Glow effect on hover
        card.addEventListener('mouseenter', () => {
            card.style.boxShadow = '0 0 20px rgba(0, 255, 255, 0.7)';
            card.animate(
                [
                    { transform: 'scale(1)' },
                    { transform: 'scale(1.02)' },
                    { transform: 'scale(1)' }
                ],
                {
                    duration: 500,
                    easing: 'ease-out'
                }
            );
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.boxShadow = '';
        });
        
        // Click effect
        card.addEventListener('click', () => {
            card.animate(
                [
                    { transform: 'scale(1)', boxShadow: '0 0 20px rgba(0, 255, 255, 0.7)' },
                    { transform: 'scale(0.95)', boxShadow: '0 0 30px rgba(255, 0, 255, 0.9)' },
                    { transform: 'scale(1)', boxShadow: '0 0 20px rgba(0, 255, 255, 0.7)' }
                ],
                {
                    duration: 300,
                    easing: 'ease-out'
                }
            );
        });
    });
}

// 4. Pulsing Site Title
function pulseSiteTitle() {
    const title = document.getElementById('site-title');
    if (title) {
        title.animate(
            [
                { textShadow: '0 0 5px #00ffff' },
                { textShadow: '0 0 15px #ff00ff' },
                { textShadow: '0 0 5px #00ffff' }
            ],
            {
                duration: 3000,
                iterations: Infinity,
                easing: 'ease-in-out'
            }
        );
    }
}

// 5. Button Effects
function setupButtonEffects() {
    const buttons = document.querySelectorAll('button');
    
    buttons.forEach(button => {
        // Hover effect
        button.addEventListener('mouseenter', () => {
            button.animate(
                [
                    { boxShadow: '0 0 5px rgba(255, 0, 255, 0.5)' },
                    { boxShadow: '0 0 15px rgba(255, 0, 255, 0.9)' }
                ],
                {
                    duration: 300,
                    fill: 'forwards',
                    easing: 'ease-out'
                }
            );
        });
        
        button.addEventListener('mouseleave', () => {
            button.animate(
                [
                    { boxShadow: '0 0 15px rgba(255, 0, 255, 0.9)' },
                    { boxShadow: '0 0 5px rgba(255, 0, 255, 0.5)' }
                ],
                {
                    duration: 300,
                    fill: 'forwards',
                    easing: 'ease-in'
                }
            );
        });
        
        // Click effect
        button.addEventListener('mousedown', () => {
            button.animate(
                [
                    { transform: 'scale(1)' },
                    { transform: 'scale(0.95)' }
                ],
                {
                    duration: 100,
                    fill: 'forwards',
                    easing: 'ease-out'
                }
            );
        });
        
        button.addEventListener('mouseup', () => {
            button.animate(
                [
                    { transform: 'scale(0.95)' },
                    { transform: 'scale(1)' }
                ],
                {
                    duration: 100,
                    fill: 'forwards',
                    easing: 'ease-out'
                }
            );
        });
    });
}

// Initialize all animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    setupNavEffects();
    enhancePlaylistCards();
    pulseSiteTitle();
    setupButtonEffects();
    
    // Hide loader after page loads
    window.addEventListener('load', () => {
        const loader = document.querySelector('.loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }
    });
});
