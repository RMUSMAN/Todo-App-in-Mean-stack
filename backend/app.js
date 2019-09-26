const express = require('express');
const app = express();
const mongoose = require('mongoose');
const todoRouter = require('./routes/todoRoutes');
const listRouter = require('./routes/listRoutes');
const cors= require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
app.use(cors());
app.use(bodyParser.json());

app.use('/list', listRouter);
app.use('/todo', todoRouter);
    

mongoose.connect(process.env.DB_CONNECTION,{useUnifiedTopology: true, useNewUrlParser:true},()=>console.log('database connected'));

app.listen(3000);