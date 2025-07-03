// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA1IhO1bE3SaJpYCdBBuGnzPFHkjy5LXtc",
  authDomain: "moviesai-9ae40.firebaseapp.com",
  projectId: "moviesai-9ae40",
  storageBucket: "moviesai-9ae40.firebasestorage.app",
  messagingSenderId: "671841047756",
  appId: "1:671841047756:web:35b32bc4f087bfb222de69",
  measurementId: "G-ZZRM6H9Q44"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();