const router = ('express').Router();
const bcrypt = require('bcryptjs');
const auth = require('../auth/auth-middleware');

const Users = require('../users/user-model');

router.post('/api/register', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 14);
    user.password = hash;

    Users.add(user)
    .then(saved => res.status(201).json(saved))
    .catch(error => res.status(500).json(error));
});

router.post('/api/login', auth, (req, res) => {
    let { username, password } = req.body;

    Users.findBy({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
            req.session.user = user;
          res.status(200).json({ message: `Welcome ${user.username}!` });
        } else {
          res.status(401).json({ message: 'Invalid Username or Password. Please try again.' });
        }
      })
      .catch(error => {
        res.status(500).json(error);
      });
});

router.get('/api/users', auth, (req, res) => {
    Users.find()
    .then(users => res.json(users))
    .catch(error => res.send(error));
});

module.exports = userRouter;