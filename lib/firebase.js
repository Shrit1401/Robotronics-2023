import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDB8hThy1QGfJ5vQoNlJArfsSqQUWN-hks",
  authDomain: "metro-magnets.firebaseapp.com",
  projectId: "metro-magnets",
  storageBucket: "metro-magnets.appspot.com",
  messagingSenderId: "380632218482",
  appId: "1:380632218482:web:6154826e1f6e419dfc7beb",
  measurementId: "G-JM5WSC5NSL",
};
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
