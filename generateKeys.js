const crypto = require('crypto');
const path = require('path');
const fs = require('fs');

const generateKeyPair = () => {
    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: 4096,
        publicKeyEncoding: {
            type: 'spki',
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs1',
            format: 'pem'
        }
    });
    fs.writeFileSync(path.join(__dirname, '/keys/id_rsa_pub.pem'), publicKey);
    fs.writeFileSync(path.join(__dirname, '/keys/id_rsa_priv.pem'), privateKey);
}
generateKeyPair();