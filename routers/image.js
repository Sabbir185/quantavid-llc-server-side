const express = require('express');
const router = express.Router();

const { createImg, deleteFile, getFiles }= require('../controllers/imageController');

const { checkLogin } = require('../middlewares/checkLogin.js')
const { files } = require('../middlewares/files.js')

// routes
router.post('/', checkLogin, files, createImg);
router.get('/', getFiles);
router.delete('/:id', checkLogin, deleteFile);

// module export
module.exports = router;