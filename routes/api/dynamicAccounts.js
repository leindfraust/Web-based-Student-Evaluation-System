const express = require('express');
const router = express.Router();
const {
    getDynamicAccounts,
    pushDynamicAccounts,
    updateDynamicAccounts,
    deleteDynamicAccounts,
    authDynamicAccount
} = require('../../controllers/dynamicAccountsController')

router.post('/auth', authDynamicAccount)

router.get('/', getDynamicAccounts);

router.post('/', pushDynamicAccounts);

router.put('/:id', updateDynamicAccounts);

router.delete('/:id', deleteDynamicAccounts);

module.exports = router;