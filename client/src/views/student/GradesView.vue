<script lang="ts" setup>
import NavPanel from '@/components/NavPanel.vue';
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useCredentialsStore } from '@/stores/CredentialInformation';
import CatchErr from '@/components/CatchErr.vue';

const store = useCredentialsStore()

const handlerInfo = ref(store.$state.credentials as unknown as Record<string, string>)
const handlerID = ref(handlerInfo.value.name) //student ID Number

const studentSubjectsEnrolled = ref()

const errCode = ref('')
const errMsg = ref('')

onMounted(async () => {
    await axios.post(`/api/student-records/inquire`, {
        id: handlerID.value
    }).then(response => studentSubjectsEnrolled.value = response.data.studentSubjectsEnrolled).catch(err => {
        errCode.value = err.code
        errMsg.value = err.message
    })
})

</script>
<template>
    <div class="">
        <div class="columns">
            <div class="column is-2">
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
                                        <th>{{ subject.code }}</th>
                                        <td>{{ subject.description }}</td>
                                        <td>{{ subject.grade }}</td>
                                        <td>{{ subject.instructor }}</td>
                                    </tr>
                                </tbody>
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