import { createContext, useEffect, useState } from "react";
import { auth } from "../firebas";
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});


  useEffect(() => {
      // to check whether any user is present
    const unsub = onAuthStateChanged(auth, (user) => {
        // if user is present
      setCurrentUser(user);
      // console.log(user);
    });
    // cleanup function to stop memory leaking
    return () => {
      unsub();
    };
  }, []);

  return (          // it means that currentUser can reach all the componets ie childern
    <AuthContext.Provider value={{currentUser}}>
      {children}
    </AuthContext.Provider>
  );
};