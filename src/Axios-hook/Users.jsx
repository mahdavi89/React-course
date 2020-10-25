import React from 'react'
import useData from './useData'


export default function Users() {
    const {items,MyTag}=useData('/users')

    if(items.length >0){
       
        return (
            <ul>
                {items.map(u=>(
                <li key={u.id}>{u.name}</li>
                 ))}
            </ul>
        )
    }
    
    return(
        MyTag
    )
}