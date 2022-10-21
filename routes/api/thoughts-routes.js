const router = require("express").Router()

const {
    getAllThoughts,
//    getoneThought,
    createThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thought-controller')

router.route('/').get(getAllThoughts)

router.route('/:userId').post(createThought)

router.route('/:userId/:thoughtId').delete(removeThought)

router.route('/:thoughtId/reactions').post(addReaction)

router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction)

module.exports=router