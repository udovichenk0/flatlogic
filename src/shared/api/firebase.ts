// Import the functions you need from the SDKs you need
import { getFirestore } from "firebase/firestore";

import { initializeApp } from "firebase/app";
// web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB7YLACybcXs1g1FzmcDMAIah9KDJYOl1A",
  authDomain: "flatlogic-bb6a9.firebaseapp.com",
  projectId: "flatlogic-bb6a9",
  storageBucket: "flatlogic-bb6a9.appspot.com",
  messagingSenderId: "867576179923",
  appId: "1:867576179923:web:197689ba29a5030dd8f826",
  databaseURL: "https://flatlogic-bb6a9.eur3.firebaseio.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
