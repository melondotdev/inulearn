// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from '@firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBW9hZPor2zmS1vfoINnh6814k6qfNywZA",
  authDomain: "inulearn.firebaseapp.com",
  projectId: "inulearn",
  storageBucket: "inulearn.appspot.com",
  messagingSenderId: "1072285413997",
  appId: "1:1072285413997:web:3328c9ab39cdab0e1e0564",
  measurementId: "G-NJ4LE2VY9Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
