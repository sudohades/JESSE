document.addEventListener('DOMContentLoaded', function() {
    // Scroll animations
    initScrollAnimations();
    
    // Button click animations
    initButtonAnimations();
    
    // Hover glow effects
    initGlowEffects();
});

/**
 * Initialize scroll-triggered animations
 */
function initScrollAnimations() {
    const scrollElements = document.querySelectorAll('.js-scroll');
    
    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };
    
    const displayScrollElement = (element) => {
        element.classList.add('scrolled');
    };
    
    const hideScrollElement = (element) => {
        element.classList.remove('scrolled');
    };
    
    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.25)) {
                displayScrollElement(el);
            } else {
                hideScrollElement(el);
            }
        });
    };
    
    // Add initial classes to elements that should be animated on scroll
    scrollElements.forEach(el => {
        // Check for direction modifiers
        if (el.classList.contains('from-left')) {
            el.classList.add('js-scroll--left');
        } else if (el.classList.contains('from-right')) {
            el.classList.add('js-scroll--right');
        } else {
            el.classList.add('js-scroll--up');
        }
    });
    
    // Initial check to show elements already in view
    handleScrollAnimation();
    
    // Listen for scroll events
    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });
}

/**
 * Initialize button animations (bounce effect)
 */
function initButtonAnimations() {
    const buttons = document.querySelectorAll('.cta-button, .add-to-cart, .nav-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Prevent default action if needed
            // e.preventDefault();
            
            // Remove animation class if exists
            this.classList.remove('button-bounce');
            
            // Trigger reflow
            void this.offsetWidth;
            
            // Add animation class
            this.classList.add('button-bounce');
            
            // Optional: Add actual functionality here
        });
    });
}

/**
 * Initialize glow effects on hover
 */
function initGlowEffects() {
    // Elements that should have glow effect
    const glowElements = document.querySelectorAll('.product-image, .feature, .spec-item, .logo-icon, .logo-symbol');
    
    glowElements.forEach(element => {
        // Create glow container if necessary
        if (!element.classList.contains('glow-effect-container')) {
            element.classList.add('glow-effect-container');
        }
        
        // Add mouse enter event
        element.addEventListener('mouseenter', function() {
            this.classList.add('glow-active');
        });
        
        // Add mouse leave event
        element.addEventListener('mouseleave', function() {
            this.classList.remove('glow-active');
        });
    });
    
    // Special glow effect for product image
    const productImage = document.querySelector('.product-image');
    if (productImage) {
        productImage.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element
            const y = e.clientY - rect.top;  // y position within the element
            
            this.style.setProperty('--glow-x', `${x}px`);
            this.style.setProperty('--glow-y', `${y}px`);
        });
    }
}

/**
 * Product image parallax effect
 */
function initParallaxEffect() {
    const productVisual = document.querySelector('.product-visual, .product-showcase');
    const decorationCircle = document.querySelector('.decoration-circle, .geometric-shape');
    
    if (productVisual && decorationCircle) {
        window.addEventListener('mousemove', function(e) {
            const speed = 0.05;
            const x = (window.innerWidth / 2 - e.pageX) * speed;
            const y = (window.innerHeight / 2 - e.pageY) * speed;
            
            decorationCircle.style.transform = `translateX(${x}px) translateY(${y}px)`;
            productVisual.style.transform = `translateX(${x * 0.3}px) translateY(${y * 0.3}px)`;
        });
    }
}

// Initialize parallax effect
document.addEventListener('DOMContentLoaded', initParallaxEffect);

/**
 * Preloader animation
 */
function initPreloader() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        window.addEventListener('load', function() {
            preloader.classList.add('preloader-fade');
            
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        });
    }
}

// Initialize preloader if it exists
document.addEventListener('DOMContentLoaded', initPreloader);

/**
 * Load animations after page content is loaded
 */
window.addEventListener('load', function() {
    // Add entrance animations to header elements
    document.querySelectorAll('.top-nav, .header').forEach(el => {
        el.classList.add('loaded');
    });
    
    // Add entrance animations to product info elements
    const productElements = document.querySelectorAll('.product-title, .product-slogan, .product-tagline, .price-container, .product-pricing');
    
    productElements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('loaded');
        }, 300 + (index * 200));
    });
});





// Animations for product 1

        // Mouse follow effect for red circle
        const redCircle = document.querySelector('.red-circle');
        document.addEventListener('mousemove', (e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            redCircle.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
        });

        // Hover effect for product image
        const imageContainer = document.querySelector('.image-container');
        const productImage = imageContainer.querySelector('img');
        
        imageContainer.addEventListener('mousemove', (e) => {
            const rect = imageContainer.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleX = (y - centerY) / 20;
            const angleY = (centerX - x) / 20;
            
            imageContainer.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
        });
        
        imageContainer.addEventListener('mouseleave', () => {
            imageContainer.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });

        // Pulse animation for neon elements
        const neonElements = document.querySelectorAll('.neon-text, .logo span');
        
        function pulsate() {
            neonElements.forEach(el => {
                const randomIntensity = Math.random() * 5 + 5;
                if (el.classList.contains('neon-text')) {
                    el.style.textShadow = `0 0 ${randomIntensity}px var(--neon-red)`;
                } else {
                    el.style.boxShadow = `0 0 ${randomIntensity}px var(--neon-red)`;
                }
            });
            
            setTimeout(pulsate, 1500);
        }
        
        pulsate();

        // Button click effect
        const ctaButton = document.querySelector('.cta-button');
        
        ctaButton.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
            ripple.style.borderRadius = '50%';
            ripple.style.width = '0';
            ripple.style.height = '0';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.transform = 'translate(-50%, -50%)';
            ripple.style.animation = 'ripple 0.8s linear';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 800);
        });

        // Add ripple animation keyframes to style
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                0% {
                    width: 0;
                    height: 0;
                    opacity: 0.8;
                }
                100% {
                    width: 300px;
                    height: 300px;
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);

        // Scroll reveal animation
        const elements = document.querySelectorAll('.product-title, .tagline, .description, .cta-button, .specs');
        
        window.addEventListener('load', () => {
            let delay = 0;
            
            elements.forEach(el => {
                setTimeout(() => {
                    el.style.opacity = '0';
                    el.style.transform = 'translateY(20px)';
                    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                    
                    setTimeout(() => {
                        el.style.opacity = '1';
                        el.style.transform = 'translateY(0)';
                    }, 100);
                }, delay);
                
                delay += 200;
            });
        });

        // Menu button toggle
        const menuBtn = document.querySelector('.menu-btn');
        
        menuBtn.addEventListener('click', () => {
            alert('Menu functionality would go here!');
        });