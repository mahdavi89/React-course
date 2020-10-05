import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import moment from 'moment';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 800,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  classImage:{
    height:150,
    
}
}));
let post={
  "id": 1,
    "title": "Magna velit culpa tempor commodo sit elit esse consectetur elit incididunt cupidatat laborum officia proident. 1",
    "author": "qui est sint",
    "category": "Javascript",
    "created": "2020-10-02T01:09:28.827Z",
    "description": "Nisi anim magna elit nisi commodo irure officia ea consectetur veniam tempor aute. Adipisicing deserunt sint occaecat dolor. Cupidatat tempor dolor in consectetur consequat aliqua dolore. Non sint veniam in laborum voluptate voluptate elit laborum et cupidatat. Do eiusmod ex laborum esse mollit nisi ipsum.",
    "body": "Non sunt nostrud fugiat labore ut officia elit. Elit aliqua duis enim est laborum nisi dolor consequat incididunt. Sunt ad ipsum dolore culpa dolore eiusmod adipisicing labore.",
    "cover": "1.png"
}
export default function RecipeReviewCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  let post=props.cards;
  console.log("props",props)
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {post && post.author && post.author.substr(0,1)}
              {/* {post.author.substr(0,1)} */}
            </Avatar>
          }
         
          subheader={moment(post.created).format("dddd, MMMM Do YYYY")}
          titleTypographyProps={{ height:10, overflow: "hidden"}}
          title={
            <Typography  gutterBottom variant="subtitle1" component="subtitle1" >
              {post.title}
            </Typography>
          }
    
      />
      <img src={`./images/${post.cover}`} className={classes.classImage}/>
      <CardContent className={classes.CardContent}>
                    <Typography variant="body2" color="textSecondary" component="p">
                      {post.description}
                    </Typography>
                  </CardContent>
      <CardActions disableSpacing>
               <Button size="small" color="primary" onClick={props.onBack} >
                                  Back To List
                                </Button>
      </CardActions>
 
    </Card>
  );
}
