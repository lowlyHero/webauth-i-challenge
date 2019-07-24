module.exports = (req, res, next) => {
    if(req.session && req.session.username) {
        next();
    } else {
        res.status(401).json({ message: 'Who are you? Are you, you? Are you sure? Who is this \'you\'?' });
    }
};