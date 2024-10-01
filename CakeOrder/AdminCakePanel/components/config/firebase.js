// firebase.js
import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "1:1001417974948:android:6bea8d5237dae9d45eb231",
  authDomain: "com.myadmin",
  projectId: "adminapp-207b0",
  storageBucket: "adminapp-207b0.appspot.com",
  messagingSenderId: "1001417974948",
  appId: "1:1001417974948:android:6bea8d5237dae9d45eb231"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();
export { db };
