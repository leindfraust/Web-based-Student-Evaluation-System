const StudentRecordsList = require('../models/studentRecords')

const getStudentRecords = async (req, res) => {
    try {
        const studentRecordsList = await StudentRecordsList.find()
        if (!studentRecordsList) throw new Error('no items')
        res.status(200).send(studentRecordsList)
    } catch (err) {
        res.status(500).send(err)
    }
}

const getTeacherStudentRecords = async (req, res) => {
    const namePattern = "(?:(?:[A-Z][a-z]*|[a-z][A-Z])[A-Za-z]*)\\s+(?:(?:[A-Z][a-z]*|[a-z][A-Z])[A-Za-z]*)";
    const regexString = `\\b${namePattern.replace(/%NAME%/g, req.body.instructor)}\\b`;

    const instructor = new RegExp(regexString, "i");

    try {
        const studentRecordsList = await StudentRecordsList.find({
            "studentSubjectsEnrolled.instructor": instructor
        })
        if (!studentRecordsList) throw new Error('no items')
        res.status(200).send(studentRecordsList)
    } catch (err) {
        res.status(500).send(err)
    }
}

const inquireStudentRecord = async (req, res) => {
    try {
        const studentRecordsList = await StudentRecordsList.findOne({ studentIDNo: req.body.id })
        res.status(200).send(studentRecordsList)
    } catch (err) {
        res.status(500).send(err)
    }
}

const pushStudentRecords = async (req, res) => {
    const newStudentRecords = new StudentRecordsList(req.body)
    try {
        const studentRecordsList = await newStudentRecords.save()
        if (!studentRecordsList) throw new Error('Cannot save')
        res.status(200).end()
    } catch (err) {
        res.status(500).send(err)
    }
}

const updateStudentRecords = async (req, res) => {
    const {
        id
    } = req.params
    try {
        const response = await StudentRecordsList.findByIdAndUpdate(id, req.body)
        if (!response) throw new Error('cannot update')
        res.status(200).end()
    } catch (err) {
        res.status(500).send(err)
    }
}

const deleteStudentRecords = async (req, res) => {
    const {
        id
    } = req.params
    try {
        const removed = await StudentRecordsList.findByIdAndDelete(id)
        if (!removed) throw new Error('something went wrong, try again later')
        res.status(200).end()
    } catch (err) {
        res.status(500).send(err)
    }
}

module.exports = {
    getStudentRecords,
    getTeacherStudentRecords,
    inquireStudentRecord,
    pushStudentRecords,
    updateStudentRecords,
    deleteStudentRecords
}
