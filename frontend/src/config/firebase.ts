import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyCo-9hMkfs4msj8EIaWvT4EHUb4n6BVmI0",
    authDomain: "cwsproject-38a63.firebaseapp.com",
    databaseURL: "https://cwsproject-38a63-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "cwsproject-38a63",
    storageBucket: "cwsproject-38a63.firebasestorage.app",
    messagingSenderId: "822222382510",
    appId: "1:822222382510:web:8fc4e1b65b2e0bf05f143f",
    measurementId: "G-MM64XNE7XG"
};
  
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore()

export {app,auth,db}