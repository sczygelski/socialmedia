const {Thought,Friend} = require('../models')

const friendController = {
    getallUsers(req,res) {
        Friend.find({})
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
    },
    getoneUser({params}, res) {
        Friend.findOne({_id: params.id})
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .select('-__v')
            .then((dbFriendData) => {
                if(!dbFriendData){
                    res.status(404).json({message: 'No users have this id.'})
                }
                res.json(dbFriendData)
            })
            .catch((err)=>{
                console.log(err)
                res.status(400).json(err)
            })
    },
    createUser({body},res){
        Friend.create(body)
            .then(dbFriendData=> res.json(dbFriendData))
            .catch((err)=> res.json(err))
    },
    updateUser({params,body},res){
        Friend.findOneAndUpdate({_id: params.id}, body, {new:true, runVaidators:true})
            .then((dbFriendData)=>{
                if(!dbFriendData){
                    res.status(404).json({message:'No users have this id'})
                    return
                }    
                res.json(dbFriendData)
            })
            .catch(err=>res.json(err))
    },
    deleteUser({params}, res) {
        Friend.findOneAndDelete({_id:params.id})
            .then(dbFriendData=>res.json(dbFriendData))
            .catch(err=> res.json(err))
    }        
}
module.exports=friendController