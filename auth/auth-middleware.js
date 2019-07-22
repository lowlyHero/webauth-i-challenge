const bcrypt = require('bcryptjs');

const Users = require('../users/user-model');

module.exports = auth;

function auth(req, res, next) {
    const { username, password } = req.headers;
    Users.findById({ username })
    .first()
    .then(user => {
        if(user && bcrypt.compareSync(password, user.password)) {
            next();
        } else {
            res.status(401).json({ message: 'Who are you? Are you, you? Are you sure? Try again, you.' })
        }
    })
    .catch(error => {
        res.status(500).json(error);
    });
}