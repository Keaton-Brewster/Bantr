// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  signInWithPopup,
  inMemoryPersistence,
  setPersistence,
  GoogleAuthProvider,
} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAtHds16Ff78hO9pibKKiF4DxY_oNpadxY",
  authDomain: "bantr-19982022.firebaseapp.com",
  projectId: "bantr-19982022",
  storageBucket: "bantr-19982022.appspot.com",
  messagingSenderId: "94998621983",
  appId: "1:94998621983:web:3453913cda12e4db76ca2a",
  measurementId: "G-K2HDCY4TWL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const provider = new GoogleAuthProvider();
export default app;

// Set up for SignUp/LogIn
const auth = getAuth();
export function firebaseSignIn(user, err) {
  return setPersistence(auth, inMemoryPersistence).then(() => {
    signInWithPopup(auth, provider)
      .then((result) => user(result.user))
      .catch((e) => err(e.code, e.message));
  });
}

export function firebaseLogout() {
  return auth.signOut();
}
