import firebase from 'firebase/compat/app';
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDDoATWyY8__ugnjXjUmMcjtNurY9IYV0A",
  authDomain: "reservo-498d8.firebaseapp.com",
  projectId: "reservo-498d8",
  storageBucket: "reservo-498d8.appspot.com",
  messagingSenderId: "925574745934",
  appId: "1:925574745934:web:348a07580c17fdb25c181f",
  measurementId: "G-BXP2JTF78Y"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };

