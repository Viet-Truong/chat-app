import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBmvWbA6WwxvnkevG9VFWRjfjwOndtee6Y",
    authDomain: "chat-app-60f86.firebaseapp.com",
    projectId: "chat-app-60f86",
    storageBucket: "chat-app-60f86.appspot.com",
    messagingSenderId: "646645538624",
    appId: "1:646645538624:web:41b2e1d6f65735a35ea4a5",
    measurementId: "G-JEZVK2HWBH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const storage = getStorage();
const db = getFirestore(app);

export { auth, app, storage, db };
