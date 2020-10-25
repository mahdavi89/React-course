import React from 'react'
import Axios from 'axios'
import { useState } from 'react';
import { useEffect } from 'react';

const baseUrl=`${process.env.REACT_APP_BASE_URL}`;
const axios=Axios.create({
    baseUrl,
});


export default function useData(url) {
     let MyTag=<></>; 
    const[error,setError]=useState(undefined);
    const[isLoad,setIsLoading]=useState(false);
    const[items,setItems]=useState([]);


    
    useEffect(()=>{
       
        
            setIsLoading(true);
     
            axios.get(url)
            .then((res)=>{
                const items=res.data;
                
              setIsLoading(false);
              setItems(items);
            }
            ).catch((error)=>{
                setIsLoading(false);
                setError(error);
            })
        },[]);


   
    if(isLoad){
        MyTag= <h6>Loading...</h6>;
        return {items,MyTag}
    }
      if(!!error){
        MyTag= <h6>An Error Occured</h6>
        return {items,MyTag}
    }

   
    else{
  
        return {items,MyTag}
    }

   
}