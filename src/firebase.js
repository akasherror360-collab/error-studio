import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD2O-wQkrtXRZRl_Sxq6plTtYcidK7njaI",
  authDomain: "error-studio-fd96c.firebaseapp.com",
  projectId: "error-studio-fd96c",
  storageBucket: "error-studio-fd96c.appspot.com",
  messagingSenderId: "842939614969",
  appId: "1:842939614969:web:29f2bc1fa22b641e0fc428",
  measurementId: "G-Z9WTNXNGSL"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

export default app;
