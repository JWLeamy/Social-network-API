// Require express router
const router = require('express').Router();

// Set requirements (from users-controller)
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
  } = require('../../controllers/user-controller');

// -- Directs to: /api/users <GET, POST>
router.route('/').get(getUsers).post(createUser);

// -- Directs to: /api/users/:id <GET, PUT, DELETE>
router.route('/:id').get(getSingleUser).put(updateUser).delete(deleteUser);

// -- Directs to: /api/users/:userId/friends/:friendId <POST, DELETE>
router.route('/:id/friends/:friendId').post(addFriend).delete(deleteFriend)

// Module export router
module.exports = router; 
