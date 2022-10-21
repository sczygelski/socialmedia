const router = require('express').Router()
const FriendRoutes = require('./friends-routes')
const thoughtRoutes = require('./thoughts-routes')

router.use('/friends', FriendRoutes)
router.use('/thoughts', thoughtRoutes)

module.exports=router