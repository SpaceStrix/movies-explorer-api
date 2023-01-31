const router = require('express').Router();

const { getUserInfo, updateDataUser } = require('../controllers/users');

//* # возвращает информацию о пользователе (email и имя)
router.get('/me', getUserInfo);

//* # обновляет информацию о пользователе (email и имя)
router.patch('/me', updateDataUser);

module.exports = router;
