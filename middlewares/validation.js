const { celebrate, Joi } = require('celebrate');
const { ObjectId } = require('mongoose').Types;

const { isURL } = require('validator');

module.exports.signInValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});
// Валидация регистрации
module.exports.signUpValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});
// Валидация обновления данных пользователя
module.exports.updateDataUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required(),
  }),
});

// Валидация создания фильма
module.exports.createMovieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (isURL(value)) return value;
        return helpers.message('Невалидный url');
      }),
    trailerLink: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (isURL(value)) return value;
        return helpers.message('Невалидный url');
      }),
    thumbnail: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (isURL(value)) return value;
        return helpers.message('Невалидный url');
      }),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});
// Валидация удаления фильма
module.exports.deleteMovieValidation = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().custom((value, helpers) => {
      if (ObjectId.isValid(value)) return value;
      return helpers.message('Невалидный id');
    }),
  }),
});
