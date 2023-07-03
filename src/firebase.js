// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCMYwa6-GniNGBPoSMkzeBHupQhP28KXo0",
  authDomain: "pomodorotimerwebsi.firebaseapp.com",
  projectId: "pomodorotimerwebsi",
  storageBucket: "pomodorotimerwebsi.appspot.com",
  messagingSenderId: "258781671896",
  appId: "1:258781671896:web:379ef018fdc3167072c2ad",
  measurementId: "G-6JX9DYYTXM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app)

// firebase deploy --only hosting:minimaltomato