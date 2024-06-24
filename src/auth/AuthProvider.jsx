import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { auth } from "../firebase";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = async (email, password) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await user.getIdToken(true); // Force token refresh to include custom claims
    const idTokenResult = await user.getIdTokenResult();
    console.log('Custom claims on createUser:', idTokenResult.claims);
    setRole(idTokenResult.claims.role || 'student');
    return userCredential;
  };
  
  const loginUser = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await user.getIdToken(true); // Force token refresh to include custom claims
    const idTokenResult = await user.getIdTokenResult();
    setRole(idTokenResult.claims.role);
    return userCredential;
  };

  const logOut = () => {
    setRole(null);
    return signOut(auth);
  };
  
  const updateRole = async () => {
    if (user) {
      await user.getIdToken(true); // Force token refresh to include custom claims
      const idTokenResult = await user.getIdTokenResult();
      setRole(idTokenResult.claims.role);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        await currentUser.getIdToken(true); // Force token refresh to include custom claims
        const idTokenResult = await currentUser.getIdTokenResult();
        setUser(currentUser);
        setRole(idTokenResult.claims.role);
      } else {
        setUser(null);
        setRole(null);
      }
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const authValue = {
    createUser,
    user,
    role,
    loginUser,
    logOut,
    updateRole,
    loading,
  };
  
  return <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
