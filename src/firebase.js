import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDgnQpRdGPE3LPV5Rfr4e8MgZjumhZc6Ns",
  authDomain: "whatsapp-clone-fc995.firebaseapp.com",
  projectId: "whatsapp-clone-fc995",
  storageBucket: "whatsapp-clone-fc995.appspot.com",
  messagingSenderId: "905065305840",
  appId: "1:905065305840:web:6742bf5a4a84007bf1d435",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
