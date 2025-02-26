import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAXzDbLxqr0RzKsayChndkWnMkPj7HcGdo",
    authDomain: "learning1-723be.firebaseapp.com",
    projectId: "learning1-723be",
    storageBucket: "learning1-723be.firebasestorage.app",
    messagingSenderId: "475049819377",
    appId: "1:475049819377:web:018f6cb88701e07bff3d50",
    measurementId: "G-YNE4TC999Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
