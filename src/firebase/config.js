import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

/**
 * Firebase configuration for the Wellnest app.  Replace the
 * placeholder values below with your own Firebase project's
 * credentials.  These values can be found in the Firebase console
 * under Project Settings -> General -> Your apps.
 */
const firebaseConfig = {
  apiKey: 'AIzaSyDBQkR598APWO1eibl4MHckTc5FsfApTE8',
  authDomain: 'wellnest-31195.firebaseapp.com',
  projectId: 'wellnest-31195',
  storageBucket: 'wellnest-31195.appspot.com',
  messagingSenderId: '450640463268',
  appId: '1:450640463268:web:564350d0232c2e5aa72d31',
};

// Initialize Firebase once and export the auth and database modules.
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);