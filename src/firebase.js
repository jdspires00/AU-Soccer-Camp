import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD1mzW9ZvczpDKV3-bGzdcJgweEsM9XJiE",
  authDomain: "au-soccer-camp.firebaseapp.com",
  projectId: "au-soccer-camp",
  storageBucket: "gs://au-soccer-camp.appspot.com",
  messagingSenderId: "276472737768",
  appId: "1:276472737768:web:e94d4f068c29ba74ddbe5d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);