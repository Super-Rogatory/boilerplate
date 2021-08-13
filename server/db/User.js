const Sequelize = require('sequelize');
const db = require('./db');
const User = db.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true
        }
    },
    hash: {
        type: Sequelize.STRING
    },
    salt: {
        type: Sequelize.STRING
    }
})
module.exports = User;