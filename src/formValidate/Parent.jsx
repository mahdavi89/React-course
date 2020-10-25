import { Container, Grid } from '@material-ui/core'
import { values } from 'lodash';
import React, { useState } from 'react'
import { useRef } from 'react';
import Display from './Display'
import WithForm, { Form } from './Form'



export default function Parent() {
    const[data,setData]=useState();
    
    const submit=(e,v)=>{e.preventDefault();setData(v)}
    return (

        <Container component="main" xs={12}>

            <div >

                <Grid container spacing={3}>
                    <Grid item xs={12} sm={3}>
                      <Display getData={data}/>
                    </Grid>
                    <Grid item xs={12} sm={9}>
                      <WithForm  handleSubmit={submit}/>
                    </Grid>
                </Grid>
            </div>
        </Container>
    )
}