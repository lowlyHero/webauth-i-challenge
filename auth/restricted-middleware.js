const session = require('express-session');
const server = require('../server');

server.use(
    session({
        name: 'notsession',
        secret: 'thesecretbox',
        cookie: {
            maxAge: 1 * 24 * 60 * 60 * 1000,
            secure: true,
        },
        httpOnly: true,
        resave: false,
        saveUninitialized: false,
    })
);

