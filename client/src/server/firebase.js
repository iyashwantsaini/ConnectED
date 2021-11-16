import firebase from "firebase";

import "firebase/auth";
import "firebase/database";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDC4u40VvmO1Vvat-g5dsUI-paVvHoaYYg",
  authDomain: "connected-421d2.firebaseapp.com",
  projectId: "connected-421d2",
  storageBucket: "connected-421d2.appspot.com",
  messagingSenderId: "77769453050",
  appId: "1:77769453050:web:55ea103f818846ef54c843",
  measurementId: "G-L35JWZREWR",
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;
