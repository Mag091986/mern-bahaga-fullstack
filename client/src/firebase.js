// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-bahaga.firebaseapp.com",
  projectId: "mern-bahaga",
  storageBucket: "mern-bahaga.appspot.com",
  messagingSenderId: "610788986462",
  appId: "1:610788986462:web:f0c7bf1e3326a78c46eecf"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);