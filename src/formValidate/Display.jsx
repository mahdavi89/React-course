import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { FormLabel, Grid } from '@material-ui/core';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(5),
    },
  },

  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
  marginMain: {
    marginTop: theme.spacing(6),
  },
  marginInside: {
    marginTop: theme.spacing(2),
  },
  EmailDisplayNone:{
    marginTop: theme.spacing(2),
    display:'none'
  },
  EmailDisplay:{
    marginTop: theme.spacing(2),
    display:'black'
  },
  nameLable:{
    marginRight: theme.spacing(1),
    fontSize: "1.25rem",
      fontWeight: "bold",
  }
}));

export default function Display(props) {
  const classes = useStyles();
  const [myClass,setClass]=useState();

  const getData = props.getData

  useEffect(()=>{
    if(getData){
      if(getData.isEmailVisible){
         setClass(classes.EmailDisplay)
      }
      else{
        setClass(classes.EmailDisplayNone)
      }
    }
  })
  return (
    <div >
      <Grid container spacing={1} alignItems="center" >

        <Grid item xs={12} sm={12} className={classes.marginMain}>
          <Avatar src={getData ? getData.avatar : ''} className={classes.large} />

        </Grid>
        <Grid item xs={12} sm={12} className={classes.marginMain}>
          <Grid item xs={12} sm={12} >
            <FormLabel className={classes.nameLable}>{getData ? getData.firstName : ''}</FormLabel><FormLabel className={classes.nameLable}>{getData ? getData.lastName : ''}</FormLabel>
          </Grid>
          <Grid item xs={12} sm={12} className={myClass}>
            <FormLabel >{getData ? getData.email : ''}</FormLabel>
          </Grid>
          <Grid item xs={12} sm={12} className={classes.marginInside}>
            <FormLabel >{getData ? getData.phone : ''}</FormLabel>
          </Grid>
          <Grid item xs={12} sm={12} className={classes.marginInside}>
            <FormLabel >{getData ? getData.birthDate : ''}</FormLabel>
          </Grid>
          <Grid item xs={12} sm={12} className={classes.marginInside}>
            <FormLabel >{getData ? getData.title : ''}</FormLabel>
          </Grid>
          <Grid item xs={12} sm={12} className={classes.marginInside}>
            <FormLabel >{getData ? getData.gender : ''}</FormLabel>
          </Grid>
          <Grid item xs={12} sm={12} className={classes.marginInside}>
            <FormLabel >{getData ? getData.address : ''}</FormLabel>
          </Grid>

        </Grid>
      </Grid>
    </div>
  );
}
