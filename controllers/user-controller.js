const { User } = require('../models');

const userController = {
    // get all users 
    getAllUsers(req, res) {
          User.find().then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // get one user by id 
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
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
       addFriend({params, body}, res){
        User.findOneAndUpdate(
            { _id: params.userId}, 
            { $push: { friends: body}}, 
            { new: true }
        )
            .then(dbUserData => {
                if(!dbUserData){
                    res.status(404).json({ message: 'No user found with this id'});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    }, 

    // delete to remove a friend from a user's friend list
    removeFriend({ params}, res){
        User.findOneAndUpdate(
            { _id: params.userId}, 
            { $pull: { friends: { friendId: params.reactionId}}}, 
            { new: true}
        )
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    }
};

module.exports = userController;