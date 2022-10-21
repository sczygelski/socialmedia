const {Thought,Friend} = require('../models')

const friendController = {
    getallUsers(req,res) {
        username.find({})
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .select('-__v')
            .sort({_id: -1})
            .then((dbFriendData) => res.json(dbFriendData))
            .catch(err=> {
                console.log(err)
                res.sendStatus(400)
            })
    }
}