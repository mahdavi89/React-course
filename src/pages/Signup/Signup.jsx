import React from "react";
import { Link, useHistory } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Button from "component/Button";
import {useAuth} from "providers/AuthProvider";


const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
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
  }
}));

export default function SignIn() {
  const classes = useStyles();
  const history = useHistory();
  const { signUp } = useAuth();
  const [state, setState] = React.useState({
    name: "",
    userName: "",
    password: ""
  });
  const [loading, setLoading] = React.useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setState(st => ({ ...st, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
  setLoading(true);
    const { name, userName, password } = state;
    
    signUp(name,userName,password)
    .then((res) => console.log('res',res))
      .catch(error => {
       setLoading(false);
     });

  };
   
  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
       
        <form className={classes.form} noValidate>
          <TextField
            autoComplete="name"
            name="name"
            variant="outlined"
            required
            fullWidth
            id="name"
            label="نام"
            autoFocus
            value={state.name}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="userName"
            label="نام کاربری"
            name="userName"
            autoComplete="userName"
            value={state.email}
            onChange={handleChange}
          />
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            loading={loading}
            onClick={handleSubmit}
          >
           ثبت نام
          </Button>
          <Grid container>
            <Grid item>
              <Link to="/signin" variant="body2">
                ورود
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
