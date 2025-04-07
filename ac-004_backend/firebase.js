import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'; // Import Firestore
import config from './config.js';

// Initialize Firebase
const firebase = initializeApp(config.firebaseConfig);

// Initialize Firestore
const db = getFirestore(firebase);

export { firebase, db }; // Export both the Firebase app and Firestore
