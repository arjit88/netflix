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
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_API_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signUp = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      // Consider pluralizing "user" to "users"
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
    toast.success("User registered successfully!");
  } catch (error) {
    toast.error(formatFirebaseError(error));
  }
};

const logIn = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    toast.success("User logged in successfully!");
  } catch (error) {
    toast.error(formatFirebaseError(error));
  }
};

const logOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    toast.error("Error logging out. Please try again.");
  }
};

// Helper function to format Firebase error messages
const formatFirebaseError = (error) => {
  return error.code.split("/")[1].split("-").join(" ") || "An error occurred";
};

export { auth, db, logIn, signUp, logOut };
