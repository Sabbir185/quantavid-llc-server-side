const express = require('express');
const router = express.Router();

const { createAudio, deleteFile, getFiles }= require('../controllers/audioController');

const { checkLogin } = require('../middlewares/checkLogin.js')
const { files } = require('../middlewares/files.js')

// routes
router.post('/', checkLogin, files, createAudio);
router.get('/', getFiles);
router.delete('/:id', checkLogin, deleteFile);

// module export
module.exports = router;