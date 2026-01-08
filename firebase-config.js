// firebase-config.js
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getFirestore, enableIndexedDbPersistence } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAHgeL8cnjLGegRPvL-VCLbd_PCTo81Xvg",
  authDomain: "expensetracker-650bb.firebaseapp.com",
  projectId: "expensetracker-650bb",
  storageBucket: "expensetracker-650bb.firebasestorage.app",
  messagingSenderId: "1049493175328",
  appId: "1:1049493175328:web:b3ba0b37fa104b3724d045",
  measurementId: "G-SX14TLQXTS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// Enable offline persistence
enableIndexedDbPersistence(db)
  .then(() => {
    console.log('✅ Offline persistence enabled');
  })
  .catch((err) => {
    if (err.code == 'failed-precondition') {
      console.warn('⚠️ Multiple tabs open, persistence only works in one tab');
    } else if (err.code == 'unimplemented') {
      console.warn('⚠️ Browser doesn\'t support persistence');
    }
  });

console.log('🔥 Firebase initialized successfully');
