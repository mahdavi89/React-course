import React from 'react';
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
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import * as data from '../data.json';
import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';
import moment from 'moment';



const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    height: 0,
    paddingTop: '56.25%', // 16:9,
    marginTop:'30'
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  classImage:{
     
      height:150,
  }
}));

export default function Album(props) {
  const classes = useStyles();
  let posts=[];
  posts=props.cards;
  console.log("propsA",props)
  return (
           <React.Fragment>
             {console.log(posts)}
            {posts.map((card,index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                <CardHeader className={classes.cardHeader}
                    avatar={
                      <Avatar aria-label="recipe" className={classes.avatar}>
                        {card.author.substr(0,1)}
                      </Avatar>
                    }
                   
                    subheader={moment(card.created).format("dddd, MMMM Do YYYY")}
                    titleTypographyProps={{ height:10, overflow: "hidden"}}
                    title={
                      <Typography  gutterBottom variant="subtitle1" component="subtitle1" >
                        {card.title}
                      </Typography>
                    }
                    
                  />
                 <img src={`./images/${card.cover}`} className={classes.classImage}/>
                  <CardContent className={classes.CardContent}>
                    <Typography variant="body2" color="textSecondary" component="p">
                      {card.description}
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing className={classes.CardActions}>
                  <Button size="small" color="primary" onClick={props.onSelectPost(card.id)} >
                                  Read More
                                </Button>
                   
                  </CardActions>
                </Card>
              </Grid>
            ))}
             </React.Fragment>
  );
 
}