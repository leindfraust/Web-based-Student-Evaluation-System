<script lang="ts" setup>
import NavPanel from '@/components/NavPanel.vue';
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import CatchErr from '@/components/CatchErr.vue';
import { recordLog } from '@/composables/recordLog';

const { updateLog } = recordLog()

interface subjectEnrolled {
    code: string;
    description: string;
    grade: number;
    instructor: string
}

const searchBar = ref('')
const studentRecords = ref()
const errCode = ref('')
const errMsg = ref('')

const inputStudentIDNo = ref('')
const inputStudentFirstName = ref('')
const inputStudentLastName = ref('')
const inputStudentAddress = ref('')
const inputStudentYearLevel = ref('I')
const inputStudentCourse = ref('')
const inputStudentEmail = ref('')

const inputStudentSubjectsEnrolled = ref(new Array<subjectEnrolled>)
const inputStudentSubjectCode = ref('')
const inputStudentSubjectDescription = ref('')
const inputStudentSubjectGrade = ref()
const inputStudentSubjectInstructor = ref('')

const addStudentControl = ref(false)
const editStudentControl = ref('') //string type to be used for the document ID
const addSubjectControl = ref(false)
const editSubjectControl = ref() //the index of the subject of the array

onMounted(async () => {
    await axios.get('/api/student-records').then(response => studentRecords.value = response.data).catch(err => {
        errCode.value = err.code
        errMsg.value = err.msg
    })
})

const studentSubjectEnrolled = computed(() => inputStudentSubjectsEnrolled.value)
const studentRecordsFiltered = computed(() => {
    return studentRecords.value ? studentRecords.value.filter((student: Record<string, string>) => student.studentIDNo.toLowerCase().includes(searchBar.value.toLowerCase()) || student.studentFirstName.toLowerCase().includes(searchBar.value.toLowerCase()) || student.studentLastName.toLowerCase().includes(searchBar.value.toLowerCase()) || student.studentAddress.toLowerCase().includes(searchBar.value.toLowerCase()) || student.studentYearLevel.toLowerCase().includes(searchBar.value.toLowerCase()) || student.studentCourse.toLowerCase().includes(searchBar.value.toLowerCase())).sort((a: Record<string, string>, b: Record<string, string>) => a.studentLastName.localeCompare(b.studentLastName)) : []
})

function addSubjectPrompt() {
    addSubjectControl.value = true
    editSubjectControl.value = undefined
    inputStudentSubjectCode.value = ''
    inputStudentSubjectDescription.value = ''
    inputStudentSubjectGrade.value = ''
    inputStudentSubjectInstructor.value = ''
}

function addSubject() {
    if (!inputStudentSubjectsEnrolled.value.find((subject: subjectEnrolled) => subject.code == inputStudentSubjectCode.value) && inputStudentSubjectCode.value !== '' && inputStudentSubjectDescription.value !== '' && inputStudentSubjectGrade.value) {
        inputStudentSubjectsEnrolled.value.push({
            code: inputStudentSubjectCode.value,
            description: inputStudentSubjectDescription.value,
            grade: parseFloat(inputStudentSubjectGrade.value),
            instructor: inputStudentSubjectInstructor.value
        })
        inputStudentSubjectCode.value = ''
        inputStudentSubjectDescription.value = ''
        inputStudentSubjectGrade.value = ''
        inputStudentSubjectInstructor.value = ''
    }
}

function editSubjectPrompt(subject: subjectEnrolled, i: number) {
    addSubjectControl.value = true
    editSubjectControl.value = i
    inputStudentSubjectCode.value = subject.code
    inputStudentSubjectDescription.value = subject.description
    inputStudentSubjectGrade.value = subject.grade
    inputStudentSubjectInstructor.value = subject.instructor
}

function editSubject() {
    studentSubjectEnrolled.value[editSubjectControl.value].code = inputStudentSubjectCode.value
    studentSubjectEnrolled.value[editSubjectControl.value].description = inputStudentSubjectDescription.value
    studentSubjectEnrolled.value[editSubjectControl.value].grade = inputStudentSubjectGrade.value
    studentSubjectEnrolled.value[editSubjectControl.value].instructor = inputStudentSubjectInstructor.value
    addSubjectControl.value = false
    editSubjectControl.value = undefined
    inputStudentSubjectCode.value = ''
    inputStudentSubjectDescription.value = ''
    inputStudentSubjectGrade.value = ''
    inputStudentSubjectInstructor.value = ''
}

