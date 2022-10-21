const {Schema, model} = require('mongoose')

const FriendSchema=new Schema(
    {
        username: {
            type:String,
            unique: true,
            required: true,
            trim:true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type:Schema.Types.ObjectId,
                ref: 'Friend'
            }
        ]
    },
    {
        toJSON: {
            getters:true
        }
    }
)

const Friend = model('Friend', FriendSchema)

module.exports=Friend