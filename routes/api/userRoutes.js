const router = require('express').Router();
const { getAllUsers, getOneUser, createUser, updateUser, deleteUser, addFriend, removeFriend } = require('../../controllers/userController');

router.route('/').get(getAllUsers)
router.route('/').post(createUser);

router.route('/:userID').get(getOneUser);
router.route('/:userID').put(updateUser);
router.route('/:userID').delete(deleteUser);

router.route('/:userID/friends/:friendID').post(addFriend);
router.route('/:userID/friends/:friendID').delete(removeFriend);

module.exports = router;