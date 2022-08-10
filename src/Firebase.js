import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDk3zrMSY7jlE34GNYzGnSAxIUWHJc21J4",
  authDomain: "workbook-components.firebaseapp.com",
  projectId: "workbook-components",
  storageBucket: "workbook-components.appspot.com",
  messagingSenderId: "162472111926",
  appId: "1:162472111926:web:303129f311bdf60ad70d97"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)