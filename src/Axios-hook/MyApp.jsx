import React, { Fragment, useEffect } from 'react';
import Axios from 'axios';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { AppBar, CssBaseline, Toolbar } from '@material-ui/core';
import Users from './Users';




export default function MyApp() {
  
    return(
        <Fragment>
            <CssBaseline />
            <AppBar position='relative'>
                <Toolbar>
                    <Typography variant='h6' color='inherit' noWrap>
                        Learning React
                    </Typography>
                </Toolbar>
            </AppBar>
            <main>
                <Container maxWidth='md'>
                   <h1>Users</h1>
                   <Users/>
                </Container>
            </main>
        </Fragment>
    )
}