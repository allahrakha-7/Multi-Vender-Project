// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "multi-vendor-ecommerce-store.firebaseapp.com",
  projectId: "multi-vendor-ecommerce-store",
  storageBucket: "multi-vendor-ecommerce-store.firebasestorage.app",
  messagingSenderId: "965923086165",
  appId: "1:965923086165:web:992dcd2562ef2cdc3099dc"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);