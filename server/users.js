const express = require('express');
const router = express.Router();

// mounted on /api/users/
router.get('/', (req, res, next) => {
    res.json({ msg: 'You have made it to the user '});
})


router.use((req, res, next) => {
    const error = new Error('file not found');
    error.status = 404;
    next(error);
})
module.exports = router;