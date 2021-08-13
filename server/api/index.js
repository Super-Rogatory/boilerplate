const express = require('express');
const router = express.Router();

// mounting on /api/users
router.use('/users', require('./users'));

module.exports = router;
