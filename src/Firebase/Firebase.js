// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCkroZ6LpTN8i_ubaygqxWx-YFg7nkT_Lk",
    authDomain: "network-c70d4.firebaseapp.com",
    projectId: "network-c70d4",
    storageBucket: "network-c70d4.appspot.com",
    messagingSenderId: "702804337061",
    appId: "1:702804337061:web:9e4e47a904b4ba38c2884c",
    measurementId: "G-LWD3NZ36TB"
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app); 
const analytics = getAnalytics(app);