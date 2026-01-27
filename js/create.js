/**
 * create.js - FINAL
 * Handles styling via CSS classes to ensure Light Mode works perfectly.
 */

// 1. Initial Data
let appState = {
    username: "AlexCarter",
    bio: "Welcome to my digital forest.",
    links: [
        { title: "My Portfolio", url: "#" },
        { title: "Instagram", url: "#" },
        { title: "Twitter", url: "#" }
    ]
};

// 2. Select Elements
const usernameInput = document.getElementById('username');
const bioInput = document.getElementById('bio');
const linksContainer = document.getElementById('linksContainer');
const addLinkBtn = document.getElementById('addLinkBtn');
const saveBtn = document.getElementById('saveBtn');

// 3. Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Load values
    if(usernameInput) usernameInput.value = appState.username;
    if(bioInput) bioInput.value = appState.bio;
    
    // Check Theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        document.body.classList.remove('dark-mode');
    } else {
        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-mode');
    }

    renderEditorList();
    updatePreview();
    setupDashboardButtons();
});

// 4. Render Editor List
function renderEditorList() {
    if (!linksContainer) return;
    linksContainer.innerHTML = '';
    
    appState.links.forEach((link, index) => {
        const item = document.createElement('div');
        // We use 'link-item' class so CSS handles the background color
        item.className = 'link-item mb-4 p-4 rounded-xl border'; 
        
        item.innerHTML = `
            <div class="flex justify-between items-center mb-2">
                <span class="text-xs font-bold label-text">LINK #${index + 1}</span>
                <button onclick="window.removeLink(${index})" class="text-red-400 text-xs hover:text-red-300 font-bold uppercase cursor-pointer">DELETE</button>
            </div>
            
            <input type="text" value="${link.title}" 
                   class="input-field w-full mb-2" 
                   placeholder="Link Title" 
                   oninput="window.updateLink(${index}, 'title', this.value)">
                   
            <input type="text" value="${link.url}" 
                   class="input-field w-full text-sm" 
                   placeholder="https://..." 
                   oninput="window.updateLink(${index}, 'url', this.value)">
        `;
        linksContainer.appendChild(item);
    });
}

// 5. Update Preview
function updatePreview() {
    if(usernameInput) appState.username = usernameInput.value;
    if(bioInput) appState.bio = bioInput.value;

    const pName = document.getElementById('previewUsername');
    const pBio = document.getElementById('previewBio');

    if(pName) pName.textContent = appState.username || '@username';
    if(pBio) pBio.textContent = appState.bio || 'Bio...';

    // Call the Leaf Renderer (Visuals only)
    if (window.renderLeafLayout) {
        window.renderLeafLayout('previewContent', appState);
    }
}

// 6. Global Helpers
window.updateLink = (index, key, value) => {
    appState.links[index][key] = value;
    updatePreview();
};

window.removeLink = (index) => {
    appState.links.splice(index, 1);
    renderEditorList();
    updatePreview();
};

if(addLinkBtn) {
    addLinkBtn.addEventListener('click', () => {
        appState.links.push({ title: "New Link", url: "#" });
        renderEditorList();
        updatePreview();
    });
}

if(usernameInput) usernameInput.addEventListener('input', updatePreview);
if(bioInput) bioInput.addEventListener('input', updatePreview);

// 7. Buttons & Interactions
function setupDashboardButtons() {
   // B. Custom Sign Out Modal Logic
    const signOutBtns = document.querySelectorAll('#signOutBtn, #signOutBtnMobile');
    const modal = document.getElementById('signOutModal');
    const cancelBtn = document.getElementById('cancelSignOut');
    const confirmBtn = document.getElementById('confirmSignOut');

    // 1. Open Modal
    signOutBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if(modal) {
                modal.classList.remove('hidden');
                // Small delay to allow CSS transition to fade in
                setTimeout(() => {
                    modal.classList.remove('opacity-0');
                    modal.querySelector('div').classList.remove('scale-95');
                    modal.querySelector('div').classList.add('scale-100');
                }, 10);
            }
        });
    });

    // 2. Close Modal (Cancel)
    if (cancelBtn && modal) {
        cancelBtn.addEventListener('click', () => {
            modal.classList.add('opacity-0');
            modal.querySelector('div').classList.add('scale-95');
            modal.querySelector('div').classList.remove('scale-100');
            
            // Wait for animation to finish before hiding
            setTimeout(() => {
                modal.classList.add('hidden');
            }, 300);
        });
    }

    // 3. Confirm Sign Out
    if (confirmBtn) {
        confirmBtn.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }

    // 4. Close if clicking outside the card (Backdrop click)
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                cancelBtn.click(); // Trigger the cancel logic
            }
        });
    }
    // Hamburger
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    if(hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            if(mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.remove('hidden');
            } else {
                mobileMenu.classList.add('hidden');
            }
        });
    }

    // Save Button
    if(saveBtn) {
        saveBtn.addEventListener('click', () => {
            const originalText = saveBtn.innerText;
            saveBtn.innerText = "Saved!";
            saveBtn.classList.add('bg-green-600', 'text-white');
            setTimeout(() => {
                saveBtn.innerText = originalText;
                saveBtn.classList.remove('bg-green-600', 'text-white');
            }, 2000);
        });
    }
}