import{getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCjg1o3uyVJGzBUHYg1IHS8rczy7DX_0-Y",
  authDomain: "assesment-52f1e.firebaseapp.com",
  projectId: "assesment-52f1e",
  storageBucket: "assesment-52f1e.appspot.com",
  messagingSenderId: "874764930198",
  appId: "1:874764930198:web:e231c8e05440678faf06b7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();



export {auth, provider, signInWithPopup};












