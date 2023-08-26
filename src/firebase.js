// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDDdnJizToI-EbWFsEVKM6SvTSGrBhDT1M",
  authDomain: "car-rental-865e9.firebaseapp.com",
  projectId: "car-rental-865e9",
  storageBucket: "car-rental-865e9.appspot.com",
  messagingSenderId: "85636799577",
  appId: "1:85636799577:web:81fa276f5ad22fa0d7a548"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;