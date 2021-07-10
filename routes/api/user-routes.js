const router = require('express').Router();

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUserById,
    deleteUserById
} = require('../../controllers/user-controller');

// set up GET all and POST at /api/users
router
    .router('/')
    .get(getAllUsers)
    .post(createUser);

// set up GET one, PUT and DELETE at /api/users/:id
router
    .route('/:id')
    .get(getUserById)
    .put(updateUserById)
    .delete(deleteUserById);

// set up POST and DELETE at /api/users/:userId/friends/:friendId
router 
.route('/:userId/friends/:friendId')
.post()
.delete();


module.exports = router;