/**
 * create.js - FINAL INTEGRATED VERSION
 */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
    getAuth, 
    onAuthStateChanged, 
    signOut 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { 
    getFirestore, 
    doc, 
    getDoc, 
    setDoc 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 1. Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyAxMXV4agjCwvVwy3tC9bGD6zToiUKjtnc",
  authDomain: "linkforest-ca150.firebaseapp.com",
  projectId: "linkforest-ca150",
  storageBucket: "linkforest-ca150.firebasestorage.app",
  messagingSenderId: "834188422747",
  appId: "1:834188422747:web:d5dee5cdde2eb82cb4997e"
};

// 2. Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// 3. Application State (Initially empty, populated from Firestore)
let appState = {
    username: "",
    bio: "",
    links: []
};

// 4. Select Elements
const usernameInput = document.getElementById('username');
const bioInput = document.getElementById('bio');
const linksContainer = document.getElementById('linksContainer');
const addLinkBtn = document.getElementById('addLinkBtn');
const saveBtn = document.getElementById('saveBtn');

// 5. Auth State Observer - Fetches data when user arrives
onAuthStateChanged(auth, async (user) => {
    if (user) {
        console.log("Authenticated user UID:", user.uid);
        try {
            const userDocRef = doc(db, "users", user.uid);
            const userDocSnap = await getDoc(userDocRef);

            if (userDocSnap.exists()) {
                const data = userDocSnap.data();
                // Update local state with existing Firestore data
                appState.username = data.username || "";
                appState.bio = data.bio || "";
                appState.links = data.links || [];
                
                // Sync UI with the fetched data
                renderUserData();
            }
        } catch (error) {
            console.error("Error loading user data:", error);
        }
    } else {
        // Redirect if not logged in
        window.location.href = 'index.html';
    }
});

// 6. UI Rendering Functions
function renderUserData() {
    if(usernameInput) usernameInput.value = appState.username;
    if(bioInput) bioInput.value = appState.bio;
    renderEditorList();
    updatePreview();
}

function renderEditorList() {
    if (!linksContainer) return;
    linksContainer.innerHTML = '';
    
    appState.links.forEach((link, index) => {
        const item = document.createElement('div');
        item.className = 'link-item mb-4 p-4 rounded-xl border'; 
        
        item.innerHTML = `
            <div class="flex justify-between items-center mb-2">
                <span class="text-xs font-bold label-text">LINK #${index + 1}</span>
                <button onclick="window.removeLink(${index})" class="text-red-400 text-xs hover:text-red-300 font-bold uppercase cursor-pointer">DELETE</button>
            </div>
            <input type="text" value="${link.title}" class="input-field w-full mb-2" placeholder="Link Title" oninput="window.updateLink(${index}, 'title', this.value)">
            <input type="text" value="${link.url}" class="input-field w-full text-sm" placeholder="https://..." oninput="window.updateLink(${index}, 'url', this.value)">
        `;
        linksContainer.appendChild(item);
    });
}

function updatePreview() {
    const pName = document.getElementById('previewUsername');
    const pBio = document.getElementById('previewBio');

    if(pName) pName.textContent = appState.username || '@username';
    if(pBio) pBio.textContent = appState.bio || 'Bio...';

    // Calls your leaf-renderer.js visuals
    if (window.renderLeafLayout) {
        window.renderLeafLayout('previewContent', appState);
    }
}

// 7. Global Helpers (for inline events like oninput/onclick)
window.updateLink = (index, key, value) => {
    appState.links[index][key] = value;
    updatePreview();
};

window.removeLink = (index) => {
    appState.links.splice(index, 1);
    renderEditorList();
    updatePreview();
};

// 8. Input Event Listeners
if(addLinkBtn) {
    addLinkBtn.addEventListener('click', () => {
        appState.links.push({ title: "New Link", url: "#" });
        renderEditorList();
        updatePreview();
    });
}

if(usernameInput) usernameInput.addEventListener('input', (e) => {
    appState.username = e.target.value;
    updatePreview();
});

if(bioInput) bioInput.addEventListener('input', (e) => {
    appState.bio = e.target.value;
    updatePreview();
});

// 9. Firestore Save Logic
if(saveBtn) {
    saveBtn.addEventListener('click', async () => {
        const user = auth.currentUser;
        if (!user) return;

        const originalText = saveBtn.innerText;
        saveBtn.innerText = "Saving...";
        
        try {
            // Save the current appState to the document matching the user's UID
            await setDoc(doc(db, "users", user.uid), {
                username: appState.username,
                bio: appState.bio,
                links: appState.links
            }, { merge: true }); // Merge: true preserves fields like 'email' and 'createdAt'

            saveBtn.innerText = "Saved!";
            saveBtn.classList.add('bg-green-600', 'text-white');
            setTimeout(() => {
                saveBtn.innerText = originalText;
                saveBtn.classList.remove('bg-green-600', 'text-white');
            }, 2000);
        } catch (error) {
            console.error("Save error:", error);
            saveBtn.innerText = "Error!";
        }
    });
}

// 10. Initialization & Modal Logic
document.addEventListener('DOMContentLoaded', () => {
    // Theme logic
    const savedTheme = localStorage.getItem('theme');
    document.body.classList.add(savedTheme === 'light' ? 'light-mode' : 'dark-mode');

    // Sign Out Modal Logic
    const signOutBtns = document.querySelectorAll('#signOutBtn, #signOutBtnMobile');
    const modal = document.getElementById('signOutModal');
    const confirmBtn = document.getElementById('confirmSignOut');
    const cancelBtn = document.getElementById('cancelSignOut');

    signOutBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if(modal) {
                modal.classList.remove('hidden');
                setTimeout(() => modal.classList.remove('opacity-0'), 10);
            }
        });
    });

    cancelBtn?.addEventListener('click', () => {
        modal?.classList.add('opacity-0');
        setTimeout(() => modal?.classList.add('hidden'), 300);
    });

    confirmBtn?.addEventListener('click', () => {
        signOut(auth).then(() => {
            window.location.href = 'index.html';
        });
    });
});


// --- FIRESTORE SAVE LOGIC ---
if (saveBtn) {
    saveBtn.addEventListener('click', async () => {
        // Get the currently logged-in user
        const user = auth.currentUser;
        
        if (!user) {
            window.showNotification('You must be logged in to save.', 'error');
            return;
        }

        const originalText = saveBtn.innerText;
        saveBtn.innerText = "Saving...";
        
        try {
            // Reference the specific document for this user using their UID
            const userDocRef = doc(db, "users", user.uid);

            // Save the appState (username, bio, and links array) to Firestore
            await setDoc(userDocRef, {
                username: appState.username,
                bio: appState.bio,
                links: appState.links,
                lastUpdated: new Date()
            }, { merge: true }); // merge: true prevents overwriting email/createdAt

            // Success UI Feedback
            saveBtn.innerText = "Saved!";
            saveBtn.classList.add('bg-green-600', 'text-white');
            
            setTimeout(() => {
                saveBtn.innerText = originalText;
                saveBtn.classList.remove('bg-green-600', 'text-white');
            }, 2000);

        } catch (error) {
            console.error("Error saving to Firestore:", error);
            saveBtn.innerText = "Error Saving";
            setTimeout(() => { saveBtn.innerText = originalText; }, 2000);
        }
    });
}