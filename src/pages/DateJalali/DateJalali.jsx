import moment from "moment-jalaali";
import jMoment from "moment-jalaali";
import React, { memo, useState } from "react";
import JalaliUtils from "@date-io/jalaali";
import { Calendar, DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { createMuiTheme, makeStyles, MuiThemeProvider, Paper } from "@material-ui/core";
import { green } from "@material-ui/core/colors";

jMoment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });

const theme = createMuiTheme({
  palette: {
    primary: { light: green[300], main: green[500], dark: green[700] },
  },
});

const useStyles = makeStyles((theme) => ({
  paper: {
    width: '100% !important',
    overflow: "hidden",
    minWidth: 283,
  },

}));

function DateJalali(props) {
  const classes=useStyles();
  const myDate=props.selectedDate;

  console.log('myDate',myDate);
  

  const handleChange = (date) => {
    props.handleDateChange(date);
  };
  return (
    <MuiThemeProvider theme={theme}>
    <MuiPickersUtilsProvider utils={JalaliUtils} locale="fa">
      <Paper className={classes.paper}>
         <Calendar
        date={myDate}
        onChange={handleChange}
      />
      </Paper>
     
    </MuiPickersUtilsProvider>
    </MuiThemeProvider>
  );
}
export default memo(DateJalali) ;
