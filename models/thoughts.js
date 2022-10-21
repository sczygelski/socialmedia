const {Schema, model} = require('mongoose')

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type:String,
            required:true,
            maxLength: 280
        },
        createdAt: {

        },
        username: {
            type:String,
            required: true
        },
        reactions: [ReactionSchema]
    },
    {
        toJSON: {
            getters: true
        }
    }
)

const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type:String,
            required: true,
            maxLength: 280
        },
        username:{
            type:String,
            required:true
        },
        createdAt: {

        }
    },
    {
        toJSON: {
            getters: true
        }
    }
)

ThoughtSchema.virtual("reactionCount").get(function(){
    return this.reactions.length
})

const Thought = model('Thought', ThoughtSchema)

module.exports=Thought