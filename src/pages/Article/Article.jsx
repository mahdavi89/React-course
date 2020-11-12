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
    let newUsersState = [];

    useEffect(() => {
        ArticleService.getAll().on("value", snapshot => {
            if (snapshot && snapshot.exists()) {
                snapshot.forEach(data => {
                    const dataVal = data.val()

                    newUsersState.push({
                        key: data.key,
                        title: dataVal.title,
                        body: dataVal.body,
                        lastModifiedDate: dataVal.lastModifiedDate,
                        url: dataVal.url
                    })

                })
                setArticle(newUsersState)
            }
        })

    }, [])

    let PostSelected = [];
    if (article) {
        console.log('artic', article)
        PostSelected = article.filter((val, index) => { return val.key == param.id })


    }

    let card = PostSelected[0];
    console.log('PostSelected[0]', PostSelected[0])
    console.log('card', card)
    if (card) {
        return (

            <Card className={classes.root}>
                {console.log('cardddd', card.lastModifiedDate)}
                <CardHeader

                    subheader={moment(card.lastModifiedDate).format("dddd, MMMM Do YYYY,hh:mm:ss a")}
                    titleTypographyProps={{ height: 10, overflow: "hidden" }}
                    title={
                        <Typography gutterBottom variant="subtitle1" component="subtitle1" >
                            {card.title}
                        </Typography>
                    }

                />
                <img src={card.url} className={classes.classImage} />
                <CardContent className={classes.CardContent}>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {card.body}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <Button className={classes.btn} variant="contained" component={RouterLink} to="/articles">
                        Back To List
                  </Button>
                  <Button className={classes.btn} variant="contained" component={RouterLink} to="/articles">
                        Edit
                  </Button>
                  <Button className={classes.btn} variant="contained" component={RouterLink} to="/articles">
                        delete
                  </Button>
                </CardActions>

            </Card>
        );
    }
    return (
        <></>
    )
}
