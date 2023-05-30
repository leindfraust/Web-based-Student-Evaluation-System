<script setup lang="ts">
import axios from 'axios'
import NavPanel from '@/components/NavPanel.vue';
import { capitalizeFirstLetter } from '@/composables/upperCaseFirstLetter';
import { onMounted, ref, watchEffect, computed } from 'vue';
import CatchErr from '@/components/CatchErr.vue';

interface subjectRecord {
    code: string;
    description: string;
    instructors: Array<string>;
}

const subjectRecords = ref<Array<subjectRecord>>([])
const searchBar = ref('')

const subjectControl = ref(false)
const subjectDocID = ref('')

const inputSubjectCode = ref('')
const inputSubjectDecription = ref('')
const inputSubjectInstructorFirstName = ref('')
const inputSubjectInstructorMiddleName = ref('')
const inputSubjectInstructorLastName = ref('')
const inputSubjectIntructors = ref<Array<string>>([])

const errMsg = ref('')
const errCode = ref('')

const validFields = ref(false)

onMounted(async () => {
    await axios.get('/api/subject-records').then(response => {
        subjectRecords.value = response.data
    })
})

watchEffect(() => checkFields())

const subjectRecordsFiltered = computed(() => {
    return subjectRecords.value ? searchBar.value ? subjectRecords.value.filter((subject: subjectRecord) => subject.code.toLowerCase().includes(searchBar.value.toLowerCase()) || subject.description.toLowerCase().includes(searchBar.value.toLowerCase()) || subject.instructors.find(instructorParam => instructorParam.toLowerCase().includes(searchBar.value.toLowerCase()))) : subjectRecords.value : []
})

