
const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require('mongoose');
const StudentRouter = require('./routes/student_router')
const ClassRouter = require('./routes/class_router')
const ParentRouter = require('./routes/parent_router')
const dbURL='mongodb+srv://udhayasilambam96:1P25EIisSzr9lDUI@cluster0.ezvppjl.mongodb.net/erp_management?retryWrites=true&w=majority';

const connectionParams = {
  useNewUrlParser:true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1
}

const app= express();
app.use(express.json())

mongoose.connect(dbURL, connectionParams).then(()=>{
  console.info("Database connected");
})
.catch((error)=>{
  console.info("Database not connected",error);
})

app.use('/student',StudentRouter);
app.use('/class',ClassRouter);
app.use('/parent',ParentRouter);

app.listen(9000,()=>{
  console.log("server startted");
})