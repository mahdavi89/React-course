import React, { memo, useEffect, useState } from 'react';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import AddIcon from '@material-ui/icons/Add';
import Axios from 'axios';
import Loading from 'component/Loading/Loading';
import { Grid, IconButton, Radio, TableHead, Toolbar, Typography } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  toolbar: {
    flexWrap: "wrap",
    width:'96%',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  cell:{
    maxWidth:'5px !important',
    padding:'1px !important'
  },
  container: {
    maxHeight: 240,
  },
}));

 function Users(props) {
            let jsonData = [];
    const [loading, setLoading] = useState(true);
    const [rows,setRows]=useState();

  const classes = useStyles();


      useEffect(() => {
        setLoading(true);
        Axios.get("/api/users/")
            .then(res => {
                (res.data).forEach(user => {
                    jsonData.push({
                        id: user.id,
                        name: user.name,
                        userName: user.userName
                    });
                });
            })
            .then(() => {
                setRows(jsonData);
                setLoading(false);
            })
           
    }, [])

  
    const ids=props.userId




  return (
    (!loading) ?
    (  <Grid container>
        <Paper className={classes.paper}>
        <Toolbar className={classes.toolbar} >
          <Typography
          variant="h6"
          color="inherit"
          noWrap
          className={classes.toolbarTitle}
        >
         کاربران
        </Typography>
        <IconButton>
            <AddIcon/>
        </IconButton>
          </Toolbar>
          <TableContainer className={classes.container}>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              aria-label="enhanced table"
            >
             <TableHead>
                     <TableRow >
                       <TableCell className={classes.cell}></TableCell>
                        <TableCell  className={classes.cell}>شناسه</TableCell>
                      <TableCell  className={classes.cell}>نام</TableCell>
                       <TableCell  className={classes.cell}>نام کاربری</TableCell>
                         <TableCell align="right"  className={classes.cell}></TableCell>
                       </TableRow>
                     </TableHead>
              <TableBody>
                {rows
                  .map((row, index) => {
                  
  
                    return (
                      <TableRow
                        hover
                        onClick={(event) => props.handleClick(event, row)}
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                        selected={row.id===ids}
                      >
                         <TableCell component="th" scope="row" className={classes.cell}>
                                <Radio checked={row.id===ids}/>
                             </TableCell>
                            <TableCell  className={classes.cell}>{row.id}</TableCell>
                             <TableCell className={classes.cell}>{row.name}</TableCell>
                              <TableCell  className={classes.cell}>{row.userName}</TableCell>
                              <TableCell align="right" className={classes.cell}> <IconButton><DeleteForeverIcon color='secondary'/></IconButton></TableCell>
                      </TableRow>
                    );
                  })}
               
              </TableBody>
            </Table>
          </TableContainer>
      
        </Paper>
      
      </Grid>)
    :
    (<Loading/>)
    
  );
}

export default memo(Users);




























