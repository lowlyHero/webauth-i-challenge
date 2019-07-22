const server = require('./server.js');
const bcrypt = require('bcryptjs');
const Users = require('./users/user-model');

const PORT = process.env.PORT || 5000;

server.post('/api/register', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 14);
    user.password = hash;

    Users.add(user)
    .then(saved => res.status(201).json(saved))
    .catch(error => res.status(500).json(error));
});

server.post('/api/login', (req, res) => {
    let { username, password } = req.body;

    Users.findBy({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          res.status(200).json({ message: `Welcome ${user.username}!` });
        } else {
          res.status(401).json({ message: 'Invalid Username or Password. Please try again.' });
        }
      })
      .catch(error => {
        res.status(500).json(error);
      });
});

server.get('/api/users', (req, res) => {
    Users.find()
    .then(users => res.json(users))
    .catch(error => res.send(error));
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});