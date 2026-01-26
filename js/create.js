import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAxMXV4agjCwvVwy3tC9bGD6zToiUKjtnc",
  authDomain: "linkforest-ca150.firebaseapp.com",
  projectId: "linkforest-ca150",
  storageBucket: "linkforest-ca150.firebasestorage.app",
  messagingSenderId: "834188422747",
  appId: "1:834188422747:web:d5dee5cdde2eb82cb4997e"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Check if user is authenticated
onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = 'index.html';
    } else {
        loadUserData(user.uid);
    }
});

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
updateThemeIcons();

// Hamburger Menu
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

// Sign Out
const signOutBtn = document.getElementById('signOutBtn');
const signOutBtnMobile = document.getElementById('signOutBtnMobile');

signOutBtn.addEventListener('click', handleSignOut);
signOutBtnMobile.addEventListener('click', handleSignOut);

function handleSignOut() {
    signOut(auth).then(() => {
        showNotification('Signed out successfully', 'success');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    }).catch((error) => {
        showNotification('Error signing out: ' + error.message, 'error');
    });
}

// Notification System
function showNotification(message, type = 'success') {
    const notificationArea = document.getElementById('notificationArea');
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    const icon = type === 'success' ? '✓' : type === 'error' ? '⚠' : 'ℹ';
    notification.innerHTML = `
        <span class="text-xl">${icon}</span>
        <span>${message}</span>
    `;
    
    notificationArea.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Device View Toggle
const deviceBtns = document.querySelectorAll('.device-btn');
const previewFrame = document.getElementById('previewFrame');

deviceBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        deviceBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const device = btn.dataset.device;
        previewFrame.className = `preview-frame ${device}`;
    });
});

// Links Data Array
let linksData = [];

// Profile Updates
const usernameInput = document.getElementById('username');
const bioInput = document.getElementById('bio');
const previewUsername = document.getElementById('previewUsername');
const previewBio = document.getElementById('previewBio');

usernameInput.addEventListener('input', (e) => {
    let value = e.target.value;
    if (!value.startsWith('@')) {
        value = '@' + value;
        e.target.value = value;
    }
    previewUsername.textContent = value || '@username';
});

bioInput.addEventListener('input', (e) => {
    previewBio.textContent = e.target.value || 'Your bio goes here...';
});

// Add Link Button
const addLinkBtn = document.getElementById('addLinkBtn');
const linksContainer = document.getElementById('linksContainer');

addLinkBtn.addEventListener('click', () => {
    const linkId = Date.now();
    addLinkItem(linkId);
});

function addLinkItem(linkId, data = {}) {
    // Clear placeholder if it exists
    if (linksContainer.querySelector('.opacity-60')) {
        linksContainer.innerHTML = '';
    }

    const linkItem = document.createElement('div');
    linkItem.className = 'link-item';
    linkItem.dataset.linkId = linkId;
    
    linkItem.innerHTML = `
        <div class="space-y-3">
            <div>
                <label class="block mb-2 text-sm font-medium">Link Title</label>
                <input type="text" class="input-field w-full link-title" placeholder="e.g., My Portfolio" value="${data.title || ''}" required>
            </div>
            <div>
                <label class="block mb-2 text-sm font-medium">URL</label>
                <input type="url" class="input-field w-full link-url" placeholder="https://example.com" value="${data.url || ''}" required>
            </div>
            <div>
                <label class="block mb-2 text-sm font-medium">Link Type</label>
                <select class="input-field w-full link-type">
                    <option value="">Select type...</option>
                    <option value="personal" ${data.type === 'personal' ? 'selected' : ''}>Personal Website</option>
                    <option value="linkedin" ${data.type === 'linkedin' ? 'selected' : ''}>LinkedIn</option>
                    <option value="twitter" ${data.type === 'twitter' ? 'selected' : ''}>Twitter/X</option>
                    <option value="instagram" ${data.type === 'instagram' ? 'selected' : ''}>Instagram</option>
                    <option value="github" ${data.type === 'github' ? 'selected' : ''}>GitHub</option>
                    <option value="youtube" ${data.type === 'youtube' ? 'selected' : ''}>YouTube</option>
                    <option value="other" ${data.type === 'other' ? 'selected' : ''}>Other</option>
                </select>
            </div>
            <div class="flex justify-end">
                <button class="delete-btn">Delete Link</button>
            </div>
        </div>
    `;
    
    linksContainer.appendChild(linkItem);
    
    // Add event listeners
    const titleInput = linkItem.querySelector('.link-title');
    const urlInput = linkItem.querySelector('.link-url');
    const typeSelect = linkItem.querySelector('.link-type');
    const deleteBtn = linkItem.querySelector('.delete-btn');
    
    titleInput.addEventListener('input', () => updatePreview());
    urlInput.addEventListener('input', () => updatePreview());
    typeSelect.addEventListener('change', () => updatePreview());
    
    deleteBtn.addEventListener('click', () => {
        linkItem.remove();
        updatePreview();
        
        if (linksContainer.children.length === 0) {
            linksContainer.innerHTML = '<div class="text-center opacity-60 py-8">Click "Add Link" to start building your LinkForest</div>';
        }
    });
    
    updatePreview();
}

