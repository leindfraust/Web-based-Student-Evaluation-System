<script lang="ts" setup>
import NavPanel from '@/components/NavPanel.vue';
import { ref, onBeforeMount } from 'vue'
import axios from 'axios'
import { useCredentialsStore } from '@/stores/CredentialInformation';
import CatchErr from '@/components/CatchErr.vue';

const store = useCredentialsStore()

const handlerInfo = ref(store.$state.credentials as unknown as Record<string, string>)
const handlerID = ref(handlerInfo.value.name) //student ID Number

const studentSubjectsEnrolled = ref()

const errCode = ref('')
const errMsg = ref('')

onBeforeMount(async () => {
    await axios.post(`/api/student-records/inquire`, {
        id: handlerID.value
    }).then(response => studentSubjectsEnrolled.value = response.data.studentSubjectsEnrolled).catch(err => {
        errCode.value = err.code
        errMsg.value = err.message
    })
})
function sumAvg() {
    const validGrades = studentSubjectsEnrolled.value.filter((item: unknown) => !isNaN(parseFloat((item as Record<string, string>).grade)));
    const gradesSum = validGrades.reduce((sum: number, item: unknown) => sum + parseFloat((item as Record<string, string>).grade), 0);
    return gradesSum / validGrades.length;
}
</script>
<template>
    <div class="container">
        <div class="columns">
            <div class="column is-4">
                <NavPanel />
            </div>
            <div class="column">
                <section class="section">
                    <div class="container">
                        <CatchErr :err-code="errCode" :err-message="errMsg" />
                        <table class="table-container" v-if="studentSubjectsEnrolled">
                            <div class="table is-fullwidth">
                                <thead>
                                    <tr>
                                        <th>Subject Code</th>
                                        <th>Subject Description</th>
                                        <th>Grade</th>
                                        <th>Instructor</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="subject, index in studentSubjectsEnrolled" :key="index">
                                        <th
                                            :class="{ 'has-text-danger': subject.grade == 'NG' || subject.grade == 'INC' || subject.grade < 74 }">
                                            {{ subject.code }}</th>
                                        <td
                                            :class="{ 'has-text-danger': subject.grade == 'NG' || subject.grade == 'INC' || subject.grade < 74 }">
                                            {{ subject.description }}</td>
                                        <td
                                            :class="{ 'has-text-danger': subject.grade == 'NG' || subject.grade == 'INC' || subject.grade < 74 }">
                                            {{ subject.grade }}</td>
                                        <td
                                            :class="{ 'has-text-danger': subject.grade == 'NG' || subject.grade == 'INC' || subject.grade < 74 }">
                                            {{
                                                subject.instructor }}</td>
                                    </tr>
                                </tbody>
                            </div>
                            <div class="container">
                                <p class="subtitle is-3">Average: {{ sumAvg() }}</p>
                                <p class="help">Only calculates for subjects that have grades.</p>
                            </div>
                        </table>
                        <div class="notification is-info" v-else>
                            No grades yet. Please contact your school administrator or teachers.
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>