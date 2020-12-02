import React from "react";
import { Switch, Route } from "react-router-dom";
import Container from "@material-ui/core/Container";

import { makeStyles } from "@material-ui/core";
import { useStyles } from "@material-ui/pickers/views/Calendar/Day";
import SideBar from "./SideBar";


const useStyle=makeStyles((theme)=>({
  Container: {
    width: '100%',
    marginTop:'50px !important'
  },
}))

export default function Main() {
  const classes=useStyles();
  return (
    <Container >
      
       
       <SideBar/>
    </Container>
    
         



   
   
  );
}
