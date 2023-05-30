const mongoose = require('mongoose')
const {
    Schema
} = mongoose

const subjectRecordsSchema = new Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    instructors: {
        type: Array,
        required: true
    }
})

const subjectRecords = mongoose.model('subjectRecords', subjectRecordsSchema);

module.exports = subjectRecords