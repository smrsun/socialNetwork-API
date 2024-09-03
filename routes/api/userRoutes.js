const router = require('express').Router();

const {
  getUser,
  getSingleUser,
  createUser,
  deleteUser,
  updateUser,
} = require('../../controllers/userController.js');

router.route('/:userId').get(getSingleUser).delete(deleteUser).put(updateUser);

router.route('/').get(getUser).post(createUser);

module.exports = router;
