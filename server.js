const express = require('express');

const userRouter = require('./users/userRouter');
const setupGlobalMiddleware = require('./middleware/setup-middleware');

const server = express();

setupGlobalMiddleware(server);

server.use('/users', userRouter);

server.get('/', (req, res) => {
    res.send('<h1>Im not insane</h1>');
});

module.exports = server;