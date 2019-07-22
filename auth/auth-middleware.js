const bcrypt = require('bcryptjs');

const Users = require('../users/user-model');

module.exports = auth;

function auth(req, res, next) {
    const { username, password } = req.headers;
    
}