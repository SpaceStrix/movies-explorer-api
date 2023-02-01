const express = require('express');

const router = express.Router();

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

const {
  createMovieValidation,
  deleteMovieValidation,
} = require('../middlewares/validation');

router.get('/', getMovies);
router.post('/', createMovieValidation, createMovie);
router.delete('/:movieId', deleteMovieValidation, deleteMovie);

module.exports = router;
