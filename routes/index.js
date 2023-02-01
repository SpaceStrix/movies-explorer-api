const router = require('express').Router();

// Роуты users и movies
const auth = require('../middlewares/auth');
const usersRoutes = require('./users');
const moviesRoutes = require('./movies');

router.use(auth);
router.use('/users', usersRoutes);
router.use('/movies', moviesRoutes);

module.exports = router;
