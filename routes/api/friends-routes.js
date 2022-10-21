const router=require('express').Router()

const {
    getallUsers,
    getoneUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
}=require('../../controllers/friend-controller')

router.route('/').get(getallUsers).post(createUser)

router.route('/:id').get(getoneUser).put(updateUser).delete(deleteUser)

router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend)

module.exports=router