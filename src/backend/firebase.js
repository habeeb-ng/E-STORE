// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, query, where , getDoc} from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDPN_GCWXeMBps5QAX8e2HyeDnWRGe0OgE",
  authDomain: "e-store-7d144.firebaseapp.com",
  projectId: "e-store-7d144",
  storageBucket: "e-store-7d144.appspot.com",
  messagingSenderId: "272737259008",
  appId: "1:272737259008:web:91afe02edcb60fa28592e5",
  measurementId: "G-64P4NNYJCB"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const userColRef = collection(db, "Users");
// console.log(userColRef);
// console.log(query(userColRef, where("userId", "==", "nhAZwe431peEFoQyReS4SV1r9h13")))
// const q = query(userColRef, where("userId", "==", "nhAZwe431peEFoQyReS4SV1r9h13"))

// console.log(getDocs(doc(userColRef,"Users)")))



const auth = getAuth(app);
export { auth , userColRef, db };

