const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');

// logger middleware
app.use(morgan('dev'));
// serving up static files, static middleware
app.use(express.static(path.join(__dirname, '/public')));
// body parsing middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// mounting on /api
app.use('/api', require('./server/api/index'));

// our server should send its index.html for any requests that don't match one of our API routes.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
})

app.use((err, req, res, next) => {
    res.status(err.status || 500).send(err.message || 'Internal server error');
})

module.exports = app;

