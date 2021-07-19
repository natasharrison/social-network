const { Thought, User } = require('../models');

const thoughtController = {
    // get all thoughts 
    getAllThoughts(req, res) {
        Thought.find()
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

    // get a single thought by id 
    getThoughtById({ params }, res) {
        console.log(params)
        Thought.findOne({ _id: params.userId })
            // .populate({
            //         path: 'Thought',
            //         select: '-__v'
            //     })
            // .select('-__v')
            .then(dbUserData => {
                // if no user is found, send 404
                if (!dbUserData) {
                    res.status(404).json({ message: 'No thought was found by that id' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    // create a new thought (don't forget to push the created thought's id to the associated user's thoughts array field)
    addThought({ params, body }, res) {
        console.log(body);
        Thought.create(body)
        .then(({ _id}) => {
            return User.findOneAndUpdate(
                { _id: body.userId}, 
                { $push: { thoughts: _id }}, 
                { new: true}
            );
        })
        .then(dbUserData => {
            if (!dbUserData){
                res.status(404).json({ message: 'No user found with this id'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    }, 
    // put to update a thought by id
    updateThought({ params, body}, res){
        Thought.findOneAndUpdate({ _id: params.thoughtId}, body, {new:true})
        .then(dbUserData => {
            if (!dbUserData){
                res.status(404).json({ message: 'No thought found by this id'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    }, 

    // delete to remove thought by id 
    removeThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
            .then(deleteThought => {
                if (!deleteThought) {
                    return res.status(404).json({ message: 'No thought found with this id' });
                    return;
                }
                res.json(deleteThought);
                // return 
                // // Thought.findOneAndUpdate(
                // //     { _id: params.thoughtId },
                // //     { $pull: { thought: params.thoughtId } },
                // //     { new: true }
                // // );
            })
            .catch(err => res.json(err));
    }, 

    //  post to create a reaction stored in a single thought's reactions array field 
    createReaction({params, body}, res){
        Thought.findOneAndUpdate(
            { _id: params.thoughtId}, 
            { $push: { reactions: body}}, 
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

    // delete to pull and remove a reaction by the reaction's reactionId value 
    removeReaction({ params}, res){
        Thought.findOneAndUpdate(
            { _id: params.thoughtId}, 
            { $pull: { reactions: { reactionId: params.reactionId}}}, 
            { new: true}
        )
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    }
};

module.exports = thoughtController;