import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import {  makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Button from "component/Button"
import { useAuth } from "providers/AuthProvider";
import Axios from "axios";


const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor:'white',
    padding:'30px',
    border:'3px solid white',
    boxShadow:'0px 3px 10px grey',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  opacity:{
    opacity:'0.4'
  },
  itemPadding:{
    padding:'0px !important'
  },
  link:{
    textDecoration:'none !important'
  }
}));



export default function SignIn() {
  const classes = useStyles();
  const history = useHistory();
  const [state, setState] = React.useState({ userName: "", password: "" });
  const [loading, setLoading] = React.useState(false);
  const { signIn } = useAuth();
   const userId=[1,2,3,4,5];
  const[userRandom,setUser]=useState('');

  useEffect(()=>{
    const random = Math.floor(Math.random() * userId.length);
 
   Axios.get(`/api/users/${random}`)
  .then(res=>{console.log('users',res);setUser(res.data.userName)});
 

  },[]);

  const handleChange = e => {
    const { name, value } = e.target;
    setState(st => ({ ...st, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);
    const { userName, password } = state;
  

    signIn(userName, password)
      .then(() => history.replace("/"))
      .catch(error => {
        setLoading(false);
    });
  };

  return (
    <Container component="main" maxWidth="xs" >
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
       
        <form className={classes.form} noValidate>
          <Grid container spacing={3} direction='column'>
            <Grid item item xs={12} sm={12} className={classes.padding}>
            <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="userName"
            label="نام کاربری"
            name="userName"
            autoComplete="userName"
            autoFocus
            value={state.username}
            onChange={handleChange}
          /> 
          <span className={classes.opacity}>{userRandom}</span>
            </Grid>
            <Grid item item xs={12} sm={12} className={classes.padding}>
            <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="گذرواژه"
            type="password"
            id="password"
            autoComplete="current-password"
            value={state.password}
            onChange={handleChange}
          />
          <span className={classes.opacity}>123456</span>
            </Grid>
            <Grid item item xs={12} sm={12} className={classes.padding}>
            <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            loading={loading}
            onClick={handleSubmit}
          >
            ورود
          </Button>
            </Grid>
            <Grid item item xs={12} sm={12} className={classes.padding}>
              <Link to="/signup" variant="body2" className={classes.link}>
                {"ثبت نام"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
