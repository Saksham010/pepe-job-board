
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAGrnRBIVo2cuIg7aeQvF0VCxgImC-Gkp4",
  authDomain: "remotepepejobs.firebaseapp.com",
  projectId: "remotepepejobs",
  storageBucket: "remotepepejobs.appspot.com",
  messagingSenderId: "404997417004",
  appId: "1:404997417004:web:3c7de3e8b96db6eaca4989",
  measurementId: "G-0V7BFMF4R1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const storage = getStorage(app);