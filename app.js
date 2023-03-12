require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();
const connectDB = require('./db/connect')
const port = process.env.PORT || 8000;

app.use(express.json());

const start = async () => {
   try{
      await connectDB(process.env.MONGO_URI);
      app.listen(port, ()=>{
         console.log(`Server is listening on port ${port}`)
      });
   }
   catch (e){
      console.log(e);
   }
};

start();

