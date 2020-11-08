import React from 'react'
import { AuthContext } from './AuthProvider'

export default function useAuthContext() {
    const context=React.useContext(AuthContext)

    if(context===undefined){
        throw new Error('useCount must be within contextProvider');
    }

    const {user,signin,signup,signout}=context

    return {user,signin,signup,signout};
}