// Модель
const Movie = require('../models/movies');

// Ошибки
const NotFound = require('../errors/NotFound');
const Forbidden = require('../errors/Forbidden');
const BadRequest = require('../errors/BadRequest');

// Возвращает все сохранённые текущим пользователем фильмы
module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movie) => res.send(movie))
    .catch((err) => next(err));
};
// Создает фильм
module.exports.createMovie = (req, res, next) => {
  const owner = req.user._id;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Плохой запрос'));
      } else {
        next(err);
      }
    });
};

// Удаляет сохранённый фильм по id
module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) throw new NotFound('Фильм с указанным id не найдена');

      if (!movie.owner.equals(req.user._id)) {
        throw new Forbidden('У вас нет прав');
      } else {
        Movie.deleteOne(movie)
          .then(() => {
            res.status(200).send(movie);
          })
          .catch((err) => {
            next(err);
          });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Плохой запрос'));
      } else {
        next(err);
      }
    });
};
