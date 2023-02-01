const router = require('express').Router();

const { getUserInfo, updateDataUser } = require('../controllers/users');
const { updateDataUserValidation } = require('../middlewares/validation');

router.get('/me', getUserInfo);
router.patch('/me', updateDataUserValidation, updateDataUser);

module.exports = router;
