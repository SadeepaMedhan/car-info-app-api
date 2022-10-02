const express = require('express')
const mongoose = require('mongoose')
const user = require('./routes/user')


const app = express()
const port = 4000

app.use('/user',user)

const url = 'mongodb://127.0.0.1/carinfo'

mongoose.connect(url,{useNewUrlParser: true})
const con = mongoose.connection

con.on("open",()=>{
    console.log("MongoDB connected!");
})

app.listen(port, ()=>{
    console.log(`app listening port ${port}`);
}) 