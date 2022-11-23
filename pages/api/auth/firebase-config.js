import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'

/// This is a demo keys and will reach max quota at some point
/// you need to add your own keys
const firebaseConfig = {
  apiKey: "AIzaSyD0bfjzN3pE4jG_wbP1Pdyx94Z_mvrFWy0",
  authDomain: "myapp-516c7.firebaseapp.com",
  projectId: "myapp-516c7",
  storageBucket: "myapp-516c7.appspot.com",
  messagingSenderId: "611469161616",
  appId: "1:611469161616:web:e54fdb68c7e28959c91415"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
