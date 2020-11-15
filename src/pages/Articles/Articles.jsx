import React, { useEffect, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';
import moment from 'moment';
import { ArticleService } from 'components/Article';
import htmlToDraft from 'html-to-draftjs';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import { Link as RouterLink, Route } from "react-router-dom";
import Article from 'pages/Article'
import useService from 'providers/ServiceProvider/Service.hook';
import Loading from 'pages/Loading/Loading';
import DeleteIcon from '@material-ui/icons/Delete'
import { ArrowBack, Assignment, Create } from '@material-ui/icons';
import { yellow } from '@material-ui/core/colors';
// import { jsx, css } from '@emotion/core';




const useStyles = makeStyles(theme => ({
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  title: {
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden"
  },
  content: { flexGrow: 1 },
  description: {
    display: "-webkit-box",
    WebkitLineClamp: 10,
    WebkitBoxOrient: "vertical",
    overflow: "hidden"
  },
  cardGrid: {
    marginTop: '10px'
  },
  btnColor:{
    backgroundColor:yellow[700],
    "&:hover": {
      backgroundColor: yellow[650],
     
  }
  }
}));



export default function Articles(props) {
  const classes = useStyles();
  const { article, getAll } = useService();

  const { deleteArticle } = useService();
  //const [article, setArticle] = useState([]);
  // let newUsersState = [];

  useEffect(() => {
    getAll()
    // ArticleService.getAll().on("value", snapshot => {
    //   if (snapshot && snapshot.exists()) {
    //     snapshot.forEach(data => {
    //       const dataVal = data.val()

    //       newUsersState.push({
    //         key: data.key,
    //         title: dataVal.title,
    //         body: dataVal.body,
    //         lastModifiedDate: dataVal.lastModifiedDate,
    //         url: dataVal.url
    //       })

    //     })
    //     setArticle(newUsersState)
    //   }
    // })

  }, [])
  console.log('article', article)
  return (

    article ? (<React.Fragment>
      <Container className={classes.cardGrid} maxWidth="md">

        <Grid container spacing={4}>
          {article && (article.map((card) => (
            <Grid item key={card.key} xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <CardHeader
                  title={card.title}
                  titleTypographyProps={{ title: card.title }}
                  subheader={moment(card.lastModifiedDate).format("dddd, MMMM Do YYYY,hh:mm:ss a")}
                  classes={{ title: classes.title }}
                />
                <CardMedia
                  className={classes.media}
                  image={card.url}
                  title={card.title}
                />
                <CardContent className={classes.content}>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                    className={classes.description}
                  >

                    <div dangerouslySetInnerHTML={{ __html: card.body }}>
                    </div>
                  </Typography>
                </CardContent>
                <CardActions >

                  <Button variant="contained" color="primary" component={RouterLink} to={`/articles/${card.key}`} startIcon={<ArrowBack />}>
                    ادامه
                    </Button>

                    <Button className={classes.btnColor} variant="contained" component={RouterLink} to={`/articles/edit/${card && card.key}`} startIcon={<Create />}>
                      ویرایش
                  </Button>

                  <Button  color="secondary" variant="contained" onClick={() => deleteArticle(card)} startIcon={<DeleteIcon />}>
                    حذف
                  </Button>

                </CardActions>
              </Card>
            </Grid>
          )))}
        </Grid>
      </Container>
    </React.Fragment>) : (<Loading />)


  );

}