import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDv5mdAfti6pLzr2XJhnI2lgM1U6kbLmLk",
  authDomain: "myapp-4ce75.firebaseapp.com",
  projectId: "myapp-4ce75",
  storageBucket: "myapp-4ce75.appspot.com",
  messagingSenderId: "1032440093151",
  appId: "1:1032440093151:web:752990fddf7fd2463b0c6a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);