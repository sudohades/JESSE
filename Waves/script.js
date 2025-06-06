document.addEventListener('DOMContentLoaded', function() {
  // Initialize luxury theme animations
  initLuxuryAnimations();
  createWaveBackground();
  setupHoverEffects();
  setupScrollAnimations();
});

function initLuxuryAnimations() {
  // Animate luxury cards on page load
  const cards = document.querySelectorAll('.luxury-card');
  cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, 200 * index);
  });
}

function createWaveBackground() {
  // Create dynamic wave background
  const waveContainer = document.createElement('div');
  waveContainer.className = 'wave-container';
  document.body.appendChild(waveContainer);
  
  // Create multiple wave layers
  for (let i = 0; i < 3; i++) {
    const wave = document.createElement('div');
    wave.className = `wave wave-${i+1}`;
    waveContainer.appendChild(wave);
    
    // Style each wave differently
    wave.style.position = 'absolute';
    wave.style.bottom = '0';
    wave.style.left = '0';
    wave.style.width = '200%';
    wave.style.height = `${10 + i * 5}em`;
    wave.style.background = `url('data:image/svg+xml;utf8,<svg viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" fill="${i === 0 ? '#d4af37' : i === 1 ? '#1282a2' : '#0a1128'}"/><path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" fill="${i === 0 ? '#d4af37' : i === 1 ? '#1282a2' : '#0a1128'}"/><path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="${i === 0 ? '#d4af37' : i === 1 ? '#1282a2' : '#0a1128'}"/></svg>')`;
    wave.style.animation = `wave ${15 - i * 3}s linear infinite`;
    wave.style.animationDelay = `${i * 0.5}s`;
    wave.style.opacity = `${0.7 - i * 0.2}`;
  }
  
  // Add keyframes for wave animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes wave {
      0% { transform: translateX(0) translateZ(0) scaleY(1); }
      50% { transform: translateX(-25%) translateZ(0) scaleY(0.8); }
      100% { transform: translateX(-50%) translateZ(0) scaleY(1); }
    }
  `;
  document.head.appendChild(style);
}

function setupHoverEffects() {
  // Enhanced hover effects for luxury items
  const hoverElements = document.querySelectorAll('.nav-luxury a, .btn-luxury, .luxury-card');
  
  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      if (el.classList.contains('luxury-card')) {
        const glow = document.createElement('div');
        glow.className = 'luxury-glow';
        glow.style.position = 'absolute';
        glow.style.top = '0';
        glow.style.left = '0';
        glow.style.width = '100%';
        glow.style.height = '100%';
        glow.style.background = 'radial-gradient(circle at center, rgba(212, 175, 55, 0.2) 0%, transparent 70%)';
        glow.style.borderRadius = 'inherit';
        glow.style.pointerEvents = 'none';
        el.appendChild(glow);
        
        setTimeout(() => {
          if (glow.parentNode === el) {
            el.removeChild(glow);
          }
        }, 1000);
      }
    });
  });
}

function setupScrollAnimations() {
  // Luxury scroll animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('luxury-visible');
      }
    });
  }, { threshold: 0.1 });
  
  document.querySelectorAll('.luxury-card, .luxury-header, .luxury-footer').forEach(el => {
    observer.observe(el);
  });
  
  // Add styles for scroll animations
  const style = document.createElement('style');
  style.textContent = `
    .luxury-card, .luxury-header, .luxury-footer {
      transition: opacity 0.8s ease, transform 0.8s ease;
    }
    
    .luxury-card:not(.luxury-visible) {
      opacity: 0;
      transform: translateY(50px);
    }
    
    .luxury-header:not(.luxury-visible) {
      opacity: 0;
      transform: translateY(-50px);
    }
    
    .luxury-footer:not(.luxury-visible) {
      opacity: 0;
      transform: translateY(50px);
    }
  `;
  document.head.appendChild(style);
}
