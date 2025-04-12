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
;
