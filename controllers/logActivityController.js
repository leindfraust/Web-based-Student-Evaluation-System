const LogActivityList = require('../models/logActivity');

const getLogActivity = (async (req, res) => {
    try {
        const logActivityList = await LogActivityList.find()
        if (!logActivityList) throw new Error('no items')
        res.status(200).send(logActivityList)
    } catch (err) {
        res.status(500).send(err)
    }
});

const pushLogActivity = (async (req, res) => {
    const newLogActivity = new LogActivityList(req.body)
    try {
        const logActivityList = await newLogActivity.save()
        if (!logActivityList) throw new Error('Cannot save')
        res.status(200).end()
    } catch (err) {
        res.status(500).send(err)
    }
});

const updateLogActivity = (async (req, res) => {
    const {
        id
    } = req.params
    try {
        const response = await LogActivityList.findByIdAndUpdate(id, req.body)
        if (!response) throw new Error('cannot update')
        res.status(200).end()
    } catch (err) {
        res.status(500).send(err)
    }
});

const deleteLogActivity = (async (req, res) => {
    const {
        id
    } = req.params
    try {
        const removed = await LogActivityList.findByIdAndDelete(id)
        if (!removed) throw new Error('something went wrong, try again later')
        res.status(200).end()
    } catch (err) {
        res.status(500).send(err)
    }
});

module.exports = {
    getLogActivity,
    pushLogActivity,
    updateLogActivity,
    deleteLogActivity
}