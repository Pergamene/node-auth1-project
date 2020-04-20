const express = require('express');
const cors = require('cors');
const session = require('express-session');

const usersRouter = require('../users/users-router');
const registerRouter = require('../register/register-router');
const loginRouter = require('../login/login-router');
const authenticator = require('./authenticator');

const server = express();

const sessionConfig = {
  name: 'user',
  secret: process.env.SESSION_SECRET || 'keep it secret, keep it safe!',
  resave: false,
  saveUninitialized: process.env.SEND_COOKIES || true,
  cookie: {
    maxAge: 1000 * 60 * 10,
    secure: process.env.USE_SECURE_COOKIES || false,
    httpOnly: true,
  },
};

server.use(express.json());
server.use(cors());
server.use(session(sessionConfig));

server.use('/api/users', authenticator, usersRouter);
server.use('/api/register', registerRouter);
server.use('/api/login', loginRouter);

server.get('/', (req, res) => {
  res.json({ api: 'up' });
});

module.exports = server;
