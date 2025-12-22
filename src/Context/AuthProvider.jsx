import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase/firebase.init";

const googleAuthProvider = new GoogleAuthProvider()

const AuthProvider = ({ children }) => {

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const createUser = (email, password) => {

    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle =()=>{
      setLoading(true)
      return signInWithPopup(auth ,googleAuthProvider )
   }

  const logout = async() => {
try {
    setLoading(true);
    await signOut(auth); // <-- must await
    return true; // <-- return something
  } catch (error) {
    console.log(error);
    return false;
  } finally {
    setLoading(false);
  }
  };

  useEffect(() => {
    const unSubsCribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      unSubsCribe();
    };
  }, []);

  const authInfo = {
    createUser,
    signInUser,
    loading,
    user,
    logout,
    signInWithGoogle
  };
  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
