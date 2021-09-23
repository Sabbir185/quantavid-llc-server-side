const express = require('express');
const router = express.Router();

const { createVideo, deleteFile, getFiles }= require('../controllers/videoController');

const { checkLogin } = require('../middlewares/checkLogin.js')
const { files } = require('../middlewares/files.js')

// routes
router.post('/', checkLogin, files, createVideo);
router.get('/', getFiles);
router.delete('/:id', checkLogin, deleteFile);


// module export
module.exports = router;