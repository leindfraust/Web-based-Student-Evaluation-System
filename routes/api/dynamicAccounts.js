const express = require('express');
const router = express.Router();
const {
    getDynamicAccounts,
    getDynamicAccount,
    pushDynamicAccounts,
    updateDynamicAccounts,
    deleteDynamicAccounts,
    authDynamicAccount
} = require('../../controllers/dynamicAccountsController')

router.post('/auth', authDynamicAccount)

router.post('/inquire', getDynamicAccount)

router.get('/', getDynamicAccounts);

router.post('/', pushDynamicAccounts);

router.put('/:id', updateDynamicAccounts);

router.delete('/:id', deleteDynamicAccounts);

module.exports = router;