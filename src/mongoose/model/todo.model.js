const { model, Schema } = require('mongoose')

const schema = new Schema({

    item: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['NOT_STARTED', 'FINISHED', 'IN_PROGRESS', 'SUSPENDED'],
        default: 'NOT_STARTED'
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }
}, { timestamps: true })

const ToDo = model("ToDo", schema)

module.exports = ToDo