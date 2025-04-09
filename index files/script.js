// ================ DOM ELEMENTS ================
const themeToggle = document.querySelector('.theme-toggle');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const contactForm = document.querySelector('.contact-form-container form');
const scrollToTopBtn = document.createElement('button');

// ================ THEME TOGGLE ================
function toggleTheme() {
  const currentTheme = document.body.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? null : 'light';
  document.body.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
}

// Initialize theme from localStorage
function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.body.setAttribute('data-theme', savedTheme);
  }
}

// ================ MOBILE MENU ================
function toggleMobileMenu() {
  navLinks.classList.toggle('active');
  mobileMenuBtn.innerHTML = navLinks.classList.contains('active') ? 
    '&times;' : '&#9776;';
}

// Close mobile menu when clicking a link
function closeMobileMenu() {
  navLinks.classList.remove('active');
  mobileMenuBtn.innerHTML = '&#9776;';
}

// ================ SMOOTH SCROLLING ================
function smoothScrollTo(target) {
  const element = document.querySelector(target);
  if (element) {
    window.scrollTo({
      top: element.offsetTop - 80,
      behavior: 'smooth'
    });
  }
}

// ================ SCROLL TO TOP BUTTON ================
function setupScrollToTop() {
  scrollToTopBtn.innerHTML = '↑';
  scrollToTopBtn.className = 'scroll-to-top';
  document.body.appendChild(scrollToTopBtn);

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      scrollToTopBtn.style.opacity = '1';
      scrollToTopBtn.style.visibility = 'visible';
    } else {
      scrollToTopBtn.style.opacity = '0';
      scrollToTopBtn.style.visibility = 'hidden';
    }
  });

  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ================ FORM VALIDATION ================
function validateForm(e) {
  e.preventDefault();
  const form = e.target;
  const inputs = form.querySelectorAll('input, textarea');
  let isValid = true;

  inputs.forEach(input => {
    if (!input.value.trim()) {
      input.classList.add('error');
      isValid = false;
    } else {
      input.classList.remove('error');
    }
  });

  if (isValid) {
    showFormMessage(form, 'success', 'Message sent successfully!');
    form.reset();
  } else {
    showFormMessage(form, 'error', 'Please fill all required fields');
  }
}

function showFormMessage(form, type, message) {
  const existingMessage = form.querySelector('.form-message');
  if (existingMessage) existingMessage.remove();

  const messageDiv = document.createElement('div');
  messageDiv.className = `form-message ${type}-message`;
  messageDiv.innerHTML = `<i class="fas fa-${type === 'success' ? 'check' : 'exclamation'}-circle"></i> ${message}`;
  form.appendChild(messageDiv);

  setTimeout(() => {
    messageDiv.style.opacity = '0';
    setTimeout(() => messageDiv.remove(), 500);
  }, 5000);
}

// ================ ACTIVE NAV LINK HIGHLIGHTING ================
function setActiveNavLink() {
  const sections = document.querySelectorAll('section');
  const navItems = document.querySelectorAll('.nav-links li a');

  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - 100) {
        current = section.getAttribute('id');
      }
    });

    navItems.forEach(item => {
      item.classList.remove('active-nav');
      if (item.getAttribute('href') === `#${current}`) {
        item.classList.add('active-nav');
      }
    });
  });
}

// ================ INITIALIZE ALL FUNCTIONALITY ================
document.addEventListener('DOMContentLoaded', () => {
  // Theme functionality
  initTheme();
  if (themeToggle) themeToggle.addEventListener('click', toggleTheme);

  // Mobile menu
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = anchor.getAttribute('href');
      if (target === '#') return;
      smoothScrollTo(target);
    });
  });

  // Scroll to top button
  setupScrollToTop();

  // Form validation
  if (contactForm) contactForm.addEventListener('submit', validateForm);

  // Active nav link highlighting
  setActiveNavLink();

  // Input label animation
  document.querySelectorAll('.input-container input, .input-container textarea').forEach(input => {
    input.addEventListener('focus', () => {
      input.parentElement.classList.add('active');
    });
    input.addEventListener('blur', () => {
      if (!input.value) input.parentElement.classList.remove('active');
    });
  });
});

// ================ ADDITIONAL INTERACTIVE ELEMENTS ================
// Project card hover effects
function setupProjectCardEffects() {
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.querySelector('img').style.transform = 'scale(1.05)';
    });
    card.addEventListener('mouseleave', () => {
      card.querySelector('img').style.transform = 'scale(1)';
    });
  });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', setupProjectCardEffects);