// Update Preview
function updatePreview() {
    const previewLinks = document.getElementById('previewLinks');
    const linkItems = linksContainer.querySelectorAll('.link-item');
    
    if (linkItems.length === 0) {
        previewLinks.innerHTML = '<div class="preview-link-placeholder">Add your first link to see it here! ➡️</div>';
        return;
    }
    
    previewLinks.innerHTML = '';
    
    linkItems.forEach(item => {
        const title = item.querySelector('.link-title').value;
        const url = item.querySelector('.link-url').value;
        const type = item.querySelector('.link-type').value;
        
        if (title && url) {
            const previewLink = document.createElement('a');
            previewLink.className = 'preview-link';
            previewLink.href = url;
            previewLink.target = '_blank';
            previewLink.rel = 'noopener noreferrer';
            
            let emoji = '🔗';
            switch(type) {
                case 'personal': emoji = '🌐'; break;
                case 'linkedin': emoji = '💼'; break;
                case 'twitter': emoji = '🐦'; break;
                case 'instagram': emoji = '📸'; break;
                case 'github': emoji = '💻'; break;
                case 'youtube': emoji = '📺'; break;
            }
            
            previewLink.innerHTML = `${emoji} ${title}`;
            previewLinks.appendChild(previewLink);
        }
    });
    
    if (previewLinks.children.length === 0) {
        previewLinks.innerHTML = '<div class="preview-link-placeholder">Add your first link to see it here! ➡️</div>';
    }
}

// Save LinkForest
const saveBtn = document.getElementById('saveBtn');

saveBtn.addEventListener('click', async () => {
    const user = auth.currentUser;
    if (!user) {
        showNotification('Please log in to save', 'error');
        return;
    }
    
    const username = usernameInput.value.trim();
    const bio = bioInput.value.trim();
    
    if (!username || username === '@') {
        showNotification('Please enter a username', 'error');
        return;
    }
    
    // Collect all links
    const linkItems = linksContainer.querySelectorAll('.link-item');
    const links = [];
    let hasError = false;
    
    linkItems.forEach(item => {
        const title = item.querySelector('.link-title').value.trim();
        const url = item.querySelector('.link-url').value.trim();
        const type = item.querySelector('.link-type').value;
        
        if (!title || !url || !type) {
            hasError = true;
            return;
        }
        
        links.push({ title, url, type });
    });
    
    if (hasError) {
        showNotification('Please fill all link fields and select a type', 'error');
        return;
    }
    
    if (links.length === 0) {
        showNotification('Please add at least one link', 'error');
        return;
    }
    
    // Save to Firestore
    try {
        await setDoc(doc(db, 'users', user.uid), {
            username: username,
            bio: bio,
            links: links,
            updatedAt: new Date().toISOString()
        });
        
        showNotification('LinkForest saved successfully! 🎉', 'success');
    } catch (error) {
        showNotification('Error saving: ' + error.message, 'error');
    }
});

// Load User Data
async function loadUserData(uid) {
    try {
        const docRef = doc(db, 'users', uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
            const data = docSnap.data();
            
            // Load profile
            if (data.username) {
                usernameInput.value = data.username;
                previewUsername.textContent = data.username;
            }
            
            if (data.bio) {
                bioInput.value = data.bio;
                previewBio.textContent = data.bio;
            }
            
            // Load links
            if (data.links && data.links.length > 0) {
                linksContainer.innerHTML = '';
                data.links.forEach(link => {
                    const linkId = Date.now() + Math.random();
                    addLinkItem(linkId, link);
                });
            }
            
            showNotification('Data loaded successfully', 'info');
        }
    } catch (error) {
        console.error('Error loading data:', error);
    }
}
