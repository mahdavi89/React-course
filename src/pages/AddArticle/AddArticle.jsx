import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "components/Button";
import { ArticleService } from "components/Article";
import { Controller, useForm } from "react-hook-form";
import Fab from "@material-ui/core/Fab";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import { Hidden, makeStyles } from "@material-ui/core";
import { blue } from "@material-ui/core/colors";
import TextEditor from "components/TextEditor/TextEditor";
import moment from 'moment';
import { Redirect } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  button: {
    color: blue[900],
    margin: 10
  },
  input: {
    display: "none"
  },
}));

export default function AddArticle() {
  const { register, errors, reset, handleSubmit, control } = useForm();
  const classes = useStyles();


  const onSubmit = article => {
    ArticleService.create(article)
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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

     
        <Grid item xs={12} >
          <input
            accept="image/*"
            className={classes.input}
            id="contained-button-file"
            type="file"
            name='image'
            ref={register({ required: 'image is required' })}
          />
          <label htmlFor="contained-button-file">
            <Fab component="span" className={classes.button}>
              <AddPhotoAlternateIcon />
            </Fab>
          </label>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            style={{ marginRight: 8 }}
          >
            Submit
          </Button>
          <Button variant="contained" type="reset" onClick={reset}>
            Reset
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