function checkFields() {
    if (inputSubjectCode.value != '' && inputSubjectDecription.value != '' && inputSubjectIntructors.value.length != 0) {
        validFields.value = true
    } else {
        validFields.value = false
    }
}
function clearFields() {
    inputSubjectCode.value = ''
    inputSubjectDecription.value = ''
    inputSubjectInstructorFirstName.value = ''
    inputSubjectInstructorMiddleName.value = ''
    inputSubjectInstructorLastName.value = ''
    inputSubjectIntructors.value = []
    subjectControl.value = false
    subjectDocID.value = ''
}
function clearInstructorFields() {
    inputSubjectInstructorFirstName.value = ''
    inputSubjectInstructorMiddleName.value = ''
    inputSubjectInstructorLastName.value = ''
}
function addSubjectInstructor() {
    const instructor = `${inputSubjectInstructorLastName.value} ${inputSubjectInstructorFirstName.value} ${inputSubjectInstructorMiddleName.value}`
    if (!inputSubjectIntructors.value.find((instructorParam: string) => instructorParam == instructor)) {
        inputSubjectIntructors.value.push(instructor)
        clearInstructorFields()
    }
}
async function addSubjectRecord() {
    try {
        await axios.post('/api/subject-records', {
            code: inputSubjectCode.value,
            description: inputSubjectDecription.value,
            instructors: inputSubjectIntructors.value
        })
        await axios.get('/api/subject-records').then(response => {
            subjectRecords.value = response.data
        })
    } catch (err: unknown) {
        errMsg.value = (err as Error).message;
        errCode.value = (err as Error).name;
    }
    clearFields()
}
function editSubjectRecordModal(record: subjectRecord) {
    inputSubjectCode.value = record.code
    inputSubjectDecription.value = record.description
    inputSubjectIntructors.value = [...record.instructors]
    subjectDocID.value = (record as unknown as Record<string, string>)._id
    subjectControl.value = true
}
async function editSubjectRecord() {
    try {
        await axios.put(`/api/subject-records/${subjectDocID.value}`, {
            code: inputSubjectCode.value,
            description: inputSubjectDecription.value,
            instructors: inputSubjectIntructors.value
        })
        await axios.get('/api/subject-records').then(response => {
            subjectRecords.value = response.data
        })
    } catch (err: unknown) {
        errMsg.value = (err as Error).message;
        errCode.value = (err as Error).name;
    }
    clearFields()
}
async function deleteSubjectRecord() {
    try {
        await axios.delete(`/api/subject-records/${subjectDocID.value}`)
        await axios.get('/api/subject-records').then(response => {
            subjectRecords.value = response.data
        })
    } catch (err: unknown) {
        errMsg.value = (err as Error).message;
        errCode.value = (err as Error).name;
    }
    clearFields()
}
function deleteSubjectInstructor(instructor: string) {
    inputSubjectIntructors.value = inputSubjectIntructors.value.filter(instructorParam => instructorParam != instructor)
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
                    <CatchErr :err-message="errMsg" :err-code="errCode" />
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
                        <div class="column ">

                            <div class="field">
                                <div class="control has-icons-right">
                                    <button class="button is-medium is-rounded" @click="subjectControl = true">Add
                                        Subject &nbsp; <i class="fa-solid fa-plus"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="container">
                        <div class="modal" :class="{ 'is-active': subjectControl }">
                            <div class="modal-background"></div>
                            <div class="modal-content box">
                                <!-- Any other Bulma elements you want -->
                                <button class="button is-danger is-small" @click="deleteSubjectRecord">Delete
                                    Subject</button>
                                <div class="section">
                                    <h3 class="title is-3">Add Subject</h3>
                                    <div class="field">
                                        <label class="label">Subject Code</label>
                                        <div class="control">
                                            <input class="input" type="text" v-model="inputSubjectCode" />
                                        </div>
                                    </div>
                                    <div class="field">
                                        <label class="label">Subject Description</label>
                                        <div class="control">
                                            <input class="input" type="text" v-model="inputSubjectDecription" />
                                        </div>
                                    </div>
                                    <hr />
                                    <h4 class="title is-4">Subject Instructors</h4>
                                    <div class="columns">
                                        <div class="column">
                                            <div class="field">
                                                <label class="label">Intructor First Name</label>
                                                <div class="control">
                                                    <input class="input" type="text"
                                                        v-model="inputSubjectInstructorFirstName"
                                                        @input="inputSubjectInstructorFirstName = capitalizeFirstLetter(inputSubjectInstructorFirstName)" />
                                                </div>
                                            </div>
                                            <div class="field">
                                                <label class="label">Intructor Middle Name(OPTIONAL)</label>
                                                <div class="control">
                                                    <input class="input" type="text" maxlength="1"
                                                        v-model="inputSubjectInstructorMiddleName"
                                                        @input="inputSubjectInstructorMiddleName = capitalizeFirstLetter(inputSubjectInstructorMiddleName)" />
                                                </div>
                                            </div>
                                            <div class="field">
                                                <label class="label">Intructor Last Name</label>
                                                <div class="control">
                                                    <input class="input" type="text"
                                                        v-model="inputSubjectInstructorLastName"
                                                        @input="inputSubjectInstructorLastName = capitalizeFirstLetter(inputSubjectInstructorLastName)" />
                                                </div>
                                            </div>
                                            <button class="button is-primary" @click="addSubjectInstructor"
                                                :disabled="inputSubjectInstructorFirstName == '' || inputSubjectInstructorLastName == ''">Add
                                                Instructor</button>
                                        </div>
                                        <div class="column">
                                            <p class="subtitle has-text-weight-bold"
                                                v-for="instructor, index in inputSubjectIntructors" :key="instructor">{{ `
                                                ${index + 1}. ${instructor}` }}<span class="delete"
                                                    @click="deleteSubjectInstructor(instructor)"></span></p>
                                        </div>
                                    </div>
                                    <div class="buttons is-centered">
                                        <button class="button is-danger" @click="clearFields()">Cancel</button>
                                        <button class="button is-success" :disabled="!validFields" @click="addSubjectRecord"
                                            v-if="!subjectDocID">Confirm</button>
                                        <button class="button is-info" :disabled="!validFields" @click="editSubjectRecord"
                                            v-else>Update</button>
                                    </div>
                                </div>
                            </div>
                            <button class="modal-close is-large" aria-label="close"></button>
                        </div>

                        <div class="table-container" v-if="subjectRecords">
                            <table class="table is-fullwidth is-hoverable" v-if="Object.keys(subjectRecords).length !== 0">
                                <thead>
                                    <tr>
                                        <th>Subject Code</th>
                                        <th>Subject Description</th>
                                        <th>Instructors</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="record in subjectRecordsFiltered" :key="record"
                                        @click="editSubjectRecordModal(record)">
                                        <th>{{ record.code }}</th>
                                        <td>{{ record.description }}</td>
                                        <td>
                                            <ul>
                                                <li v-for="instructor in record.instructors" :key="instructor">{{ instructor
                                                }}</li>
                                            </ul>
                                        </td>
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