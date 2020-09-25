module.exports = __DEV__ ? require("./env.dev") : require("./env.prod")

export const firebaseConfig = {
  apiKey: "AIzaSyAjBhq9KAtw8Jr40446AuCkZ6AtW6NMn5g",
  authDomain: "delphine-da7ca.firebaseapp.com",
  databaseURL: "https://delphine-da7ca.firebaseio.com",
  projectId: "delphine-da7ca",
  storageBucket: "delphine-da7ca.appspot.com",
  messagingSenderId: "408872061279",
  appId: "1:408872061279:web:13b99a2bbdbbe44a16ceea",
  measurementId: "G-J2SLZ8M211",
}
