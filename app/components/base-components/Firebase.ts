import * as firebase from "firebase"
import "firebase/auth"

// import firebaseConfig from "../../config/env.js"

// Initialize Firebase App
const firebaseConfig = {
  apiKey: "AIzaSyAjBhq9KAtw8Jr40446AuCkZ6AtW6NMn5g",
  authDomain: "delphine-da7ca.firebaseapp.com",
  databaseURL: "https://delphine-da7ca.firebaseio.com",
  projectId: "delphine-da7ca",
  storageBucket: "delphine-da7ca.appspot.com",
  messagingSenderId: "408872061279",
  appId: "1:408872061279:web:13b99a2bbdbbe44a16ceea",
  measurementId: "G-J2SLZ8M211",
}
// @refresh reset
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export const auth = firebase.auth()

export const loginWithEmail = (email, password) => auth.signInWithEmailAndPassword(email, password)

export const registerWithEmail = (email, password) =>
  auth.createUserWithEmailAndPassword(email, password)

export const logout = () => auth.signOut()

export const passwordReset = (email) => auth.sendPasswordResetEmail(email)
