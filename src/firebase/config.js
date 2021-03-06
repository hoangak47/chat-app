import firebase from 'firebase/compat/app';

import 'firebase/compat/analytics';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: 'AIzaSyAt22WYD0DfpY5WDNLLzdruE1Apn1bA3q4',
    authDomain: 'chat-app-fca21.firebaseapp.com',
    projectId: 'chat-app-fca21',
    storageBucket: 'chat-app-fca21.appspot.com',
    messagingSenderId: '998753393159',
    appId: '1:998753393159:web:4189cb779b92256e1868a2',
    measurementId: 'G-4GXP7B63B8',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

// if (window.location.hostname === 'localhost') {
//     auth.useEmulator('http://localhost:9099');
//     db.useEmulator('localhost', '8080');
// }

export { auth, db, storage };
export default firebase;
