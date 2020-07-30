import firebase from 'firebase'

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

firebase.initializeApp(firebaseConfig);
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;