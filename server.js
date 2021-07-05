const express = require('express');

const authRouter = require('./middleware/auth/auth-router');
const userRouter = require('./users/userRouter');
const setupGlobalMiddleware = require('./middleware/setup-middleware');

const server = express();

setupGlobalMiddleware(server);

server.use('/api/auth', authRouter);
server.use('/api/users', userRouter);

server.get('/', (req, res) => {
    res.json({ api: 'up' });
});

module.exports = server;