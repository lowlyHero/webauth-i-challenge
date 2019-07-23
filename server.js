const express = require('express');

const userRouter = require('./users/userRouter');

const server = express();

server.use('/api/users', userRouter);

server.get('/', (req, res) => {
    res.send('<h1>Im not insane</h1>');
});

module.exports = server;