const express = require('express');
const router = express.Router();

const {createUser, userLogin, getUserInfo }= require('../controllers/user');

// routes
router.post('/', createUser);
router.post('/login', userLogin);

router.get('/', getUserInfo);

// module export
module.exports = router;