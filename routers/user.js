const express = require('express');
const router = express.Router();

const {createUser, getUserInfo }= require('../controllers/user');

// routes
router.post('/', createUser);
router.get('/', getUserInfo);

// module export
module.exports = router;