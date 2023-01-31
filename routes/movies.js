const express = require('express');

const router = express.Router();

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

//* # возвращает все сохранённые текущим  пользователем фильмы
router.get('/', getMovies);

//* # создаёт фильм с переданными в теле
router.post('/', createMovie);

//* # удаляет сохранённый фильм по id
router.delete('/:movieId', deleteMovie);

module.exports = router;
