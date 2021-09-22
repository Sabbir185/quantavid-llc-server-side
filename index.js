const express = require('express');
const mongoose = require("mongoose");
require('dotenv').config()

const userRouter = require('./routers/user');

// app initialization
const app = express();

// middlewares
app.use(express.json());

// database
mongoose
  .connect(process.env.DB_NAME, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connection successful!"))
  .catch((err) => console.log(err));

// routes
app.use('/api/user', userRouter);


// server
app.listen(process.env.PORT || 3000, ()=> {
    console.log(`Port is listening ${process.env.PORT}`)
})