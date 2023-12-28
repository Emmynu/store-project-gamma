// Initialize Firebase
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { GoogleAuthProvider, getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyAjOw1LmvmCOaywCsCe5sOxQoJL1P3DMVA",
  authDomain: "store-project-ee371.firebaseapp.com",
  projectId: "store-project-ee371",
  storageBucket: "store-project-ee371.appspot.com",
  messagingSenderId: "1016967687851",
  appId:"1:1016967687851:web:ba143102da4009a3b991ee",
  measurementId: "G-BK58JHY65K"
};

const app = initializeApp(firebaseConfig)
export const db = getDatabase(app)
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const storage = getStorage(app)