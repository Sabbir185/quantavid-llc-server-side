const express = require('express');
const router = express.Router();

const { getUserInfo }= require('../controllers/user');

// routes
router.get('/', getUserInfo);

// module export
module.exports = router;