const mongoose = require('mongoose')
const {
    Schema
} = mongoose

const dynamicAccountsSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    accountType: {
        type: String,
        default: 'Admin',
        required: true
    },
    handler: {
        type: String,
        default: 'dynamic',
        required: true
    }
})

const dynamicAccounts = mongoose.model('dynamicAccounts', dynamicAccountsSchema);

module.exports = dynamicAccounts