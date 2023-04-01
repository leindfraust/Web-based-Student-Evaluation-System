const mongoose = require('mongoose')
const {
    Schema
} = mongoose

const logActivitySchema = new Schema({
    handlerID: {
        type: String,
        required: true
    },
    handlerName: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    activity: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        default: new Date(),
        required: true
    }
})

const logActivity = mongoose.model('logActivity', logActivitySchema);

module.exports = logActivity