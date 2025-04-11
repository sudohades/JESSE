console.log('Happy developing ✨');

// Header shrink on scroll
const header = document.querySelector('header');
const scrollThreshold = 50; // pixels

window.addEventListener('scroll', () => {
  if (window.scrollY > scrollThreshold) {
    header.classList.add('shrink');
  } else {
    header.classList.remove('shrink');
  }
});

// Theme toggle functionality
document.addEventListener('DOMContentLoaded', function() {
  // Add glowing header styles
  const style = document.createElement('style');
  style.textContent = `
    .header {
      position: sticky;
      top: 0;
      z-index: 1000;
      background: var(--secondary-bg);
      border-bottom: 2px solid var(--accent-blue);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
    }
    .header::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 0;
      right: 0;
      height: 5px;
      background: var(--accent-yellow);
      filter: blur(10px);
      opacity: 0.7;
      z-index: -1;
      transition: all 0.3s;
    }
    [data-theme="light"] .header::after {
      background: #5a0b8a;
      opacity: 0.5;
    }
  `;
  document.head.appendChild(style);

  const toggleBtn = document.createElement('button');
  toggleBtn.className = 'theme-toggle';
  toggleBtn.textContent = 'Switch Colors';
  document.body.appendChild(toggleBtn);

  // Check for saved theme preference
  const currentTheme = localStorage.getItem('theme') || 'dark';
  if (currentTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    toggleBtn.textContent = 'Switch colors';
  }

  // Toggle theme on button click
  toggleBtn.addEventListener('click', function() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === 'light') {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'dark');
      toggleBtn.textContent = 'Switch colors';
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
      toggleBtn.textContent = 'Switch Colors';
    }
  });
});
