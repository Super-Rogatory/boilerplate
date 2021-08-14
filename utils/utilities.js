const bcrypt = require('bcrypt');
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const PUB_KEY = fs.readFileSync(path.resolve(__dirname, '../keys/id_rsa_pub.pem'), 'utf-8');
const PRIV_KEY = fs.readFileSync(path.resolve(__dirname, '../keys/id_rsa_priv.pem'), 'utf-8');


const generatePasswordHash = (password) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return {
        salt,
        hash
    }
}
const validatePassword = (password, hash, salt) => {
    const newHashedPassword = bcrypt.hashSync(password, salt);
    return newHashedPassword === hash;
}

const issuance = (user) => {
    const expiresIn = '1d';
    
    const payload = {
        sub: user.id,
        iat: Date.now()
    }
    const signedToken = jwt.sign(payload, PRIV_KEY, {
        expiresIn,
        algorithm: "RS256"
    });

    return {
        token: `Bearer ${signedToken}`,
        expiresIn
    }
}

function gatekeepingMiddleware(req, res, next) {
    const [bearer, token] = req.headers.authorization ? req.headers.authorization.split(' ') : ['no bearer'];
    if(bearer === 'Bearer' && token.match(/\S+\.\S+\.\S+/) !== null) {
        try {
            const verification = jwt.verify(token, PUB_KEY, {
                algorithms: ['RS256']
            });
            req.jwt = verification;
            next();
        } catch (err) {
            res.status(401).json({ msg: 'you are not authorized to visit this route' });
        }        
    } else {
        res.status(401).json({ msg: 'invalid token'});
    }

}
module.exports = { generatePasswordHash, validatePassword, issuance, gatekeepingMiddleware };