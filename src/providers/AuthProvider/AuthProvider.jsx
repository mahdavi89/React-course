import React, { useState, useEffect } from "react";
import axios from "axios";



export const AuthContext = React.createContext();

export function AuthProvider({ children }) {
  const [state, setState] = React.useState({token:'',name:''});
  
 


  const signUp=(name,userName,password)=>{
 
    const user={
      name,
      userName,
      password
    };
  return axios.post("/auth/register",{user})
    .then(res=>{setState({...state,name:res.data.user.name,token:res.data.token})});
    
};

const signIn=(userName,password)=>{

    const user={
      userName,
      password
    };
  return axios.post("/auth/login",user)
    .then(res=>{setState({...state,name:res.data.user.name,token:res.data.token})});
    
};


  const value = React.useMemo(() => ({  signUp,signIn,state }));

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}


