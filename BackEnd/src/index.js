// Import the functions you need from the SDKs you need
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDoc, getDocs } = require('firebase/firestore');
const { getAuth } = require('firebase/auth');

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyB7dTxA5LTDSKAFTlyJ3l_YYeMikxqIWGc',
  authDomain: 'tabaro3-9ce2a.firebaseapp.com',
  projectId: 'tabaro3-9ce2a',
  storageBucket: 'tabaro3-9ce2a.appspot.com',
  messagingSenderId: '1019511077492',
  appId: '1:1019511077492:web:a88b77c611834300c9ef21'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firestore
const db = getFirestore(app);
// Initialize Authentication
const auth = getAuth(app);

// collection reference
const usersCollection = collection(db, 'users');

getDocs(usersCollection).then((querySnapshot) => {
  for (const doc of querySnapshot.docs) {
    console.log(doc.id, ' => ', doc.data());
  }
});