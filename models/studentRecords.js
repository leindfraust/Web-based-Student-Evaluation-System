const mongoose = require('mongoose')
const {
    Schema
} = mongoose

const studentRecordsSchema = new Schema({
    StudentIDNo: {
        type: String,
        required: true,
        unique: true
    },
    StudentName: {
        type: String,
        required: true
    },
    StudentAddress: {
        type: String,
        required: true
    },
    StudentYearLevel: {
        type: String,
        required: true
    },
    StudentCourse: {
        type: String,
        required: true
    },
    StudentEmail: {
        type: String,
        required: true
    },
    StudentSubjectsEnrolled: Array
})

const studentRecords = mongoose.model('booking', studentRecordsSchema);

module.exports = studentRecords