// Theme toggle functionality
const body = document.body;
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('.theme-icon');

// Check for saved theme preference or default to dark mode
const currentTheme = localStorage.getItem('theme') || 'dark';
if (currentTheme === 'light') {
    body.classList.remove('dark-mode');
    body.classList.add('light-mode');
    themeIcon.textContent = '🌙';
} else {
    themeIcon.textContent = '☀️';
}

themeToggle.addEventListener('click', () => {
    if (body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        themeIcon.textContent = '🌙';
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        themeIcon.textContent = '☀️';
        localStorage.setItem('theme', 'dark');
    }
});

// Back Button Functionality
const backBtn = document.getElementById('backBtn');
if (backBtn) {
    backBtn.addEventListener('click', () => {
        if (document.referrer.includes(window.location.hostname)) {
            window.history.back();
        } else {
            window.location.href = 'index.html';
        }
    });
}

// Header show/hide on scroll
const header = document.getElementById('header');
let lastScrollTop = 0;

// Show header on page load
setTimeout(() => {
    header.classList.add('visible');
}, 100);

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        if (scrollTop > lastScrollTop) {
            // Scrolling down
            header.classList.remove('visible');
        } else {
            // Scrolling up
            header.classList.add('visible');
        }
    } else {
        // Near top of page
        header.classList.add('visible');
    }
    
    lastScrollTop = scrollTop;
});
