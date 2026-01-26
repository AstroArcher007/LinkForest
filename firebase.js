// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

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
// Redefine the modal for the module's scope
const authModal = document.getElementById('authModal');

// --- SIGN UP LOGIC ---
const signupForm = document.getElementById('signup-form-element');
if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                authModal.classList.remove('active'); 
                alert("Welcome to LinkForest!");
            })
            .catch((error) => alert(error.message));
    });
}

// --- LOGIN LOGIC ---
const loginForm = document.getElementById('login-form-element');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                authModal.classList.remove('active');
                alert("Logged in!");
            })
            .catch((error) => alert(error.message));
    });
}

// --- STATE OBSERVER ---
onAuthStateChanged(auth, (user) => {
    const mainBtn = document.getElementById('createLinkBtn');
    if (user) {
        if(mainBtn) mainBtn.innerText = "Go to Dashboard";
        console.log("Logged in as:", user.email);
        // You can add a redirect here later: window.location.href = 'dashboard.html';
    } else {
        if(mainBtn) mainBtn.innerText = "Create Your Link";
        console.log("User is signed out");
    }
});