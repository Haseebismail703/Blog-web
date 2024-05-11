import { initializeApp } from "firebase/app";
import { getAuth,  onAuthStateChanged, createUserWithEmailAndPassword,signInWithEmailAndPassword ,signOut,updateProfile, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {getFirestore, addDoc,getDoc, setDoc,collection,doc,getDocs , updateDoc , deleteDoc,
  query, where,serverTimestamp


} from "firebase/firestore"; 
import { getStorage, ref , uploadBytes, uploadBytesResumable, getDownloadURL  } from "firebase/storage";



const firebaseConfig = {
  apiKey: "AIzaSyD0FjVwlw_dnXudam_YmvtG-yipsLD8efg",
  authDomain: "project-1-64704.firebaseapp.com",
  databaseURL: "https://project-1-64704-default-rtdb.firebaseio.com",
  projectId: "project-1-64704",
  storageBucket: "project-1-64704.appspot.com",
  messagingSenderId: "658759651298",
  appId: "1:658759651298:web:26348013c0010a765cf3bb",
  measurementId: "G-XV94SF7FXY"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();
const storage = getStorage();
const provider = new GoogleAuthProvider();
export {
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut ,
    addDoc, 
    setDoc,
    db,
    collection,
    doc,
    getDocs,
    getAuth,
    updateDoc,
    getDoc
    , deleteDoc,
    storage,
    ref,
   uploadBytes , 
   uploadBytesResumable, 
   getDownloadURL
   ,  onAuthStateChanged
   ,updateProfile,
   query, where,serverTimestamp,
    signInWithPopup, GoogleAuthProvider,provider
}