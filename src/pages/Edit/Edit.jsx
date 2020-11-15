import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { ArticleService } from "components/Article";
import { Controller, useForm } from "react-hook-form";
import Fab from "@material-ui/core/Fab";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import { Hidden, makeStyles } from "@material-ui/core";
import { blue } from "@material-ui/core/colors";
import TextEditor from "components/TextEditor/TextEditor";
import moment from 'moment';
import { Redirect, useParams } from "react-router-dom";
import Loading from "pages/Loading/Loading";
import useService from "providers/ServiceProvider/Service.hook";
import { ArrowBack, Create } from "@material-ui/icons";
import { Link as RouterLink, Route } from "react-router-dom";
import * as firebase from "services";

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
        height:'200px'
    }
}));

export default function Edit() {
    const { register, errors, reset, handleSubmit, control,setValue,getValues } = useForm();
    const classes = useStyles();
    const param = useParams();
    const [fileVal, setFileVal] = useState([]);
    const[file,setFile]=useState();
    const[flag,setFlag]=useState(true)
   
    const{update,getImage,getChild,post,loading}=useService();
const key=param.id;





    useEffect(() => {
  
        getChild(param.id)

    }, [])

    let card = post[0];
    
    const handleChangeImg=e=>{
       setFlag(false)
      //  card.url ='';
        setFile(URL.createObjectURL(e.target.files[0]))
    }
    const onSubmit = article => {
        console.log('post0',post[0])
        console.log('articleعحیشفث',article)
        update(article,post[0])
    };

   // if(card){setLoading(false)}
    return (card ?(
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2} style={{ marginTop: 16 }}>
                <Grid item xs={12}>
                    <TextField
                        name="title"
                        label="Title"
                        defaultValue={card&&card.title?card.title:''}
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
                        defaultValue={card.body}
                        error={!!errors.body}
                        helperText={!!errors.body && errors.body.message}
                        rules={{ required: true }}
                    />
                            
                </Grid>


                <Grid item xs={12} >
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
                      <img src={flag?card.url:file} className={classes.classImage} />
                    </Grid>

                </Grid>
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        style={{ marginRight: 8 }}
                        startIcon={<Create />}
                    >
                        ویرایش
                    </Button>
                    <Button variant="contained" component={RouterLink} to="/articles" color="secondary" startIcon={<ArrowBack />} >
                    نمایش لیست
                    </Button>
                </Grid>
            </Grid>
        </form>): (<Loading />)
    );
}
