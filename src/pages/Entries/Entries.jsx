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
import moment from "moment-jalaali";


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    width:'100%'
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
  container: {
    maxHeight: 440,
  },
  cell:{
    maxWidth:'4px !important',
    padding:'3px !important'
  }  ,
  cellOther:{
    maxWidth:'8px !important',
    padding:'3px !important'
  } ,
 
}));

 function Entries(props) {

  const classes = useStyles();

    

  const loading=props.loading;
  const rows=props.rows;


  


  const handleClick = (event, id) => {
       console.log('e',event);
       console.log('nametb',id);
      

  };



  return (
    (!loading) ?
    (  <Grid container xs={12} sm={12}>
        <Paper className={classes.paper}>
        <Toolbar className={classes.toolbar} >
          <Typography
          variant="h6"
          color="inherit"
          noWrap
          className={classes.toolbarTitle}
        >
         هزینه ها
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
                        <TableCell  className={classes.cell}>شناسه</TableCell>
                      <TableCell  className={classes.cellOther}>عنوان</TableCell>
                       <TableCell  className={classes.cell}>تاریخ</TableCell>
                         <TableCell  className={classes.cell}>مقدار</TableCell>
                         <TableCell  className={classes.cellOther}>دسته</TableCell>
                         <TableCell align='right' className={classes.cell}></TableCell>
                       </TableRow>
                     </TableHead>
              <TableBody>
                {rows
                  .map((row, index) => {
                  
  
                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row.id)}
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                        className={classes.row}
                      >
                       
                            <TableCell  className={classes.cell}>{row.id}</TableCell>
                             <TableCell className={classes.cellOther}>{row.title}</TableCell>
                              <TableCell  className={classes.cell}>{moment(row.date).format('jYYYY/jM/jD')}</TableCell>
                              <TableCell  className={classes.cell}>{row.amount}</TableCell>
                              <TableCell  className={classes.cellOther}>{row.category}</TableCell>
                              <TableCell align='right'  className={classes.cell}> <IconButton><DeleteForeverIcon color='secondary'/></IconButton></TableCell>
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

export default memo(Entries)

