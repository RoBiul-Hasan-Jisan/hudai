import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAh6_-GKcvhPdtFHyIPFtUbZ9yt3oUuKSk",
  authDomain: "clicknibus-4e66b.firebaseapp.com",
  projectId: "clicknibus-4e66b",
  storageBucket: "clicknibus-4e66b.firebasestorage.app",
  messagingSenderId: "62498463192",
  appId: "1:62498463192:web:deb38eb9e02087c958a6ad",
  measurementId: "G-V8E1PCHTT9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Analytics (optional)
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export default app;