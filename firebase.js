import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCUSJslTHyFWoq0zJ2vdf-DsPCU8S9vDxk",
  authDomain: "the-florist-fdebc.firebaseapp.com",
  projectId: "the-florist-fdebc",
  storageBucket: "the-florist-fdebc.appspot.com",
  messagingSenderId: "285843661405",
  appId: "1:285843661405:web:1ef1f8b00e863ccf71a3b4"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };