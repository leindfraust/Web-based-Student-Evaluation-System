const SubjectRecordsList = require('../models/subjectRecords')

const getSubjectRecords = async (req, res) => {
    try {
        const subjectRecordsList = await SubjectRecordsList.find()
        if (!subjectRecordsList) throw new Error('no items')
        res.status(200).send(subjectRecordsList)
    } catch (err) {
        res.status(500).send(err)
    }
}

const pushSubjectRecords = async (req, res) => {
    const newSubjectRecords = new SubjectRecordsList(req.body)
    try {
        const subjectRecordsList = await newSubjectRecords.save()
        if (!subjectRecordsList) throw new Error('Cannot save')
        res.status(200).end()
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

const updateSubjectRecords = async (req, res) => {
    const {
        id
    } = req.params
    try {
        const response = await SubjectRecordsList.findByIdAndUpdate(id, req.body)
        if (!response) throw new Error('cannot update')
        res.status(200).end()
    } catch (err) {
        res.status(500).send(err)
    }
}

const deleteSubjectRecords = async (req, res) => {
    const {
        id
    } = req.params
    try {
        const removed = await SubjectRecordsList.findByIdAndDelete(id)
        if (!removed) throw new Error('something went wrong, try again later')
        res.status(200).end()
    } catch (err) {
        res.status(500).send(err)
    }
}

module.exports = {
    getSubjectRecords,
    pushSubjectRecords,
    updateSubjectRecords,
    deleteSubjectRecords
}
