const router = require('express').Router();
const auth = require('../middleware/setup-middleware');

// const router = require('express').Router();

const Users = require('./user-model');
const restrict = require('../middleware/auth/restrict-middleware');

router.get('/', restrict, (req, res) => {
  Users.find()
  .then(users => {
    res.json(users);
  })
  .catch(e => res.send(e));
});

module.exports = router;