const User = require('../models/users');

const NotFound = require('../errors/NotFound');
const BadRequest = require('../errors/BadRequest');

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
