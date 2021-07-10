const router = require('express').Router();

const {
    getAllThoughts, 
    getThoughtById,
    addThought,
    updateThought, 
    removeThought, 
    removeReaction,
    createReaction
} = require('../../controllers/thought-controller');

// api/thoughts/<userId>
router.route('/:userId').post(addThought);

// api/thoughts/<userId>/<thoughtId>
router
.route('/:userId/:thoughtId')
.get(getAllThoughts)
.get(getThoughtById)
.put(updateThought)
.delete(removeThought);

// /api/thoughts/:thoughtId/reactions
router 
.route('/:thoughtId/reactions')
.post(createReaction)
.delete(removeReaction);


module.exports = router;