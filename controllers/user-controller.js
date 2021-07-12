const { User } = require('../models');

const userController = {
    // get all users 
    getAllUsers(req, res) {
        User.find({})
            .populate({
                path: 'Thought',
                select: '__v'
            })
            .select('__v')
            .sort({ _id: -1 })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // get one user by id 
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .populate(
                {
                    path: 'thought',
                    select: '-__v'
                },
                {
                    path: 'friend',
                    select: '-__v'
                }
            )
            .select('-__v')
            .then(dbUserData => {
                // if no user is found, send 404
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user was found by that id' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // create new user
    // example data 'username', 'email'
    createUser({ body }, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
    }, 

    // update user by id 
    updateUserById({ params, body}, res) {
        User.findOneAndUpdate({ _id: params.id}, body, { new: true })
        .then(dbUserData => {
            if (!dbUserData){
                res.status(404).json({ message: 'No user found with this id'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    }, 

    // delete user by id 
    deleteUserById({ params }, res) {
        User.findOneAndDelete({ _id: params.id})
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found by this id'});
                return; 
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    }, 

    // post to add a new friend to user's friend list
    // addFriend({})
    // find by id
    // $push 

    // delete to remove a friend from a user's friend list
    // removeFriend({ })
    // find by id
    //  $pull
};

module.exports = userController;