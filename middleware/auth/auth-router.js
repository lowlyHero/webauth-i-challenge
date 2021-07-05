const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('../../users/user-model');

router.post('/register', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 14);
    user.password = hash;

    Users.add(user)
    .then(saved => res.status(201).json(saved))
    .catch(e => res.status(500).json(e));
});

router.post('/login', (req, res) => {
    let { username, password } = req.body;

    Users.findBy({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
            req.session.username = user.username;
          res.status(200).json({ message: `Welcome ${user.username}!` });
        } else {
          res.status(401).json({ message: 'Invalid Username or Password. Please try again.' });
        }
      })
      .catch(e => res.status(500).json(e));
});

router.get('/logout', (req, res) => {
    if (req.session) {
      req.session.destroy(e => {
        if (e) {
          res.status(500).json({
            message:
              'You thought it was going to be easy, huh? NOPE! Try again, friend.',
          });
        } else {
          res.status(200).json({ message: 'Fine! Goodbye!' });
        }
      });
    } else {
      res.status(200).json({ message: 'You want to leave? Fine! Goodbye!' });
    }
  });

module.exports = router;