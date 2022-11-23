import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.API,
  authDomain: process.env.DOMAIN,
  projectId: "myapp-516c7",
  storageBucket: "myapp-516c7.appspot.com",
  messagingSenderId: "611469161616",
  appId: process.env.APP,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);