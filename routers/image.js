const express = require('express');
const router = express.Router();

const { createImg }= require('../controllers/imageController');

const { checkLogin } = require('../middlewares/checkLogin.js')
const { files } = require('../middlewares/files.js')

// routes
router.post('/', checkLogin, files, createImg);


// module export
module.exports = router;