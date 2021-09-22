const express = require('express');
require('dotenv').config()

const userRouter = require('./routers/user');

// app initialization
const app = express();

// middlewares
app.use(express.json());


// routes
app.use('/api/user', userRouter);


// server
app.listen(process.env.PORT || 3000, ()=> {
    console.log(`Port is listening ${process.env.PORT}`)
})