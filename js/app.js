// Theme Toggle
const body = document.body;
const themeToggle = document.getElementById('themeToggle');
const themeToggleMobile = document.getElementById('themeToggleMobile');

function updateThemeIcons() {
    const icon = body.classList.contains('dark-mode') ? '☀️' : '🌙';
    themeToggle.querySelector('.theme-icon').textContent = icon;
    themeToggleMobile.querySelector('.theme-icon').textContent = icon;
}

function toggleTheme() {
    if (body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
    } else {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
    }
    updateThemeIcons();
}

themeToggle.addEventListener('click', toggleTheme);
themeToggleMobile.addEventListener('click', toggleTheme);

// Initialize theme icons
updateThemeIcons();

// Hamburger Menu
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

// Auth Modal
const authModal = document.getElementById('authModal');
const createLinkBtn = document.getElementById('createLinkBtn');
const closeModal = document.getElementById('closeModal');
const signupForm = document.getElementById('signupForm');
const loginForm = document.getElementById('loginForm');
const switchToLogin = document.getElementById('switchToLogin');
const switchToSignup = document.getElementById('switchToSignup');

createLinkBtn.addEventListener('click', () => {
    authModal.classList.add('active');
    signupForm.style.display = 'block';
    loginForm.style.display = 'none';
});

closeModal.addEventListener('click', () => {
    authModal.classList.remove('active');
});

authModal.addEventListener('click', (e) => {
    if (e.target === authModal) {
        authModal.classList.remove('active');
    }
});

switchToLogin.addEventListener('click', () => {
    signupForm.style.display = 'none';
    loginForm.style.display = 'block';
});

switchToSignup.addEventListener('click', () => {
    loginForm.style.display = 'none';
    signupForm.style.display = 'block';
});

// Prevent form submissions (for demo purposes)
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Form submission is disabled in demo mode!');
    });
});

// Header Show on Scroll Up
const header = document.querySelector('header');
let lastScrollTop = 0;

// Start with header hidden (moved up)
header.style.transform = 'translateY(-100%)';
header.style.transition = 'transform 0.3s ease-in-out';

// Show header immediately on page load
setTimeout(() => {
    header.style.transform = 'translateY(0)';
}, 100);

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop < lastScrollTop) {
        // Scrolling up - show header
        header.style.transform = 'translateY(0)';
    } else if (scrollTop > 100) {
        // Scrolling down & past 100px - hide header
        header.style.transform = 'translateY(-100%)';
    }
    
    lastScrollTop = scrollTop;
});
