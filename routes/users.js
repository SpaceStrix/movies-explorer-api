const router = require('express').Router();

const { getUserInfo, updateDataUser } = require('../controllers/users');

router.get('/me', getUserInfo);
router.patch('/me', updateDataUser);

module.exports = router;
