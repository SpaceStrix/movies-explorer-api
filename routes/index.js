const router = require('express').Router();

// Роуты users и movies
const auth = require('../middlewares/auth');
const usersRoutes = require('./users');
const moviesRoutes = require('./movies');

const { createUser, login } = require('../controllers/users');
const {
  signInValidation,
  signUpValidation,
} = require('../middlewares/validation');

router.post('/signin', signInValidation, login);
router.post('/signup', signUpValidation, createUser);

router.use(auth);
router.use('/users', usersRoutes);
router.use('/movies', moviesRoutes);

module.exports = router;
