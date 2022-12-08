import firebase from "firebase/app";

import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db };
