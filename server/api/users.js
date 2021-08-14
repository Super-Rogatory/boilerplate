const express = require('express');
const router = express.Router();
const User = require('../db/User');
const { validatePassword, generatePasswordHash, issuance, gatekeepingMiddleware } = require('../../utils/utilities');

// mounted on /api/users/
router.get('/', (req, res, next) => {
    res.json({ msg: 'You have made it to the user '});
})

router.get('/protected', gatekeepingMiddleware, (req, res, next) => {
    console.log(req.jwt);
    res.json({ msg: 'access granted' });
})
router.post('/login', async (req, res, next) => {
    try {
        const user = await User.findOne({ 
            where: {
                name: req.body.name
            }
        });
        if(!user) res.status(401).json({ msg: 'user is not found' }); 
        const isValid = validatePassword(req.body.password, user.hash, user.salt);
        if(isValid) {
            //issue JWT
            const { token, expiresIn } = issuance(user);
            res.json({ msg: 'user has logged in ', token, expiresIn });
        } else {
            res.status(401).json({ msg: 'password is invalid.'})
        }        
    } catch (err) {
        next(err);
    }


    
})
router.post('/register', async (req, res, next) => {
    const { salt, hash } = generatePasswordHash(req.body.password);
    try {
        const user = await User.create({ name: req.body.name, hash, salt });
        res.json({ msg: 'user has been created ', user }); 
    } catch (err) {
        next(err);
    }
})
router.use((req, res, next) => {
    const error = new Error('file not found');
    error.status = 404;
    next(error);
})
module.exports = router;