const express = require('express');
const router = express.Router();

const { createVideo }= require('../controllers/videoController');

const { checkLogin } = require('../middlewares/checkLogin.js')
const { files } = require('../middlewares/files.js')

// routes
router.post('/', checkLogin, files, createVideo);


// module export
module.exports = router;