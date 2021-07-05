const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    if(req.session && req.session.username) {
        next();
    } else {
        res.status(401).json({ message: 'Who are you? Are you, you? Are you sure? Who is this \'you\' you speak of? But seriously, whoever you are, you messed up. You didn\'t login. Please go back and login so that you can access all of the amazing things you\'ll have unrestricted access to. See you soon.' });
    }
};