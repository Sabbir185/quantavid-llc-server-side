const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors');
const path = require('path')
require('dotenv').config()

const userRouter = require('./routers/user');
const imgRouter = require('./routers/image');
const audioRouter = require('./routers/audio');
const videoRouter = require('./routers/video');

// app initialization
const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// static image file handle
app.use('/public/', express.static(path.join(__dirname, 'public')));

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
app.use('/api/imgUpload', imgRouter);
app.use('/api/audioUpload', audioRouter);
app.use('/api/videoUpload', videoRouter);


// server
app.listen(process.env.PORT || 3000, ()=> {
    console.log(`Port is listening ${process.env.PORT}`)
})