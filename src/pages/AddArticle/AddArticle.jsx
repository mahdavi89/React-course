import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { ArticleService } from "components/Article";
import { Controller, useForm } from "react-hook-form";
import Fab from "@material-ui/core/Fab";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import { Hidden, makeStyles } from "@material-ui/core";
import { blue, yellow } from "@material-ui/core/colors";
import TextEditor from "components/TextEditor/TextEditor";
import moment from 'moment';
import { Redirect } from "react-router-dom";
import useService from "providers/ServiceProvider/Service.hook";
import Loading from "pages/Loading/Loading";
import SetInfoLoading from "pages/Loading/sendInfoLoading";
import { ArrowBack, RotateLeft, Save } from "@material-ui/icons";
import { Link as RouterLink, Route } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  button: {
    color: blue[900],
    margin: 10
  },
  input: {
    display: "none"
  },
  classImage:{
    width:'200px',
    height:'200px',
    border:'0'
},
container:{
  display:'flex',
  flexDirection: 'row'
},
form:{
  position:"relative"
},
btnColor:{
  backgroundColor:yellow[700],
  marginRight: 8
}
}));

export default function AddArticle() {
  const { register, errors, reset, handleSubmit, control } = useForm();
  const classes = useStyles();
  const[file,setFile]=useState();
  const {create,loading}=useService();

  const handleChangeImg=e=>{
    setFile(URL.createObjectURL(e.target.files[0]))
}
  const onSubmit = article => {
    console.log('imageart',article.image)
    console.log('articleCreate',article)
    console.log('artimg',article.image[0])
    create(article);
    console.log('afterCreateloading',loading)
 
  };
 
console.log('file',file)
  return (
       
      <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
          { loading&& <SetInfoLoading/>}
      <Grid container spacing={2} style={{ marginTop: 16 }}>
        <Grid item xs={12}>
          <TextField
            name="title"
            label="Title"
            defaultValue=""
            variant="outlined"
            fullWidth
            inputRef={register({
              required: "Title is required",
              maxLength: {
                value: 250,
                message: "Title must be less than 250 characters"
              }
            })}
            error={!!errors.title}
            helperText={!!errors.title && errors.title.message}
          />
        </Grid>

        <Grid item xs={12}>
        <Controller
          as={<TextEditor />}
          name="body"
          control={control}
          defaultValue=''
          error={!!errors.body}
          helperText={!!errors.body && errors.body.message}
        />
        </Grid>

        <Grid item xs={12} className={classes.container}>
                    <Grid item xs={6}>
                        <input
                            accept="image/*"
                            className={classes.input}
                            id="contained-button-file"
                            type="file"
                            name='image'
                            ref={register({ required: 'image is required' })}
                            onChange={handleChangeImg}
                        />
                        <label htmlFor="contained-button-file">
                            <Fab component="span" className={classes.button}>
                                <AddPhotoAlternateIcon />
                            </Fab>
                        </label>
                    </Grid>
                    <Grid item xs={6}>
                      <img src={file} className={classes.classImage} />
                    </Grid>

                </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            style={{ marginRight: 8 }}
            startIcon={<Save/>}
          >
            ذخیره
          </Button>
          <Button variant="contained" type="reset" onClick={reset} className={classes.btnColor} startIcon={<RotateLeft/>}>
            ریست
          </Button>
          <Button variant="contained" color="secondary" component={RouterLink} to="/articles" startIcon={<ArrowBack />} >
                    انصراف
                    </Button>
        </Grid>
      </Grid>
     
     {/* { loading&& <Loading/>} */}
    </form>
 
  
  );
}
