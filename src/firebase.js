import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, addDoc } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyC_Zyo3JAF8m1VNZtSImm3uewf71wNmSFc",
  authDomain: "au-soccer-camp-83519.firebaseapp.com",
  projectId: "au-soccer-camp-83519",
  storageBucket: "au-soccer-camp-83519.appspot.com",
  messagingSenderId: "546922932509",
  appId: "1:546922932509:web:2bf32bf24d461cda5a19f4",
  measurementId: "G-JM9MX1TK85"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };