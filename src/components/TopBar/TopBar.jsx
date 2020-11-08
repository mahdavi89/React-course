import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import useAuthContext from "services/useAuthContext";
// import { auth, signout } from "services";


const useStyles = makeStyles(theme => ({
  toolbar: {
    flexWrap: "wrap"
  },
  title: { flexGrow: 1 },
  link: {
    margin: theme.spacing(1, 1.5)
  }
}));

export default function TopBar() {
  const classes = useStyles();
  const {signout,user}=useAuthContext()
  //const [user, setUser] = React.useState(null);

  // React.useEffect(() => {
  //   auth.onAuthStateChanged(u => {
  //     if (!!u) {
  //       setUser(u);
  //     } else {
  //       setUser(null);
  //     }
  //   });
  // }, []);

  return (
    <AppBar position="relative" color="default">
      <Toolbar className={classes.toolbar}>
        <Typography
          variant="h6"
          color="inherit"
          noWrap
          className={classes.title}
        >
          Learning React
        </Typography>
        <nav>
          <Link
            component={RouterLink}
            to="/"
            className={classes.link}
            variant="button"
          >
            Home
          </Link>
          <Link
            component={RouterLink}
            to="/new"
            className={classes.link}
            variant="button"
          >
            New
          </Link>
          {!!user && (
            <Link
              component={RouterLink}
              to="/profile"
              className={classes.link}
              variant="button"
            >
              Profile
            </Link>
          )}
        </nav>
        {!!user ? (
          <Button variant="outlined" onClick={signout}>
            Sign Out
          </Button>
        ) : (
          <Button variant="outlined" component={RouterLink} to="/signin">
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
