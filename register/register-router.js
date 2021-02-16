const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('../users/users-model');

router.post('/', async (req, res) => {
  let user = req.body;

  const rounds = process.env.HASH_ROUNDS || 12;

  const hash = bcrypt.hashSync(user.password, rounds);

  user.password = hash;

  try {
    const saved = await Users.add(user)
    res.status(201).json(saved);
  }
  catch(error) {
    console.log(error);
    res.status(500).json({ errorMessage: error.message });
  }
});

module.exports = router;
