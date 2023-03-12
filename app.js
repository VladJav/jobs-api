require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

const connectDB = require('./db/connect');
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

const port = process.env.PORT || 8000;

app.use(express.json());

app.get('/', (req,res)=>{
   throw new Error('EEAsd');
})

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
   try{
      await connectDB(process.env.MONGO_URI);
      app.listen(port, ()=>{
         console.log(`Server is listening on port ${port}`);
      });
   }
   catch (e){
      console.log(e);
   }
};

start();

