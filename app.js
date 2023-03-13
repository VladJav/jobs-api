require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

const connectDB = require('./db/connect');
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const authenticateUser = require('./middleware/authentication');
const authRouter = require('./routes/auth');
const jobsRouter = require('./routes/jobs');

const port = process.env.PORT || 8000;

app.use(express.json());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', jobsRouter);

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

