const express = require('express');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send('<h1>Im not insane</h1>');
});

module.exports = server;