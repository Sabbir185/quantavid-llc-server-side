const express = require('express');
const router = express.Router();

const { createAudio }= require('../controllers/audioController');

const { checkLogin } = require('../middlewares/checkLogin.js')
const { files } = require('../middlewares/files.js')

// routes
router.post('/', checkLogin, files, createAudio);


// module export
module.exports = router;