// lib/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDhmm8_51X2hK5622H_tqAdi8H89zvj6j8",
    authDomain: "inspiratie-galerij-721b7.firebaseapp.com",
    projectId: "inspiratie-galerij-721b7",
    storageBucket: "inspiratie-galerij-721b7.firebasestorage.app",
    messagingSenderId: "637528438557",
    appId: "1:637528438557:web:f6892c1bfbbd3bdb7a53f4",
    measurementId: "G-Z4J8QZLQX2"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
