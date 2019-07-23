const express = require('express');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);

module.exports = server => {
    const configSession = {
        name: 'notsession',
        secret: 'thesecretbox',
        cookie: {
            maxAge: 1 * 24 * 60 * 60 * 1000,
            secure: true,
            httpOnly: true,
        },
        resave: false,
        saveUninitialized: false,
        store: new KnexSessionStore({
            knex: require('../../database/dbConfig'),
            tablename: 'sessions',
            createTable: true,
            sidfieldname: 'sid',
            clearInterval: 100 * 60 * 60,
        }),
    };  


    server.use(express.json());
    server.use(session(configSession));
};
