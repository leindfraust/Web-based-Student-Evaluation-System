const DynamicAccountsList = require('../models/dynamicAccounts');

const authDynamicAccount = (async (req, res) => {
    try {
        const dynamicAuth = await DynamicAccountsList.findOne({
            username: req.body.username,
            password: req.body.password
        }).select('-username -password')
        if (!dynamicAuth) res.status(200).send(false)
        else res.status(200).send(dynamicAuth)
    } catch (err) {
        res.status(500).send(err)
    }
})

const getDynamicAccount = (async (req, res) => {
    try {
        const dynamicAccountsList = await DynamicAccountsList.findOne({ _id: req.body.id })
        if (!dynamicAccountsList) throw new Error('no items')
        res.status(200).send(dynamicAccountsList)
    } catch (err) {
        res.status(500).send(err)
    }
});

const getDynamicAccounts = (async (req, res) => {
    try {
        const dynamicAccountsList = await DynamicAccountsList.find()
        if (!dynamicAccountsList) throw new Error('no items')
        res.status(200).send(dynamicAccountsList)
    } catch (err) {
        res.status(500).send(err)
    }
});

const pushDynamicAccounts = (async (req, res) => {
    const newDynamicAccounts = new DynamicAccountsList(req.body)
    try {
        const dynamicAccountsList = await newDynamicAccounts.save()
        if (!dynamicAccountsList) throw new Error('Cannot save')
        res.status(200).end()
    } catch (err) {
        res.status(500).send(err)
        console.log(err)
    }
});

const updateDynamicAccounts = (async (req, res) => {
    const {
        id
    } = req.params
    try {
        const response = await DynamicAccountsList.findByIdAndUpdate(id, req.body)
        if (!response) throw new Error('cannot update')
        res.status(200).end()
    } catch (err) {
        res.status(500).send(err)
    }
});

const deleteDynamicAccounts = (async (req, res) => {
    const {
        id
    } = req.params
    try {
        const removed = await DynamicAccountsList.findByIdAndDelete(id)
        if (!removed) throw new Error('something went wrong, try again later')
        res.status(200).end()
    } catch (err) {
        res.status(500).send(err)
    }
});

module.exports = {
    authDynamicAccount,
    getDynamicAccount,
    getDynamicAccounts,
    pushDynamicAccounts,
    updateDynamicAccounts,
    deleteDynamicAccounts
}