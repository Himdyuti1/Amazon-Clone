import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBffjbV2vCVurq9XEI8WMFol7-aZyrYnuA",
  authDomain: "clone-c27b2.firebaseapp.com",
  projectId: "clone-c27b2",
  storageBucket: "clone-c27b2.appspot.com",
  messagingSenderId: "424130155313",
  appId: "1:424130155313:web:6d210b39a7c51955b3d610",
  measurementId: "G-QLWJ1Q7REK"
};

const firebaseApp=firebase.initializeApp(firebaseConfig);

const db=firebaseApp.firestore();
const auth=firebase.auth();

export {db,auth};