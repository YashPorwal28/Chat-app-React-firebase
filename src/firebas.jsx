// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {

  apiKey: "AIzaSyDbUwVcGeD42y5sDHD9NVICKtPwP_0d5uc",

  authDomain: "react-chat-ap.firebaseapp.com",

  projectId: "react-chat-ap",

  storageBucket: "react-chat-ap.appspot.com",

  messagingSenderId: "467601305723",

  appId: "1:467601305723:web:048ae1fb548935a8a132de",

  measurementId: "G-EGY3GDNCV4"

};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();