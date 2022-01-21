// Import the functions you need from the SDKs you need  
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDd0gRqwx83QWVBVTL7CAobHPt8WDd9pQA",
  authDomain: "learn-reactnative-firebase.firebaseapp.com",
  projectId: "learn-reactnative-firebase",
  storageBucket: "learn-reactnative-firebase.appspot.com",
  messagingSenderId: "865925074142",
  appId: "1:865925074142:web:965c4aab54e28eee09864f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
export const db = getFirestore(app);