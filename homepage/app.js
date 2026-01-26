import { initializeApp } from
"https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from
"https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

import {
  getFirestore
} from
"https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDnM04utnnZtgrXOX_G9b1WuXQmpSKTXCE",
  authDomain: "linkforest-9955a.firebaseapp.com",
  projectId: "linkforest-9955a",
  storageBucket: "linkforest-9955a.appspot.com",
  messagingSenderId: "721038878836",
  appId: "1:721038878836:web:0a43d37de9f74865e74921"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Services
const auth = getAuth(app);
const db = getFirestore(app);

console.log("Firebase fully connected ✅");
