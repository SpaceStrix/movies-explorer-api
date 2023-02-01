const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/users');

const { NODE_ENV, JWT_SECRET } = process.env;

const NotFound = require('../errors/NotFound');
const BadRequest = require('../errors/BadRequest');
const Conflict = require('../errors/Conflict');

module.exports.getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.send({ email: user.email, name: user.name }))
    .catch((err) => next(err));
};

module.exports.updateDataUser = (req, res, next) => {
  const { email, name } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { email, name },
    { new: true, runValidators: true },
  )
    .then((newInfo) => {
      if (!newInfo) {
        throw new NotFound('Пользователь с указанным id не найден');
      }
      res.status(200).send(newInfo);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Плохой запрос'));
      } else {
        next(err);
      }
    });
};

// * Создаем пользователя email, password и name
module.exports.createUser = (req, res, next) => {
  const { name, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then(() => {
      res.send({
        name,
        email,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new Conflict('Email уже используется'));
      } else if (err.name === 'ValidationError') {
        next(new BadRequest('Плохой запрос'));
      } else {
        next(err);
      }
    });
};

// * Авторизация
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => res.send({
      token: jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'fluffy-law',
        { expiresIn: '7d' },
      ),
    }))
    .catch(next);
};
