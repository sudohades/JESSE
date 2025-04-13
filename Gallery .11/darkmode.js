// Dark Mode Toggle JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Create the toggle button
    const toggleButton = document.createElement('button');
    toggleButton.id = 'dark-mode-toggle';
    toggleButton.innerHTML = '<span class="mode-icon">🌙</span>';
    toggleButton.setAttribute('aria-label', 'Toggle dark mode');
    toggleButton.title = 'Toggle dark mode';
    
    // Add the button to the page
    document.body.appendChild(toggleButton);
    
    // Check for saved theme preference or respect OS preference
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDarkMode)) {
        document.body.classList.add('dark-mode');
        toggleButton.innerHTML = '<span class="mode-icon">☀️</span>';
    }
    
    // Toggle dark mode on button click
    toggleButton.addEventListener('click', function() {
        if (document.body.classList.contains('dark-mode')) {
            document.body.classList.remove('dark-mode');
            toggleButton.innerHTML = '<span class="mode-icon">🌙</span>';
            localStorage.setItem('theme', 'light');
        } else {
            document.body.classList.add('dark-mode');
            toggleButton.innerHTML = '<span class="mode-icon">☀️</span>';
            localStorage.setItem('theme', 'dark');
        }
        
        // Add rotation animation to icon
        const icon = toggleButton.querySelector('.mode-icon');
        icon.classList.add('rotate');
        setTimeout(() => {
            icon.classList.remove('rotate');
        }, 500);
    });
    
    // Listen for OS theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        if (!localStorage.getItem('theme')) { // Only if user hasn't manually set preference
            if (event.matches) {
                document.body.classList.add('dark-mode');
                toggleButton.innerHTML = '<span class="mode-icon">☀️</span>';
            } else {
                document.body.classList.remove('dark-mode');
                toggleButton.innerHTML = '<span class="mode-icon">🌙</span>';
            }
        }
    });
});