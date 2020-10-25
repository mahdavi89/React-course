import React, { useRef, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import {
  ThemeProvider,
  makeStyles,
  createMuiTheme
} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { green, pink } from "@material-ui/core/colors";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import { Container, CssBaseline, FormControlLabel, FormLabel, Radio, RadioGroup } from '@material-ui/core';
import withForm from './withForm';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    formControl: {
      margin: theme.spacing(1),
      width: '100%'
    },
    selectEmpty: {
      marginTop: theme.spacing(1),
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    margin: {
      margin: theme.spacing(1)
    },
    float: {
      float: 'right',
    },
    input: {
      display: 'none',
    },
  
  }));
  
  
  
  const theme = createMuiTheme({
    palette: {
      primary: green,
      secondary: pink,
    }
  });


  export function Form({handleChangeInput,initial,error,handleChangeSwitch,handleFileselected,handleSubmit,disableSubmit}) {
    const classes = useStyles();
   
    return (
        <Container component="main" xs={12} >
    
          <div >
            <form className={classes.form} onSubmit={(event)=>handleSubmit(event,initial)}>
              <Grid container spacing={3}>
    
                <Grid item xs={12} sm={6}>
                  <input
                    accept="image/*"
                    className={classes.input}
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={handleFileselected}
                  />
                  <label htmlFor="contained-button-file">
                    <Button variant="contained" color="secondary" component="span">
                      Change Picture
                   </Button>
                  </label>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <ThemeProvider theme={theme}>
                    <Button variant="contained" color="primary" className={classes.float} type='submit' disabled={disableSubmit}>
                      submit
               </Button>
                  </ThemeProvider>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <ThemeProvider theme={theme} >
                    <TextField
                      fullWidth
                      className={classes.margin}
                      label="First Name"
                      variant="outlined"
                      name='firstName'
                      onChange={handleChangeInput}
                      value={initial.firstName}
                    />
                    <span style={{color: "red"}} className={classes.margin}>{error.firstName}</span>
                  </ThemeProvider>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <ThemeProvider theme={theme}>
                    <TextField
                      fullWidth
                      className={classes.margin}
                      label="Last Name"
                      variant="outlined"
                      name='lastName'
                      onChange={handleChangeInput}
                      value={initial.lastName}
                    />
                <span style={{color: "red"}} className={classes.margin}>{error.lastName}</span>
                  </ThemeProvider>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <ThemeProvider theme={theme}>
                    <TextField
                      fullWidth
                      className={classes.margin}
                      label="Phone"
                      variant="outlined"
                      name='phone'
                      onChange={handleChangeInput}
                      value={initial.phone}
                    />
                   <span style={{color: "red"}} className={classes.margin}>{error.phone}</span>
                  </ThemeProvider>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <ThemeProvider theme={theme}>
                    <TextField
                      fullWidth
                      className={classes.margin}
                      label="Email Address"
                      variant="outlined"
                      name='email'
                      onChange={handleChangeInput}
                      value={initial.email}
                    />
              <span style={{color: "red"}} className={classes.margin}>{error.email}</span>
                  </ThemeProvider>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <ThemeProvider theme={theme}>
                    <TextField
                      fullWidth
                      className={classes.margin}
                      label="Birth Date"
                      variant="outlined"
                      name='birthDate'
                      onChange={handleChangeInput}
                      value={initial.birthDate}
                    />
                     <span style={{color: "red"}} className={classes.margin}>{error.birthDate}</span>
                  </ThemeProvider>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl variant="outlined" className={classes.formControl} >
                    <InputLabel htmlFor="outlined-age-native-simple">Title</InputLabel>
                    <Select
                      native
                      label="Title"
                        id= 'outlined-age-native-simple'
                        name='title'
                        onChange={handleChangeInput}
                        value={initial.title}
                    >
                      <option aria-label="None" value="" />
                      <option value={'Writor'}>Writor</option>
                      <option value={'Editor'}>Editor</option>
                      <option value={'Publisher'}>Publisher</option>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid xs={12} sm={6}>
                  <FormControl className={classes.margin}>
                    <FormLabel component="legend" className={classes.margin}>Display Email</FormLabel>
                    <Switch
                      className={classes.margin}
                      checked={true}
                      color="primary"
                      value=""
                      checked={initial.isEmailVisible}
                      onChange={handleChangeSwitch}
                    />
                  </FormControl>
                </Grid>
                <Grid xs={12} sm={6}>
                  <FormControl className={classes.margin}>
                    <FormLabel component="legend" className={classes.margin}>Gender</FormLabel>
                    <RadioGroup row  defaultValue="top" fullWidth className={classes.margin}   name='gender' value={initial.gender} onChange={handleChangeInput}>
                      <FormControlLabel
                        value="Male"
                        control={<Radio color="primary" />}
                        label="Male"
                        labelPlacement="end"
                      />
                      <FormControlLabel
                        value="Femal"
                        control={<Radio color="primary" />}
                        label="Femal"
                        labelPlacement="end"
                      />
                      <FormControlLabel
                        value="Other"
                        control={<Radio color="primary" />}
                        label="Other"
                        labelPlacement="end"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={12} >
                  <ThemeProvider theme={theme}>
                    <TextField
                      className={classes.margin}
                      fullWidth
                      label="Address"
                      variant="outlined"
                      name='address'
                      value={initial.address} 
                      onChange={handleChangeInput}
                    />
                  </ThemeProvider>
                </Grid>
              </Grid>
            </form>
          </div>
    
        </Container>
      );
  }

let validate={initial:{  
  avatar: undefined,
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  birthDate: "",
  title: "",
  isEmailVisible: true,
  gender: "",
  address: "",
},
regex:{
  number:"09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}",
  email:"[^@]+@[^.]+..+",
  birthDate:"^[0-9]{4}([- /.])(((0[13578]|(10|12))\\1(0[1-9]|[1-2][0-9]|3[0-1]))|(02\\1(0[1-9]|[1-2][0-9]))|((0[469]|11)\\1(0[1-9]|[1-2][0-9]|30)))$"
}
}
const WithForm=withForm(validate)(Form)
export default WithForm;