function removeSubject(code: string) {
    inputStudentSubjectsEnrolled.value = inputStudentSubjectsEnrolled.value.filter((subject: subjectEnrolled) => subject.code !== code)
}

async function addStudentRecord() {
    if (inputStudentIDNo.value !== '' && inputStudentFirstName.value !== '' && inputStudentLastName.value !== '' && inputStudentAddress.value !== '' && inputStudentYearLevel.value !== '' && inputStudentCourse.value !== '' && inputStudentEmail.value !== '') {
        await axios.post('/api/student-records', {
            studentIDNo: inputStudentIDNo.value,
            studentFirstName: inputStudentFirstName.value,
            studentLastName: inputStudentLastName.value,
            studentAddress: inputStudentAddress.value,
            studentYearLevel: inputStudentYearLevel.value,
            studentCourse: inputStudentCourse.value,
            studentEmail: inputStudentEmail.value,
            studentSubjectsEnrolled: inputStudentSubjectsEnrolled.value
        }).catch(err => {
            errCode.value = err.code
            errMsg.value = err.message
        })
        await axios.get('/api/student-records').then(response => studentRecords.value = response.data).catch(err => {
            errCode.value = err.code
            errMsg.value = err.msg
        })
        updateLog(`Added new student record with ID: ${inputStudentIDNo.value}`, 'ADD').catch(err => {
            errCode.value = err.code
            errMsg.value = err.message
        })
        addStudentControl.value = false
        clearFields()
    }
}

function editStudentRecordModal(record: Record<string, string>) {
    editStudentControl.value = record._id
    addStudentControl.value = true
    inputStudentIDNo.value = record.studentIDNo
    inputStudentFirstName.value = record.studentFirstName
    inputStudentLastName.value = record.studentLastName
    inputStudentAddress.value = record.studentAddress
    inputStudentYearLevel.value = record.studentYearLevel
    inputStudentCourse.value = record.studentCourse
    inputStudentEmail.value = record.studentEmail
    inputStudentSubjectsEnrolled.value = record.studentSubjectsEnrolled as unknown as Array<subjectEnrolled>
}

async function editStudentRecord() {
    if (inputStudentIDNo.value !== '' && inputStudentFirstName.value !== '' && inputStudentLastName.value !== '' && inputStudentAddress.value !== '' && inputStudentYearLevel.value !== '' && inputStudentCourse.value !== '' && inputStudentEmail.value !== '') {
        await axios.put(`/api/student-records/${editStudentControl.value}`, {
            studentIDNo: inputStudentIDNo.value,
            studentFirstName: inputStudentFirstName.value,
            studentLastName: inputStudentLastName.value,
            studentAddress: inputStudentAddress.value,
            studentYearLevel: inputStudentYearLevel.value,
            studentCourse: inputStudentCourse.value,
            studentEmail: inputStudentEmail.value,
            studentSubjectsEnrolled: inputStudentSubjectsEnrolled.value
        }).catch(err => {
            errCode.value = err.code
            errMsg.value = err.message
        })
        await axios.get('/api/student-records').then(response => studentRecords.value = response.data).catch(err => {
            errCode.value = err.code
            errMsg.value = err.msg
        })
        updateLog(`Edited student record of ID: ${inputStudentIDNo.value}`, 'EDIT').catch(err => {
            errCode.value = err.code
            errMsg.value = err.message
        })
        addStudentControl.value = false
        editStudentControl.value = ''
        clearFields()
    }
}

async function deleteStudentRecord() {
    await axios.delete(`/api/student-records/${editStudentControl.value}`).catch(err => {
        errCode.value = err.code
        errMsg.value = err.message
    })
    await axios.get('/api/student-records').then(response => studentRecords.value = response.data).catch(err => {
        errCode.value = err.code
        errMsg.value = err.msg
    })
    updateLog(`Deleted student record of ID: ${inputStudentIDNo.value}`, 'DELETE').catch(err => {
        errCode.value = err.code
        errMsg.value = err.message
    })
    addStudentControl.value = false
    editStudentControl.value = ''
    clearFields()
}

