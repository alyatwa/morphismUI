import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyD6KYqRzLIxsGkc5vTMkYWwAtqouIdAFk4",
    authDomain: "arduino-379bc.firebaseapp.com",
    databaseURL: "https://arduino-379bc.firebaseio.com",
    projectId: "arduino-379bc",
    storageBucket: "arduino-379bc.appspot.com",
    messagingSenderId: "303798008110",
    appId: "1:303798008110:web:631260c95ea01f1d52e2bf"
  };
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db, storage};