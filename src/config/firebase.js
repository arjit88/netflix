import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyBU9UJOAvsz7aRb1sARKoOMBp05S0Y_a0A",
  authDomain: "netflix-clone-af892.firebaseapp.com",
  projectId: "netflix-clone-af892",
  storageBucket: "netflix-clone-af892.appspot.com",
  messagingSenderId: "364546604243",
  appId: "1:364546604243:web:903bef143eab231c41e826",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signUp = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (error) {
    toast.error(error.code.split("/")[1].split("-").join(" "));
  }
};

const logIn = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    toast.error(error.code.split("/")[1].split("-").join(" "));
  }
};

const logOut = () => {
  signOut(auth);
};

export { auth, db, logIn, signUp, logOut };
