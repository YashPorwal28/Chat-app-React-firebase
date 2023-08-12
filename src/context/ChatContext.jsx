import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { auth } from "../firebas";
import { onAuthStateChanged } from "firebase/auth";
import { AuthContext } from "./AuthContext";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {

  const {currentUser} = useContext(AuthContext)

      // {
      //             user:{
      //             },
      //             chatId
      // }

    // chatid will be dependent on user so
    // using use reducer
    
    const INITAL_STATE = {
      chatId :"null",
      user:{

      }
    }

    const chatReducer = (state,action)=>{
      switch(action.type){
        case  "CHANGE_USER":
          return{
            user : action.payload,
            chatId:
            currentUser.uid > action.payload.uid
        ? currentUser.uid + action.payload.uid
        : action.payload.uid + currentUser.uid
          }

          default: 
          return state
      }
    }

    const [state,dispath] = useReducer(chatReducer, INITAL_STATE)

  return (          // it means that currentUser can reach all the componets ie childern
    <ChatContext.Provider value={{data:state , dispath}}>
      {children}
    </ChatContext.Provider>
  );
};