import React, { useContext } from 'react'
import { ServiceContext } from './Service.Provider'

export default function useService() {
    const Service=useContext(ServiceContext)

    if (Service === undefined) {
        throw new Error("useService must be used within ServiceProvider");
      }
    
      return Service;
}