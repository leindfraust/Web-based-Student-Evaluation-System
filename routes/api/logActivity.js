const express = require('express');
const router = express.Router();
const {
    getLogActivity,
    pushLogActivity,
    updateLogActivity,
    deleteLogActivity,
    authDynamicAccount
} = require('../../controllers/logActivityController')

router.get('/', getLogActivity);

router.post('/', pushLogActivity);

router.put('/:id', updateLogActivity);

router.delete('/:id', deleteLogActivity);

module.exports = router;