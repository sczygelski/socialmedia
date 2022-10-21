const {Thought,Friend}=reqwuire('../models')

const thoughtController = {
    getAllThoughts(req,res){
        Thought.find({})
            .select('-__v')
            .sort({createdAt:-1})
            .then((dbThoughtData)=> res.json(dbThoughtData))
            .catch((err)=>{
                console.log(err)
                res.sendStatus(400)
        })
    },
    getoneThought(req,res){
        Thought.findOne({_id: req.params.thoughtId})
            .then((dbThoughtData)=>{
                if(!dbThoughtData){
                    res.status(404).json({message:'No thoughts have this id.'})
                    return 
                }
                res.json(dbThoughtData)
            })
            .catch((err)=>{
                console.log(err)
                res.status(400).json(err)
            })

    },
    createThought({params,body}, res){
        console.log(body)
        Thought.create(body)
            .then(({_id})=>{
                return Friend.findOneAndUpdate(
                    { _id: params.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                )
            })
            .then((dbFriendData)=>{
                if(!dbFriendData){
                    res.status(404).json({message: 'No users have this id.'})
                    return
                }
                res.json(dbFriendData)
            })
            .catch((err)=>res.json(err))
    },
    removeThought({params},res){
        Thought.findOneAndDelete({_id: params.thoughtId})
            .then((deletedThought)=>{
                if(!deletedThought){
                    return res.status(404).json({message:'No thoughts have this id.'})
                }
                return Friend.findOneAndUpdate(
                    { _id: params.userId },
                    { $pull: { thoughts: params.commentId } },
                    { new: true }
                )
            })
            .then((dbFriendData)=>{
                if(!dbFriendData){
                    res.status(404).json({message: 'No users have this id.'})
                    return
                }
                res.json(dbFriendData)
            })
            .catch((err)=> res.json(err))
    },
    addReaction(req,res){
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { new: true, runValidators: true }
        )
        .then((dbThoughtData)=>{
            if(!dbThoughtData){
                res.status(404).json({message:'No thoughts have this id.'})
                return
            }
            res.json(dbThoughtData)
        })
        .catch((err)=>{
            console.log(err)
            res.status(400).json(err)
        })
    },
    deleteReaction(req,res){
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { new: true, runValidators: true }
        )
        .then((dbThoughtData)=>{
            if(!dbThoughtData){
                res.status(404).json({message:'No thoughts have this id.'})
                return
            }
            res.json(dbThoughtData)
        })
        .catch((err)=>{
            console.log(err)
            res.status(400).json(err)
        })
    }
}