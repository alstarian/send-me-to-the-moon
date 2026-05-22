// firebase-config.js
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';

const firebaseConfig = {
  apiKey: "AIzaSyAHgeL8cnjLGegRPvL-VCLbd_PCTo81Xvg",
  authDomain: "expensetracker-650bb.firebaseapp.com",
  projectId: "expensetracker-650bb",
  storageBucket: "expensetracker-650bb.firebasestorage.app",
  messagingSenderId: "1049493175328",
  appId: "1:1049493175328:web:b3ba0b37fa104b3724d045",
  measurementId: "G-SX14TLQXTS"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

console.log('🔥 Firebase initialized successfully');
