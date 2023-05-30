<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router';
import { useCredentialsStore } from '@/stores/CredentialInformation';
import CatchErr from './CatchErr.vue';

const router = useRouter()
const store = useCredentialsStore()

const username = ref('')
const password = ref('')
const authenticating = ref(false)
const authFailed = ref(false)
const authErrorCode = ref()
const authErrorMessage = ref('')
const authEmptyFields = ref(false)

onMounted(async () => {
    await axios.get('/session').then(async response => {
        if (response.data.data !== undefined) {
            if (response.data.data.handler == 'admin') {
                store.$patch({ credentials: response.data })
                await router.push({ name: 'adminStudentRecords' })
            } else if (response.data.handler == 'student') {
                store.$patch({ credentials: response.data })
                await router.push({ name: 'studentGrades' })
            } else {
                store.$reset();
                await axios.delete('/session')
            }
        }
    })
})

async function authAccount() {
    authenticating.value = true
    if (username.value == null || password.value == null) {
        authFailed.value = false;
        authEmptyFields.value = true
        username.value = ''
        password.value = ''
    } else {
        await axios.post('/api/account/auth', {
            username: username.value,
            password: password.value
        }).then(async response => {
            if (response.data) {
                if (response.data.handler == 'admin') {
                    await axios.post('/session', {
                        data: {
                            handler: 'admin'
                        }
                    })
                    store.$patch({ credentials: response.data })
                    await router.push({ name: 'adminStudentRecords' })
                } else {
                    await axios.post('/session', {
                        data: {
                            handler: 'student'
                        }
                    })
                    store.$patch({ credentials: response.data })
                    await router.push({ name: 'studentGrades' })
                }
            }
        }).catch(err => {
            authErrorCode.value = err.code
            authErrorMessage.value = err.message
        })
        if (!authErrorCode.value || !authErrorMessage.value) authFailed.value = true;
        username.value = '';
        password.value = '';
    }
    authenticating.value = false
}
</script>
<template>
    <div class="box has-text-centered" style="margin: auto; width: 560px">
        <CatchErr :err-code="authErrorCode" :err-message="authErrorMessage" />
        <figure class="image is-128x128" style="margin: auto">
            <img src="../assets/logos/CASlogo.png" />
        </figure>
        <h3 class="title is-3 has-text-black">Sign In</h3>
        <div class="field">
            <div class="control">
                <input class="input" type="text" placeholder="Username" v-model="username" />
            </div>
        </div>
        <div class="field">
            <div class="control">
                <input class="input" type="password" placeholder="Password" v-model="password" @keyup.enter="authAccount" />
            </div>
        </div>
        <div class="notification is-warning" v-if="authFailed">
            Username or password is incorrect. Please try again or contact your administrator.
        </div>
        <div class="field">
            <div class="control">
                <button class="button is-link is-rounded" :class="{ 'is-loading': authenticating }"
                    @click="authAccount">ENTER</button>
            </div>
        </div>
    </div>
</template>
<style scoped>
.input {
    width: 75%
}
</style>