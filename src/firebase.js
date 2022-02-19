import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword,sendEmailVerification   } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAbpQ93mJBtS6mKtyaghPGuD0P8tQt3CO0",
  authDomain: "second-aebc0.firebaseapp.com",
  projectId: "second-aebc0",
  storageBucket: "second-aebc0.appspot.com",
  messagingSenderId: "387247781700",
  appId: "1:387247781700:web:015c46a977a095bd528911"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export {getAuth, createUserWithEmailAndPassword,sendEmailVerification  }