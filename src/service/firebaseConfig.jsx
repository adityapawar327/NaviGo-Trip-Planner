// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAmMBb9b4aTAR19Aa_SZBDaNTAVcAHo0N8",
  authDomain: "navigo-887965.firebaseapp.com",
  projectId: "navigo-887965",
  storageBucket: "navigo-887965.firebasestorage.app",
  messagingSenderId: "468305737286",
  appId: "1:468305737286:web:9fb02ef6a05fc26f457c47",
  measurementId: "G-Y0PF83BDBJ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app)
// const analytics = getAnalytics(app);