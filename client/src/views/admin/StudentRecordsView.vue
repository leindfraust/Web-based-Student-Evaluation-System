<script lang="ts" setup>
import NavPanel from '@/components/NavPanel.vue';
import { ref, computed, onBeforeMount } from 'vue'
import axios from 'axios'
import CatchErr from '@/components/CatchErr.vue';
import { recordLog } from '@/composables/recordLog';
import { capitalizeFirstLetter } from '@/composables/upperCaseFirstLetter';
import { useCredentialsStore } from '@/stores/CredentialInformation';

const { updateLog } = recordLog()

const store = useCredentialsStore() as unknown as Record<string, string>

interface subjectEnrolled {
    code: string;
    description: string;
    grade: string;
    instructor: string
}
interface studentRecord {
    _id: string,
    studentIDNo: string;
    studentLastName: string;
    studentFirstName: string;
    studentAddress: string;
    studentYearLevel: string;
    studentCourse: string;
    studentEmail: string;
    studentSubjectsEnrolled: Array<subjectEnrolled>;

}

interface subjectRecord {
    code: string;
    description: string;
    instructors: Array<string>;
}


interface accountHandler {
    accountType: string;
    handler: string;
    name: string;
}

const account = store.credentials as unknown as accountHandler

const accountNameRegex = ref()

const searchBar = ref('')
const studentRecords = ref<Array<studentRecord>>([])
const subjectRecords = ref<Array<subjectRecord>>([])
const errCode = ref('')
const errMsg = ref('')

const inputStudentIDNo = ref('')
const inputStudentFirstName = ref('')
const inputStudentLastName = ref('')
const inputStudentAddress = ref('')
const inputStudentYearLevel = ref('I')
const inputStudentCourse = ref('')
const inputStudentEmail = ref('')

const inputStudentSubject = ref<subjectRecord>({} as subjectRecord)
const inputStudentSubjectsEnrolled = ref(new Array<subjectEnrolled>)

const inputStudentSubjectCode = ref('')
const inputStudentSubjectDescription = ref('')
const inputStudentSubjectInstructors = ref<Array<string>>([])

const inputStudentSubjectGrade = ref('')
const inputStudentSubjectGradeDropdown = ref(false)

const inputStudentSubjectInstructor = ref('')

const addStudentControl = ref(false)
const editStudentControl = ref('') //string type to be used for the document ID
const addSubjectControl = ref(false)
const editSubjectControl = ref() //the index of the subject of the array

onBeforeMount(async () => {
    await getStudentRecords()
})

const studentSubjectEnrolled = computed(() => inputStudentSubjectsEnrolled.value)
const studentRecordsFiltered = computed(() => {
    return studentRecords.value ? searchBar.value ? studentRecords.value.filter((student: studentRecord) => student.studentIDNo.toLowerCase().includes(searchBar.value.toLowerCase()) || student.studentFirstName.toLowerCase().includes(searchBar.value.toLowerCase()) || student.studentLastName.toLowerCase().includes(searchBar.value.toLowerCase()) || student.studentAddress.toLowerCase().includes(searchBar.value.toLowerCase()) || student.studentYearLevel.toLowerCase().includes(searchBar.value.toLowerCase()) || student.studentCourse.toLowerCase().includes(searchBar.value.toLowerCase())).sort((a: studentRecord, b: studentRecord) => a.studentLastName.localeCompare(b.studentLastName)) : studentRecords.value : []
})

async function getStudentRecords() {
    if (account.accountType == 'Teacher') {
        const namePattern = "(?:(?:[A-Z][a-z]*|[a-z][A-Z])[A-Za-z]*)\\s+(?:(?:[A-Z][a-z]*|[a-z][A-Z])[A-Za-z]*)";
        const regexString = `\\b${namePattern.replace(/%NAME%/g, account.name)}\\b`;

        accountNameRegex.value = new RegExp(regexString, "i")

        await axios.post('/api/student-records/teacher', {
            instructor: account.name
        }).then(response => studentRecords.value = response.data).catch(err => {
            errCode.value = err.code
            errMsg.value = err.msg
        })
    } else {
        await axios.get('/api/student-records').then(response => studentRecords.value = response.data).catch(err => {
            errCode.value = err.code
            errMsg.value = err.msg
        })
    }
}

function studentSubjectBind() {
    inputStudentSubjectCode.value = inputStudentSubject.value.code
    inputStudentSubjectDescription.value = inputStudentSubject.value.description
    inputStudentSubjectInstructors.value = inputStudentSubject.value.instructors ? [...inputStudentSubject.value.instructors] : []
}

