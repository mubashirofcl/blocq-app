import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyCvMhNwNXC7XGLBLcJZ6bj7TzVGsk0CXpQ",
    authDomain: "blocq-the-blogapp.firebaseapp.com",
    projectId: "blocq-the-blogapp",
    storageBucket: "blocq-the-blogapp.firebasestorage.app",
    messagingSenderId: "779508495928",
    appId: "1:779508495928:web:ccfc9e4ee8276c127618cd",
    measurementId: "G-C51HQSCT2F"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
