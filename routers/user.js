const express = require('express');
const router = express.Router();

const {createUser, userLogin, getUserInfo, updateProfile }= require('../controllers/user');

const { checkLogin } = require('../middlewares/checkLogin.js')
const { files } = require('../middlewares/files.js')


// routes
router.post('/', createUser);
router.post('/login', userLogin);

router.patch('/update/:id',checkLogin, files, updateProfile);

router.get('/:id', getUserInfo);

// module export
module.exports = router;