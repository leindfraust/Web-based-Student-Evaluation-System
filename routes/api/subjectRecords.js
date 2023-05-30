const express = require('express');
const router = express.Router();
const {
    getSubjectRecords,
    pushSubjectRecords,
    updateSubjectRecords,
    deleteSubjectRecords,
} = require('../../controllers/subjectRecordsController')

router.get('/', getSubjectRecords);

router.post('/', pushSubjectRecords);

router.put('/:id', updateSubjectRecords);

router.delete('/:id', deleteSubjectRecords);

module.exports = router;