// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
    
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { 
    getFirestore, 
    doc, 
    setDoc, 
    getDoc 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

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

// Redefine the modal for the module's scope
const authModal = document.getElementById('authModal');

// Helper function to get user-friendly error messages
function getErrorMessage(errorCode) {
    switch (errorCode) {
        case 'auth/email-already-in-use':
            return 'This email is already registered. Please login instead.';
        case 'auth/invalid-email':
            return 'Please enter a valid email address.';
        case 'auth/weak-password':
            return 'Password should be at least 6 characters long.';
        case 'auth/user-not-found':
            return 'No account found with this email.';
        case 'auth/wrong-password':
        case 'auth/invalid-credential':
        case 'auth/invalid-login-credentials':
            return 'Incorrect email or password. Please try again.';
        case 'auth/too-many-requests':
            return 'Too many failed attempts. Please try again later.';
        case 'auth/network-request-failed':
            return 'Network error. Please check your connection.';
        default:
            return 'An error occurred. Please try again.';
    }
}

// --- SIGN UP LOGIC ---
const signupForm = document.getElementById('signup-form-element');
if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;

        createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                const user = userCredential.user;

        // Example: Create a document for the user in a 'users' collection
        await setDoc(doc(db, "users", user.uid), {
            email: user.email,
            createdAt: new Date(),
            links: [] 
        });
                window.showNotification('Welcome to LinkForest! Redirecting...', 'success');
                setTimeout(() => {
                    window.location.href = 'create.html';
                }, 1500);
            })
            .catch((error) => {
                const errorMessage = getErrorMessage(error.code);
                window.showNotification(errorMessage, 'error');
            });
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
                window.showNotification('Login successful! Redirecting...', 'success');
                setTimeout(() => {
                    window.location.href = 'create.html';
                }, 1500);
            })
            .catch((error) => {
                const errorMessage = getErrorMessage(error.code);
                window.showNotification(errorMessage, 'error');
            });
    });
}

// --- SIGN OUT LOGIC ---
const signOutBtn = document.getElementById('signOutBtn');
const signOutBtnMobile = document.getElementById('signOutBtnMobile');

const handleSignOut = () => {
    signOut(auth).then(() => {
        window.showNotification('Signed out successfully', 'success');
    }).catch((error) => {
        window.showNotification('Error signing out', 'error');
    });
};

if (signOutBtn) signOutBtn.addEventListener('click', handleSignOut);
if (signOutBtnMobile) signOutBtnMobile.addEventListener('click', handleSignOut);

// --- STATE OBSERVER ---
onAuthStateChanged(auth, (user) => {
    const mainBtn = document.getElementById('createLinkBtn');
    const signOutBtn = document.getElementById('signOutBtn');
    const signOutBtnMobile = document.getElementById('signOutBtnMobile');

    if (user) {
        if(mainBtn) {
            mainBtn.innerText = "Go to Dashboard";
            mainBtn.onclick = () => {
                window.location.href = 'create.html';
            };
        }
        if(signOutBtn) signOutBtn.classList.remove('hidden');
        if(signOutBtnMobile) signOutBtnMobile.classList.remove('hidden');
        console.log("Logged in as:", user.email);
      
    } else {
        if(mainBtn) {
            mainBtn.innerText = "Create Your Link";
            mainBtn.onclick = null;
        }
        if(signOutBtn) signOutBtn.classList.add('hidden');
        if(signOutBtnMobile) signOutBtnMobile.classList.add('hidden');
        console.log("User is signed out");
    }
});
