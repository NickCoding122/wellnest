import React, { createContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
} from 'firebase/firestore';
import { auth, db } from '../firebase/config';

/**
 * Provides global authentication state and functions for signing up,
 * signing in, signing out and updating user credit.  When the
 * Firebase auth state changes it fetches the corresponding user or
 * provider record from Firestore and stores it in local state.
 */
export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadingAuthState, setLoadingAuthState] = useState(true);

  // Listen for auth state changes and fetch user details from Firestore
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Try to load as a regular user first
        let docRef = doc(db, 'users', firebaseUser.uid);
        let snap = await getDoc(docRef);
        if (snap.exists()) {
          setUser({ uid: firebaseUser.uid, ...snap.data() });
        } else {
          // If not found, try providers collection
          docRef = doc(db, 'providers', firebaseUser.uid);
          snap = await getDoc(docRef);
          if (snap.exists()) {
            setUser({ uid: firebaseUser.uid, ...snap.data() });
          } else {
            // User has no document yet; set null
            setUser(null);
          }
        }
      } else {
        setUser(null);
      }
      setLoadingAuthState(false);
    });
    return () => unsubscribe();
  }, []);

  /**
   * Register a new user or provider in Firebase Authentication and
   * create a matching document in Firestore.  Customers start with
   * £20 credit; providers start with zero.  The role is stored in
   * the document so the UI can display the correct dashboard.
   */
  const register = async (name, email, password, isProvider) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    const uid = cred.user.uid;
    if (isProvider) {
      await setDoc(doc(db, 'providers', uid), {
        uid,
        name,
        email,
        role: 'provider',
        credit: 0,
        bio: '',
        category: '',
        rating: 0,
        price: 0,
      });
    } else {
      await setDoc(doc(db, 'users', uid), {
        uid,
        name,
        email,
        role: 'customer',
        credit: 20,
      });
    }
  };

  /**
   * Sign in a user using email and password.  The onAuthStateChanged
   * listener above will handle loading the user document.
   */
  const login = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  /**
   * Sign the current user out of Firebase.
   */
  const logout = async () => {
    await signOut(auth);
  };

  /**
   * Update the credit balance for a user or provider in Firestore and
   * update the local user state.  This can be used after
   * bookings or top‑ups.
   */
  const updateCredit = async (uid, newCredit, role) => {
    const collectionName = role === 'provider' ? 'providers' : 'users';
    const ref = doc(db, collectionName, uid);
    await updateDoc(ref, { credit: newCredit });
    setUser((prev) => (prev ? { ...prev, credit: newCredit } : prev));
  };

  return (
    <AuthContext.Provider
      value={{ user, loadingAuthState, register, login, logout, updateCredit }}
    >
      {children}
    </AuthContext.Provider>
  );
};