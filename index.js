const express = require('express');
const bodyparser = require('body-parser')
const morgan = require('morgan');
const userRoute = require('./routes/users');
let data = require('./user')

/* This is for "type": "module"
*import express from 'express';
*import bodyparser from 'body-parser';
*import morgan from 'morgan';
*import userRoute from './routes/users.js';
*/ 

const app = express();
const port = 5000;

app.use(bodyparser.json());
app.use(morgan('tiny'))
app.use('/users',userRoute.router);
app.use(express.urlencoded({extended:false}));

app.get('/',(req,res)=>{
    res.json(data);
})

app.all('*',(req,res)=>{
    res
    .status(404)
    .send('Can not find url: from app.all');
})
app.listen(port,()=>{
    console.log(`Server is listening to port :  ...`);
})
