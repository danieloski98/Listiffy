// Import the functions you need from the SDKs you need
import { initializeApp,  } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { Firestore, enableNetwork } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDqRZynk8d-f_sozpyzTQGICJs99uiJ-cw",
  authDomain: "agape-force.firebaseapp.com",
  databaseURL: "https://agape-force.firebaseio.com",
  projectId: "agape-force",
  storageBucket: "agape-force.appspot.com",
  messagingSenderId: "1059923057791",
  appId: "1:1059923057791:web:d4a4495d86176b79b9f34a"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const FireStoreDb = getFirestore(app);
enableNetwork(FireStoreDb);