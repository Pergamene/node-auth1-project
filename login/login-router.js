const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('../users/users-model');

router.post('/', async (req, res) => {
  let { username, password } = req.body;

  try {
    const user = await Users.findBy({ username });
    if (user && bcrypt.compareSync(password, user.password)) {
      req.session.loggedIn = true;
      console.log('req.session', req.session);
      res.status(200).json({ message: 'Logged in' });
    } else {
      res.status(401).json({ message: 'You shall not pass!' });
    }
  }
  catch(error) {
    console.log(error);
    res.status(500).json({ errorMessage: error.message });
  }
});

module.exports = router;
