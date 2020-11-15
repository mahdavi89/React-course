import { CircularProgress, makeStyles } from '@material-ui/core'
import { blue, green, grey, yellow } from '@material-ui/core/colors';
import { FullscreenExit } from '@material-ui/icons';
import React from 'react'


const useStyles = makeStyles(theme => ({
 loading:{
   position:"absolute",
   top:'100px',
   display:"flex",
   justifyContent: 'center',
   alignItems: 'center',
  alignContent: 'center',
  height:'100px',
  width:'35%',
  backgroundColor:green[800],
  border:'2px solid yellow',
  borderRadius:'10px',
  flexDirection:"column",
  zIndex:999,
  left:'30%',
 },
 circule:{
    color:'white',
    height:'60px',
    width:'60px',
    paddingBottom:0,
    marginBottom:0,
    paddingTop:'1px'
 },
 text:{
   fontSize:'17px',
   color:'white',
   paddingTop:0,
   marginTop:0
 }
}));


export default function SetInfoLoading() {
  const classes=useStyles();
    return(
        <div  className={classes.loading}>
        <CircularProgress className={classes.circule}/>
        <p className={classes.text}>در حال ارسال اطلاعات ، لطفا منتظر بمانید </p>
      </div>
    )
}