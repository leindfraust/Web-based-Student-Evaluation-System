const express = require('express');
const router = express.Router();
const {
    getStudentRecords,
    inquireStudentRecord,
    pushStudentRecords,
    updateStudentRecords,
    deleteStudentRecords,
    getTeacherStudentRecords
} = require('../../controllers/studentRecordsController')

router.get('/', getStudentRecords);

router.post('/teacher', getTeacherStudentRecords)

router.post('/inquire', inquireStudentRecord)

router.post('/', pushStudentRecords);

router.put('/:id', updateStudentRecords);

router.delete('/:id', deleteStudentRecords);

module.exports = router;