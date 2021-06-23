const express = require('express');
const cors = require('cors');
const mongoese = require('mongoose')

require('dotenv').config();

const materialRoute = require('./routes/material');


const app = express();
const port = 2000;
const uri = process.env.ATLAS_URI;

mongoese.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoese.connection;
connection.once('open', ()=>{
    console.log("MongoDB connected Successfully");
});

app.use(cors());
app.use(express.json());

app.use('/material', materialRoute);


app.listen(port, ()=>{
    console.log(`Server running on port: ${port}`);
});