// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC_cwSP-KeZRy_nkml3V_jb_O7Er63tcGM",
  authDomain: "learnhub-4840b.firebaseapp.com",
  projectId: "learnhub-4840b",
  storageBucket: "learnhub-4840b.firebasestorage.app",
  messagingSenderId: "755626888909",
  appId: "1:755626888909:web:0a2308de00e2ed51c46384",
  measurementId: "G-5E9FRG5EJ8"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

