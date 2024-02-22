// Import the functions you need from the SDKs you need
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDoc, getDocs } = require('firebase/firestore');
const { getAuth, signInWithEmailAndPassword, connectAuthEmulator } = require('firebase/auth');
const { txtEmail, txtPassword } = require('./ui');

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

connectAuthEmulator(auth, 'http://localhost:9099');
const signIn = async () => {
    const email = txtEmail.value;
    const password = txtPassword.value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log(user);
    } catch (error) {
        console.log(error);
    }
}

btnlogin.addEventListener('click', signIn);
