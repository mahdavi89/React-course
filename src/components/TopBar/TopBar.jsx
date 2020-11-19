import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import IconButton from "@material-ui/core/IconButton";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Button from "@material-ui/core/Button";
import { useAuth } from "providers/auth";
import { blue, grey, purple } from "@material-ui/core/colors";

const useStyles = makeStyles(theme => ({
  toolbar: {
    flexWrap: "wrap",
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
    color:'white',
    fontWeight: 'bold',
    fontStyle: 'italic',
    fontSize: 15,
   
  },
  appBar:{

    fontSize:'15px',
    backgroundColor:purple[999],
    color:blue[800],
  },
element:{
  color:'white',
  textDecoration:'none',
fontSize:'25px',
}
}));

export default function TopBar() {
  const classes = useStyles();
  const { user, signOut } = useAuth();

  // React.useEffect(() => {
  //   auth.onAuthStateChanged(function (u) {
  //     if (u) {
  //       setUser(u);
  //     } else {
  //       setUser(null);
  //     }
  //   });
  // }, []);

  return (
    <AppBar position="relative"  className={classes.appBar}>
      <Toolbar className={classes.toolbar} >
        <Typography
          variant="h6"
          color="inherit"
          noWrap
          className={classes.toolbarTitle}
        >
          ری اکت
        </Typography>
        <nav>
          <Link
            variant="button"
            component={RouterLink}
            to="/"
            className={classes.link}
          >
            صفحه اصلی
          </Link>
          <Link
            variant="button"
            color="textPrimary"
            component={RouterLink}
            to="/add"
            className={classes.link}
          >
            ایجاد پست
          </Link>
          {!!user && (
            <Link
              variant="button"
              color="textPrimary"
              component={RouterLink}
              to="/profile"
              className={classes.link}
            >
              <IconButton>
                <AccountCircleIcon   className={classes.element}/>
              </IconButton>
            </Link>
          )}
        </nav>
        {!!user ? (
          <IconButton onClick={signOut}   
          >
            <PowerSettingsNewIcon    className={classes.element}/>
          </IconButton>
        ) : (
          <Button variant="contained" component={RouterLink} to="/signin" 
          >
           ورود
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
