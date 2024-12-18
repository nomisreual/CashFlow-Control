import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRouter from './routers/users.router.js';
import budgetRouter from './routers/budget.router.js';
import { connectToDB } from './utils/database.js';
import { createError } from './utils/helper.js';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';


dotenv.config();
const app=express();

//database connection
connectToDB();


//middlewares
app.use(cookieParser())

app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000', 
}));


app.use(morgan('dev'));

app.use(express.json())
app.use(express.urlencoded({ extended: true}));

//routers
app.use('/users', userRouter);
app.use('/budget', budgetRouter);

//error handlers
app.use((req, res, next) => {
    next(createError("Route not found!", 404));
  });
  
app.use((err, req, res, next) => {

    if (err) {
      res.status(err.status || 500).json({ msg: err.message });
    }
  });


//server
const port = process.env.PORT || 4000;
app.listen(port, console.log(`server is up on port: ${port} 🚀`));