async function getSubjectRecords() {
    try {
        await axios.get('/api/subject-records').then(response => subjectRecords.value = response.data)
    } catch (err: unknown) {
        errCode.value = (err as Error).name
        errMsg.value = (err as Error).message
    }
}

function addSubjectPrompt() {
    addSubjectControl.value = true
    editSubjectControl.value = undefined
    inputStudentSubjectCode.value = ''
    inputStudentSubjectDescription.value = ''
    inputStudentSubjectGrade.value = ''
    inputStudentSubjectInstructor.value = ''
}

function addSubject() {
    if (!inputStudentSubjectsEnrolled.value.find((subject: subjectEnrolled) => subject.code == inputStudentSubjectCode.value) && inputStudentSubjectCode.value !== '' && inputStudentSubjectDescription.value !== '' && inputStudentSubjectInstructor.value !== '') {
        inputStudentSubjectsEnrolled.value.push({
            code: inputStudentSubjectCode.value,
            description: inputStudentSubjectDescription.value,
            grade: parseFloat(inputStudentSubjectGrade.value) == 0 || inputStudentSubjectGrade.value == '' ? inputStudentSubjectGrade.value = 'NG' : inputStudentSubjectGrade.value,
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
    if (inputStudentSubjectCode.value !== '' && inputStudentSubjectDescription.value !== '' && inputStudentSubjectInstructor.value !== '') {
        studentSubjectEnrolled.value[editSubjectControl.value].code = inputStudentSubjectCode.value
        studentSubjectEnrolled.value[editSubjectControl.value].description = inputStudentSubjectDescription.value
        studentSubjectEnrolled.value[editSubjectControl.value].grade = parseFloat(inputStudentSubjectGrade.value) == 0 || inputStudentSubjectGrade.value == '' ? inputStudentSubjectGrade.value = 'NG' : inputStudentSubjectGrade.value
        studentSubjectEnrolled.value[editSubjectControl.value].instructor = inputStudentSubjectInstructor.value
        addSubjectControl.value = false
        editSubjectControl.value = undefined
        inputStudentSubjectCode.value = ''
        inputStudentSubjectDescription.value = ''
        inputStudentSubjectGrade.value = ''
        inputStudentSubjectInstructor.value = ''
    }
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
        await getStudentRecords()
        updateLog(`Added new student record with ID: ${inputStudentIDNo.value}`, 'ADD').catch(err => {
            errCode.value = err.code
            errMsg.value = err.message
        })
        addStudentControl.value = false
        clearFields()
    }
}

async function editStudentRecordModal(record: studentRecord) {
    await getSubjectRecords()
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
        if (account.accountType == 'Admin') {
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
        } else {
            await axios.put(`/api/student-records/${editStudentControl.value}`, {
                studentSubjectsEnrolled: inputStudentSubjectsEnrolled.value
            }).catch(err => {
                errCode.value = err.code
                errMsg.value = err.message
            })
        }
        await getStudentRecords()
        updateLog(`Edited student record of ID: ${inputStudentIDNo.value}`, 'EDIT').catch(err => {
            errCode.value = err.code
            errMsg.value = err.message
        })
        addSubjectControl.value = false
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

function sortRow(sortType: string) {
    if (sortType == 'IDNo') {
        studentRecords.value.sort((a: studentRecord, b: studentRecord) => parseInt(a.studentIDNo) - parseInt(b.studentIDNo))
    } else if (sortType == 'lastName' || sortType == 'firstName') {
        studentRecords.value.sort((a: studentRecord, b: studentRecord) => {
            const name_1 = sortType == 'lastName' ? a.studentLastName.toLowerCase() : a.studentFirstName.toLowerCase()
            const name_2 = sortType == 'lastName' ? b.studentLastName.toLowerCase() : b.studentFirstName.toLowerCase()
            return name_1.localeCompare(name_2, undefined, { sensitivity: 'accent' });
        })
    } else if (sortType == 'Address') {
        studentRecords.value.sort(((a: studentRecord, b: studentRecord) => {
            return a.studentAddress.toLowerCase() === b.studentAddress.toLowerCase() ? 0 : a.studentAddress.toLowerCase() < b.studentAddress.toLowerCase() ? -1 : 1
        }))
    } else if (sortType == 'YearLevel') {
        const romanNumerals = [
            {
                I: 1
            },
            {
                II: 2
            },
            {
                III: 3

            },
            {
                IV: 4
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ] as any
        studentRecords.value.sort((a: studentRecord, b: studentRecord) => parseInt(romanNumerals.find((numeral: never) => numeral[a.studentYearLevel])[a.studentYearLevel]) - parseInt(romanNumerals.find((numeral: never) => numeral[b.studentYearLevel])[b.studentYearLevel]))
    } else if (sortType == 'Course') {
        studentRecords.value.sort((a: studentRecord, b: studentRecord) => {
            const course_1 = a.studentCourse.toLowerCase()
            const course_2 = b.studentCourse.toLowerCase()
            if (course_1 > course_2) {
                return 1;
            }
            if (course_1 < course_2) {
                return -1;
            }

            return 0;
        })
    } else if (sortType == 'Email') {
        studentRecords.value.sort((a: studentRecord, b: studentRecord) => {
            if (a.studentEmail.toLowerCase() > b.studentEmail.toLowerCase()) {
                return 1;
            }
            if (a.studentEmail.toLowerCase() < b.studentEmail.toLowerCase()) {
                return -1;
            }

            return 0;
        })
    } else {
        studentRecords.value.sort()
    }
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
                                <button class="button is-danger is-small"
                                    v-if="editStudentControl && account.accountType == 'Admin'"
                                    @click="deleteStudentRecord">DELETE STUDENT INFORMATION</button>
                                <div class="container is-fluid">
                                    <br />
                                    <h3 class="title is-3">Student Information</h3>
                                    <div class="field">
                                        <label class="label">
                                            Student ID No.
                                        </label>
                                        <div class="control">
                                            <input class="input" type="text" v-model="inputStudentIDNo"
                                                :disabled="account.accountType !== 'Admin'" />
                                        </div>
                                    </div>
                                    <div class="field">
                                        <label class="label">
                                            Student Last Name
                                        </label>
                                        <div class="control">
                                            <input class="input" type="text" v-model="inputStudentLastName"
                                                :disabled="account.accountType !== 'Admin'"
                                                @input="inputStudentLastName = capitalizeFirstLetter(inputStudentLastName)" />
                                        </div>
                                    </div>
                                    <div class="field">
                                        <label class="label">
                                            Student First Name
                                        </label>
                                        <div class="control">
                                            <input class="input" type="text" v-model="inputStudentFirstName"
                                                :disabled="account.accountType !== 'Admin'"
                                                @input="inputStudentFirstName = capitalizeFirstLetter(inputStudentFirstName)" />
                                        </div>
                                    </div>
                                    <div class="field">
                                        <label class="label">
                                            Student Address
                                        </label>
                                        <div class="control">
                                            <input class="input" type="text" v-model="inputStudentAddress"
                                                :disabled="account.accountType !== 'Admin'" />
                                        </div>
                                    </div>
                                    <div class="field">
                                        <label class="label">
                                            Student Year Level
                                        </label>
                                        <div class="control">
                                            <div class="select">
                                                <select v-model="inputStudentYearLevel"
                                                    :disabled="account.accountType !== 'Admin'">
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
                                            <input class="input" type="text" v-model="inputStudentCourse"
                                                :disabled="account.accountType !== 'Admin'" />
                                        </div>
                                    </div>
                                    <div class="field">
                                        <label class="label">
                                            Student Email
                                        </label>
                                        <div class="control">
                                            <input class="input" type="text" v-model="inputStudentEmail"
                                                :disabled="account.accountType !== 'Admin'" />
                                        </div>
                                    </div>
                                </div>
                                <div class="container is-fluid">
                                    <br />
                                    <h3 class="title is-3">Subjects Enrolled
                                    </h3>
                                    <button class="button is-info" @click="addSubjectPrompt"
                                        v-if="account.accountType == 'Admin'">Add
                                        Subject</button>
                                    <div class="block"></div>
                                    <div class="container" v-if="addSubjectControl">
                                        <div class="field">
                                            <label class="label">
                                                Subject Code
                                            </label>
                                            <div class="control">
                                                <div class="select" @change="studentSubjectBind">
                                                    <select v-model="inputStudentSubject">
                                                        <option :value="{}">
                                                            Select</option>
                                                        <option v-for="record in subjectRecords" :key="record"
                                                            :value="record">
                                                            {{ record.code }}</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="field">
                                            <label class="label">
                                                Subject Description
                                            </label>
                                            <div class="control">
                                                <input class="input" type="text" v-model="inputStudentSubjectDescription"
                                                    disabled />
                                            </div>
                                        </div>
                                        <div class="field">
                                            <label class="label">Grade</label>
                                            <div class="control">

                                                <div class="dropdown"
                                                    :class="{ 'is-active': inputStudentSubjectGradeDropdown }">
                                                    <div class="dropdown-trigger"
                                                        @click="inputStudentSubjectGradeDropdown = !inputStudentSubjectGradeDropdown">
                                                        <button class="button" aria-haspopup="true">
                                                            <span>{{ inputStudentSubjectGrade ? inputStudentSubjectGrade :
                                                                'Select' }}</span>
                                                            <span class="icon is-small">
                                                                <i class="fas fa-angle-down" aria-hidden="true"></i>
                                                            </span>
                                                        </button>
                                                    </div>
                                                    <div class="dropdown-menu" role="menu">
                                                        <div class="dropdown-content">
                                                            <div class="dropdown-item has-text-weight-bold">
                                                                <a
                                                                    @click="inputStudentSubjectGrade = 'NG', inputStudentSubjectGradeDropdown = false">NG(No
                                                                    Grade)</a>
                                                            </div>
                                                            <hr class="dropdown-divider">
                                                            <div class="dropdown-item has-text-weight-bold">
                                                                <a
                                                                    @click="inputStudentSubjectGrade = 'INC', inputStudentSubjectGradeDropdown = false">INC(Incomplete)</a>
                                                            </div>
                                                            <hr class="dropdown-divider">
                                                            <div class="field has-addons">
                                                                <div class="control">
                                                                    <input class="input" type="number" placeholder="70-100"
                                                                        v-model="inputStudentSubjectGrade" />
                                                                </div>
                                                                <div class="control">
                                                                    <button class="button is-info"
                                                                        @click="inputStudentSubjectGradeDropdown = false"
                                                                        :disabled="parseFloat(inputStudentSubjectGrade) < 70 || inputStudentSubjectGrade == 'INC' || inputStudentSubjectGrade == 'NG' || parseFloat(inputStudentSubjectGrade) > 100">Confirm</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="field">
                                            <label class="label">
                                                Subject Instructor
                                            </label>
                                            <div class="control">
                                                <div class="select">
                                                    <select v-model="inputStudentSubjectInstructor">
                                                        <option value="">Select Instructor</option>
                                                        <option v-for="instructor in inputStudentSubjectInstructors"
                                                            :key="instructor">{{ instructor }}</option>
                                                    </select>
                                                </div>
                                            </div>
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
                                    <table class="table-container" v-if="Object.keys(studentSubjectEnrolled).length !== 0">
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
                                                                @click="editSubjectPrompt(subject, index)"
                                                                v-if="subject.instructor.replace(/ .*/, '').toLowerCase() ==
                                                                    account.name.replace(/ .*/, '').toLowerCase() ||
                                                                    subject.instructor.split(' ').pop()?.toLowerCase() ==
                                                                    account.name.split(' ').pop()?.toLowerCase() ||
                                                                    subject.instructor.replace(/ .*/, '').toLowerCase() ==
                                                                    account.name.split(' ').pop()?.toLowerCase() ||
                                                                    account.name.replace(/ .*/, '').toLowerCase() ==
                                                                    subject.instructor.split(' ').pop()?.toLowerCase() || account.accountType == 'Admin'">Edit</button>
                                                            <button class="button is-danger is-small"
                                                                @click="removeSubject(subject.code)"
                                                                v-if="account.accountType == 'Admin'">Remove</button>
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
                                <br />
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
                                        <button class="button is-medium is-rounded"
                                            @click="addStudentControl = true, getSubjectRecords()"
                                            :disabled="account.accountType !== 'Admin'">Add
                                            Student &nbsp; <i class="fa-solid fa-plus"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="table-container">
                            <table class="table is-fullwidth is-hoverable" v-if="Object.keys(studentRecords).length !== 0">
                                <thead>
                                    <tr>
                                        <th @click="sortRow('IDNo')">ID No.</th>
                                        <th @click="sortRow('lastName')">Last Name</th>
                                        <th @click="sortRow('firstName')">First Name</th>
                                        <th @click="sortRow('Address')">Address</th>
                                        <th @click="sortRow('YearLevel')">Year Level</th>
                                        <th @click="sortRow('Course')">Course</th>
                                        <th @click="sortRow('Email')">Email</th>
                                        <th>Subjects</th>
                                        <th>Average</th>
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
                                        <td>{{ record.studentSubjectsEnrolled.reduce((a: number, b: any) => {
                                            if (typeof (b.grade) === 'number') {
                                                return a + (b.grade / record.studentSubjectsEnrolled.length)
                                            }
                                            else {
                                                return a
                                            }
                                        }, 0)
                                        }}</td>
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