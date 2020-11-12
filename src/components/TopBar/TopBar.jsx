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

const useStyles = makeStyles(theme => ({
  toolbar: {
    flexWrap: "wrap"
  },
  toolbarTitle: {
    flexGrow: 1
  },
  link: {
    margin: theme.spacing(1, 1.5)
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
    <AppBar position="relative" color="default">
      <Toolbar className={classes.toolbar}>
        <Typography
          variant="h6"
          color="inherit"
          noWrap
          className={classes.toolbarTitle}
        >
          Learning React
        </Typography>
        <nav>
          <Link
            variant="button"
            color="textPrimary"
            component={RouterLink}
            to="/"
            className={classes.link}
          >
            Home
          </Link>
          <Link
            variant="button"
            color="textPrimary"
            component={RouterLink}
            to="/add"
            className={classes.link}
          >
            New Article
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
                <AccountCircleIcon />
              </IconButton>
            </Link>
          )}
        </nav>
        {!!user ? (
          <IconButton onClick={signOut}>
            <PowerSettingsNewIcon />
          </IconButton>
        ) : (
          <Button variant="contained" component={RouterLink} to="/signin">
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
