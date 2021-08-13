const path = require('path');
require('dotenv').config(path.resolve(__dirname, '../../.env'));

const Sequelize = require('sequelize');
const db = new Sequelize(process.env.DATABASE_URL, {
    logging: false
});

db.authenticate()
.then(() => console.log('connected to database'))
.catch(() => console.log('failure to connect to database'));

module.exports = db;
