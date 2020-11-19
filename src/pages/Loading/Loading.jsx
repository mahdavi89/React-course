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
  height:'150px',
  width:'30%',
  left:'30%',
  zIndex:999
 },


}));


export default function Loading() {
  const classes=useStyles();
    return(
        <div  className={classes.loading}>
        <CircularProgress />
      </div>
    )
}