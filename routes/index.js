const router = require('express').Router();

// Роуты users и movies
const usersRoutes = require('./users');
const moviesRoutes = require('./movies');

router.use('/users', usersRoutes);
router.use('/movies', moviesRoutes);

module.exports = router;
