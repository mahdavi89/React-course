import { Container, Grid, makeStyles } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import Users from 'pages/Users'
import DateJalali from 'pages/DateJalali'
import Entries from 'pages/Entries/Entries'
import Categories from 'pages/Category/Category'
import Axios from 'axios'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete';
import moment from "moment-jalaali";

const useStyles = makeStyles(theme => ({
  margin: {
    marginRight: '10px !important',

  },
  container: {
    marginTop: '0px !important',
  },
  btnFilter:{
    marginBottom:'5px'
  }
}))

export default function AllPages() {
  const classes = useStyles();
  const setArrayData=[];
  const [DataNotFilter,setDataNotFilter] =  useState();
  const [loadingFilter, setLoadingFilter] = useState(true);
  const [data, setData] = useState();
  const [btnDisable,setBtnDisable]=useState(true);

  const [userId, setUserId] = useState('');
  const [cateId, setCateId] = useState('');
  const [valDate, setValDate] = useState('');

  const [selectedDate, setSelectedDate] = useState(moment());

  const handleSelectDate = (date) => {
    setBtnDisable(false);
    setSelectedDate(date);
    const datePersian= date.format("jYYYY/jMM/jDD");

    setValDate(datePersian);
    filterFunc(userId,cateId,datePersian);

  };

  const handleSelectUser=(event,user)=>{
    setBtnDisable(false);
     setUserId(user.id);
    filterFunc(user.id,cateId,valDate);
  };

  const handleSelectCate=(event,cate)=>{
    setBtnDisable(false);
    setCateId(cate.id);
   filterFunc(userId,cate.id,valDate);
   
 };

  const filterFunc=(user,cate,date)=>{
    console.log('user',user);
    console.log('cate',cate);
    console.log('dateeee',date);

       
   let DataWithFilter= DataNotFilter.filter((item)=>{
    const convertDateOfItem=moment(item.date).format("jYYYY/jMM/jDD");


    return ( user ? item.userID === user : true )  &&
      (cate ? item.idCategory === cate : true) &&
      (date ?  moment(date).unix()=== moment(convertDateOfItem).unix() :true) 
     
    
     
    });
    console.log("DataWithFilter",DataWithFilter);
    setData(DataWithFilter);


}




  const handleBtnDeleteFilter=()=>{
    setBtnDisable(true);
    setData(DataNotFilter);
    setCateId('');
    setUserId('');
    setValDate('');
    setSelectedDate(moment());
  }



  
  useEffect(() => {
    setLoadingFilter(true);
    Axios.get("/api/users/")
      .then(res => {
        (res.data).forEach(entrie => {
            (entrie.entries).forEach(en=>{
              setArrayData.push({
                id: en.id,
                title: en.title,
                date: en.date,
                amount: en.amount,
                category: en.category.name,
                idCategory: en.category.id,
                userName:entrie.userName,
                userID:entrie.id
              });
            })
        });
      })
      .then(() => {
        setData(setArrayData);
        setDataNotFilter(setArrayData);
        setLoadingFilter(false);
      })

  }, []);



  return (

    <Container component="main" className={classes.container}>
      <Grid xs={12} sm={12} className={classes.btnFilter}>
        <Button
           disabled={btnDisable}
          variant="contained"
          color="secondary"
          className={classes.button}
          startIcon={<DeleteIcon />}
          onClick={handleBtnDeleteFilter}
        >
          حذف فیلترها
      </Button>
      </Grid>
      <Grid container direction='row'>
        <Grid item xs={12} sm={6} className={classes.margin}>
          <Users userId={userId} handleClick={handleSelectUser} />
        </Grid>
        <Grid item xs={12} sm={3} className={classes.margin}>
          <Categories handleClick={handleSelectCate} categoryId={cateId} />
        </Grid>
        <Grid item xs={12} sm={2}>
          <DateJalali handleDateChange={handleSelectDate} selectedDate={selectedDate}/>
        </Grid>

      </Grid>
      <Grid xs={12} sm={12}>
        <Entries loading={loadingFilter} rows={data} />
      </Grid>




    </Container>
  )
}