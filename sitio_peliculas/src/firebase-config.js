import firebase from 'firebase/app'
import 'firebase/firestore'

 var firebaseConfig = {
  apiKey: "AIzaSyAjafn7mXYw_W6PlLctj0cNbu3VVN9gJj0",
  authDomain: "reactpeliculas.firebaseapp.com",
  databaseURL: "https://reactpeliculas.firebaseio.com",
  projectId: "reactpeliculas",
  storageBucket: "reactpeliculas.appspot.com",
  messagingSenderId: "412167875869",
  appId: "1:412167875869:web:bc188fe122b53b8e3985f4",
  measurementId: "G-HFBJER9L5C"
}

// Initialize Firebase
const fireb = firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
//var database = firebase.database(); 

export default fireb;