function clearFields() {
    inputStudentIDNo.value = ''
    inputStudentFirstName.value = ''
    inputStudentLastName.value = ''
    inputStudentAddress.value = ''
    inputStudentYearLevel.value = 'I'
    inputStudentCourse.value = ''
    inputStudentEmail.value = ''
    inputStudentSubjectsEnrolled.value = []
    inputStudentSubjectCode.value = ''
    inputStudentSubjectDescription.value = ''
    inputStudentSubjectGrade.value = ''
}
</script>
<template>
    <div class="main-wrapper">
        <div class="columns">
            <div class="column is-2">
                <NavPanel />
            </div>
            <div class="column">
                <section class="section">
                    <div class="modal" :class="{ 'is-active': addStudentControl }">
                        <div class="modal-background"></div>
                        <div class="modal-content">
                            <div class="container box">
                                <button class="button is-danger is-small" v-if="editStudentControl"
                                    @click="deleteStudentRecord">DELETE STUDENT INFORMATION</button>
                                <div class="container is-fluid">
                                    <br />
                                    <h3 class="title is-3">Student Information</h3>
                                    <div class="field">
                                        <label class="label">
                                            Student ID No.
                                        </label>
                                        <div class="control">
                                            <input class="input" type="text" v-model="inputStudentIDNo" />
                                        </div>
                                    </div>
                                    <div class="field">
                                        <label class="label">
                                            Student Last Name
                                        </label>
                                        <div class="control">
                                            <input class="input" type="text" v-model="inputStudentLastName" />
                                        </div>
                                    </div>
                                    <div class="field">
                                        <label class="label">
                                            Student First Name
                                        </label>
                                        <div class="control">
                                            <input class="input" type="text" v-model="inputStudentFirstName" />
                                        </div>
                                    </div>
                                    <div class="field">
                                        <label class="label">
                                            Student Address
                                        </label>
                                        <div class="control">
                                            <input class="input" type="text" v-model="inputStudentAddress" />
                                        </div>
                                    </div>
                                    <div class="field">
                                        <label class="label">
                                            Student Year Level
                                        </label>
                                        <div class="control">
                                            <div class="select">
                                                <select v-model="inputStudentYearLevel">
                                                    <option value="I">I</option>
                                                    <option value="II">II</option>
                                                    <option value="III">III</option>
                                                    <option value="IV">IV</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="field">
                                        <label class="label">
                                            Student Course
                                        </label>
                                        <div class="control">
                                            <input class="input" type="text" v-model="inputStudentCourse" />
                                        </div>
                                    </div>
                                    <div class="field">
                                        <label class="label">
                                            Student Email
                                        </label>
                                        <div class="control">
                                            <input class="input" type="text" v-model="inputStudentEmail" />
                                        </div>
                                    </div>
                                </div>
                                <div class="container is-fluid">
                                    <br />
                                    <h3 class="title is-3">Subjects Enrolled
                                    </h3>
                                    <button class="button is-info" @click="addSubjectPrompt">Add
                                        Subject</button>
                                    <div class="container" v-if="addSubjectControl">
                                        <div class="field">
                                            <label class="label">
                                                Subject Code
                                            </label>
                                            <div class="control">
                                                <input class="input" type="text" v-model="inputStudentSubjectCode" />
                                            </div>
                                        </div>
                                        <div class="field">
                                            <label class="label">
                                                Subject Description
                                            </label>
                                            <div class="control">
                                                <input class="input" type="text" v-model="inputStudentSubjectDescription" />
                                            </div>
                                        </div>
                                        <div class="field">
                                            <label class="label">
                                                Grade
                                            </label>
                                            <div class="control">
                                                <input class="input" type="number" v-model="inputStudentSubjectGrade" />
                                            </div>
                                        </div>
                                        <div class="field">
                                            <label class="label">
                                                Subject Instructor
                                            </label>
                                            <div class="control">
                                                <input class="input" type="text" v-model="inputStudentSubjectInstructor" />
                                            </div>
                                            <p class="help">LAST NAME, FIRST NAME, MIDDLE INITIAL</p>
                                        </div>
                                        <div class="buttons is-right">
                                            <button class="button is-danger is-light"
                                                @click="addSubjectControl = false">Cancel</button>
                                            <button class="button is-success is-light" @click="addSubject"
                                                v-if="editSubjectControl == undefined">Confirm</button>
                                            <button class="button is-info is-light" @click="editSubject" v-else>
                                                Update
                                            </button>
                                        </div>
                                    </div>
                                    <table class="table-container">
                                        <div class="table is-fullwidth is-hoverable">
                                            <thead>
                                                <tr>
                                                    <th></th>
                                                    <th>Subject Code</th>
                                                    <th>Subject Description</th>
                                                    <th>Grade</th>
                                                    <th>Instructor</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="subject, index in studentSubjectEnrolled" :key="index">
                                                    <th>
                                                        <div class="buttons">
                                                            <button class="button is-info is-small"
                                                                @click="editSubjectPrompt(subject, index)">Edit</button>
                                                            <button class="button is-danger is-small"
                                                                @click="removeSubject(subject.code)">Remove</button>
                                                        </div>
                                                    </th>
                                                    <th>{{ subject.code }}</th>
                                                    <td>{{ subject.description }}</td>
                                                    <td>{{ subject.grade }}</td>
                                                    <td>{{ subject.instructor }}</td>
                                                </tr>
                                            </tbody>
                                        </div>
                                    </table>
                                </div>
                                <div class="buttons is-centered">
                                    <button class="button is-danger"
                                        @click="addStudentControl = false, clearFields(), editStudentControl = ''">Cancel</button>
                                    <button class="button is-success" @click="addStudentRecord"
                                        v-if="!editStudentControl">Confirm</button>
                                    <button class="button is-info" @click="editStudentRecord" v-else>Update</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="container">
                        <CatchErr :err-code="errCode" :err-message="errMsg" />
                        <div class="columns has-text-centered">
                            <div class="column">
                                <div class="field header-control">
                                    <div class="control has-icons-right">
                                        <input type="text" class="input is-rounded is-medium" placeholder="Search..."
                                            v-model="searchBar" />
                                        <span class="icon is-right">
                                            <i class="fas fa-search"></i>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="column">
                                <div class="field">
                                    <div class="control has-icons-right">
                                        <button class="button is-medium is-rounded" @click="addStudentControl = true">Add
                                            Student &nbsp; <i class="fa-solid fa-plus"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="table-container" v-if="studentRecords">
                            <table class="table is-fullwidth is-hoverable" v-if="Object.keys(studentRecords).length !== 0">
                                <thead>
                                    <tr>
                                        <th>ID No.</th>
                                        <th>Last Name</th>
                                        <th>First Name</th>
                                        <th>Address</th>
                                        <th>Year Level</th>
                                        <th>Course</th>
                                        <th>Email</th>
                                        <th>Subjects</th>
                                        <th>GPA</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="record in studentRecordsFiltered" :key="record._id"
                                        @click="editStudentRecordModal(record)">
                                        <th>{{ record.studentIDNo }}</th>
                                        <td>{{ record.studentLastName }}</td>
                                        <td>{{ record.studentFirstName }}</td>
                                        <td>{{ record.studentAddress }}</td>
                                        <td>{{ record.studentYearLevel }}</td>
                                        <td>{{ record.studentCourse }}</td>
                                        <td>{{ record.studentEmail }}</td>
                                        <td>
                                            <div class="columns">
                                                <div class="column" v-for="subject in record.studentSubjectsEnrolled"
                                                    :key="subject">
                                                    {{ subject.code }}: {{ subject.grade }}
                                                </div>
                                            </div>
                                        </td>
                                        <td>{{ record.studentSubjectsEnrolled.reduce((a: number, b: any) => a + (b.grade /
                                            record.studentSubjectsEnrolled.length), 0) }}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="container" v-else>
                                <div class="notification is-info">Empty records</div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>