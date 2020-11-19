import React, { useEffect, useState } from 'react';
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
import { red, grey } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import { useParams } from 'react-router-dom';
import { ArticleService } from 'components/Article';
import { Link as RouterLink, Route } from "react-router-dom";
import useService from 'providers/ServiceProvider/Service.hook';
import { ArrowBack } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
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
        backgroundColor: grey[500],
    },
    classImage: {
        height: 150,
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: 200,
    },
    btn: {
        margin: theme.spacing(2),
      },
}));


export default function Article(props) {
    const classes = useStyles();
    const param = useParams();
    const [article, setArticle] = useState([]);
    let post = [];

    useEffect(() => {
        post.splice(0, post.length)
          ArticleService.getAll().child(param.id).on("value",snapshot=>{
       
             const dataVal=snapshot.val()
             post.push({
                                    key: snapshot.key,
                                    title: dataVal.title,
                                    body: dataVal.body,
                                    lastModifiedDate: dataVal.lastModifiedDate,
                                    url: dataVal.url
                                })
              setArticle(post)
          })


     }, [])
 

    let card = article[0];
    console.log('card',article)
    console.log('card',card)
        return (

            <Card className={classes.root}>
                <CardHeader

                    subheader={moment(card&&card.lastModifiedDate).format("dddd, MMMM Do YYYY,hh:mm:ss a")}
                    titleTypographyProps={{ height: 10, overflow: "hidden" }}
                    title={
                        <Typography gutterBottom variant="subtitle1" component="subtitle1" >
                            {card&&card.title}
                        </Typography>
                    }

                />
                <img src={card&&card.url} className={classes.classImage} />
                <CardContent className={classes.CardContent}>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {card&&<div dangerouslySetInnerHTML={{ __html: card.body }}></div>}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  
                  <Button variant="contained" color="primary" component={RouterLink} to="/articles" startIcon={<ArrowBack />}>
                    بازگشت به لیست
                    </Button>
                </CardActions>

            </Card>
        );
  //  }
   
}
