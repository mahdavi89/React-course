import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import { useAuth } from "providers/AuthProvider";
import AllPages from "pages/AllPages/AllPages";
import { Redirect, useHistory } from 'react-router-dom';
import SplitButton from 'component/ButtonGroup/ButtonGroup';
import Profile from 'pages/Profile/Profile';
import { Radio } from '@material-ui/core';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    backgroundColor:'#f5f5f5',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
  title: {
    flexGrow: 1,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },
  main:{
    zIndex:-1,
    position: 'relative',
    opacity:'0.5'
    
  }
}));

export default function SideBar() {
  const classes = useStyles();
  const { state } = useAuth();
  const history = useHistory();
  const[profile,setProfile]=useState(false);
  const [rdChecked,setChecked]=useState(true);
let {token,name}=state;

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  useEffect(()=>{
    console.log('token',token);
    console.log('name',name);
   },[])

  const handleDrawerOpen = () => {
    setOpen(true);
    setChecked(false);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setChecked(true);
  };

  const signout=()=>{
    console.log('hissid',history);
   history.replace('/signin');
  }

  const showProfile=()=>{
    setProfile(true);
    console.log('pro',profile)
  }

  const homeClick=()=>{
    setProfile(false);
  }

  const handleChecked=()=>{
    setChecked(!rdChecked);
  }

  return (
    !!token ?
      (  <div className={classes.root}>
        <CssBaseline />
       
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <SplitButton name={name} signout={signout} noWrap className={classes.title} showProfile={showProfile}/>
         
            <IconButton
              color="black"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerOpen}
              className={clsx(open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
          <div className={!rdChecked?classes.main:''}>
              {profile ?(<Profile name={name}/>):(<AllPages/>)}
          </div>
            
              
        </main>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="right"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
            <Radio checked={rdChecked} onClick={handleChecked}/>
          </div>
          <Divider />
          <List>
            {['خانه'].map((text, index) => (
              <ListItem button key={text} onClick={homeClick}>
                <ListItemIcon>< HomeIcon/></ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Drawer>
      </div>)
      :
      ( <Redirect to="/signin" />)
      
  
  );
}
