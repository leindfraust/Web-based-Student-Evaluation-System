const mongoose = require('mongoose')
const {
    Schema
} = mongoose

const studentRecordsSchema = new Schema({
    studentIDNo: {
        type: String,
        required: true,
        unique: true
    },
    studentFirstName: {
        type: String,
        required: true
    },
    studentLastName: {
        type: String,
        required: true
    },
    studentAddress: {
        type: String,
        required: true
    },
    studentYearLevel: {
        type: String,
        required: true
    },
    studentCourse: {
        type: String,
        required: true
    },
    studentEmail: {
        type: String,
        required: true
    },
    studentSubjectsEnrolled: Array
})

const studentRecords = mongoose.model('studentRecords', studentRecordsSchema);

module.exports = studentRecords