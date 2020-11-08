import userEvent from '@testing-library/user-event'
import React, { useEffect, useState } from 'react'
import {auth} from './firebase'

export const AuthContext=React.createContext()

export default function AuthProvider({children}) {
    const[user,setUser]=useState(false);

    const signin=(email, password) =>{
     return auth.signInWithEmailAndPassword(email, password)
        .then(setUser(true))
      }
      
     const signup=(email, password, name)=> {
        return auth
          .createUserWithEmailAndPassword(email, password)
          .then(async user => {
            if (!!user) {
                setUser(true);
              await auth.currentUser.updateProfile({ displayName: name });
            }
            return user;
          });
      }
      
      const signout=()=> {
        return auth.signOut().then(setUser(false));
      }

      React.useEffect(() => {
        auth.onAuthStateChanged(u => {
          if (!!u) {
            setUser(u);
          } else {
            setUser(null);
          }
        });
      }, []);

    return(
        <>
         <AuthContext.Provider value={{user,signin,signup,signout}}>
             {children}
         </AuthContext.Provider>
        </>
    )
}