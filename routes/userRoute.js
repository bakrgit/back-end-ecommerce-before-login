const express = require('express');
const {
  getUser,
  createUser,
  getUsers,
  updateUser,
  deleteUser,
  updateUserPassword,
} = require('../controllers/userController');
const {
  createUserValidator,
  updateUserValidator,
  deleteUserValidator,
  getUserValidator,
  changeUserPasswordValidator,
} = require('../utils/validators/userValidator');
const { auth } = require('../controllers/authController');

const router = express.Router();

router.put(
  '/change-password/:id',
  changeUserPasswordValidator,
  updateUserPassword
);

router.route('/').get(getUsers).post(auth, createUserValidator, createUser);

// router.use(idValidation);
router
  .route('/:id')
  .get(getUserValidator, getUser)
  .put(updateUserValidator, updateUser)
  .delete(deleteUserValidator, deleteUser);

module.exports = router;
