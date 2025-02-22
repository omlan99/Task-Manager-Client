import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
  } from "firebase/auth";
  import React, { useEffect, useState } from "react";
  import { createContext } from "react";
  import auth from "../Firebase/firebase.init";
import axios from "axios";
  // import useCommonAxios from "../Hook/useCommonAxios";
//                                                                                                                                                     
  export const AuthContext = createContext(null);
  const googleProvider = new GoogleAuthProvider();
  
  const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loader, setLoader] = useState(true);
    // const axiosCommon = useCommonAxios()
    // const axiosSecure = useAxiosSecure()
    const createUser = (email, password) => {
      setLoader(true);
      return createUserWithEmailAndPassword(auth, email, password);
    };
  
    const signInUser = (email, password) => {
      setLoader(true);
      return signInWithEmailAndPassword(auth, email, password);
    };
    const googleSignIn = () => {
      setLoader(true);
      return signInWithPopup(auth, googleProvider);
    };
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, async (loggedUser) => {
        try {
          setUser(loggedUser);
          // Optionally, sync with your backend if loggedUser exists
          if (loggedUser) {
            // ... your logic here ...
          }
        } catch (error) {
          console.error(error);
        } finally {
          setLoader(false);
        }
      });
      return () => {
        unsubscribe();
      };
    }, []);
    
  
    const updateUser = (name, photo) => {
      setLoader(true)
      return updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photo,
      });
      
    };
    const signOutUser = () => {
      setLoader(true);
  
      return signOut(auth);
    };
    const resetPassword = (email) => {
      return sendPasswordResetEmail(auth, email);
    };
  
    const authValue = {
      user,
      setUser,
      loader,
      createUser,
      signInUser,
      googleSignIn,
      updateUser,
      signOutUser,
      resetPassword,
    };
    return (
      <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
    );
  };
  export default AuthProvider;
  