const router = require("express").Router()

const {
    getAllThoughts,
//    getoneThought,
    createThought,
    addReaction,
    removeThought,
    deleteReaction
} = require('../../controllers/thought-controller')

router.get('/', getAllThoughts)

router.route('/:userId').post(createThought)

router.route('/:userId/:thoughtId').delete(removeThought)

router.route('/:thoughtId/reactions').post(addReaction)

router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction)

module.exports=router